import { Injectable, NotFoundException } from '@nestjs/common';
import { executeQuery } from '../config/db.config';
import * as fallback from '../config/fallbackData';

@Injectable()
export class SkillsService {
  private static localFallback = fallback.skills.map((s, index) => ({ id: index + 1, ...s }));
  private static nextId = fallback.skills.length + 1;

  async getAllSkills() {
    const query = 'SELECT * FROM skills';
    const rows = await executeQuery<any>(query);

    if (!rows || rows.length === 0) {
      return SkillsService.localFallback;
    }

    return rows.map(row => ({
      id: row.id,
      name: row.name,
      level: Number(row.level),
      category: row.category
    }));
  }

  async createSkill(dto: any) {
    const { name, level, category } = dto;
    const query = 'INSERT INTO skills (name, level, category) VALUES (?, ?, ?)';
    const result = await executeQuery<any>(query, [name, level, category]);

    if (result === null) {
      const id = SkillsService.nextId++;
      const newItem = { id, name, level: Number(level), category };
      SkillsService.localFallback.push(newItem);
      return newItem;
    }

    const insertId = (result as any)?.insertId || Math.floor(Math.random() * 100000);
    return { id: insertId, name, level: Number(level), category };
  }

  async updateSkill(id: any, dto: any) {
    const { name, level, category } = dto;
    const numId = Number(id);

    const query = 'UPDATE skills SET name = ?, level = ?, category = ? WHERE id = ?';
    const result = await executeQuery<any>(query, [name, level, category, numId]);

    if (result === null) {
      const idx = SkillsService.localFallback.findIndex((item: any) => Number(item.id) === numId);
      if (idx === -1) throw new NotFoundException('Skill not found');
      SkillsService.localFallback[idx] = { id: numId, name, level: Number(level), category };
      return SkillsService.localFallback[idx];
    }

    return { id: numId, name, level: Number(level), category };
  }

  async deleteSkill(id: any) {
    const numId = Number(id);
    const query = 'DELETE FROM skills WHERE id = ?';
    const result = await executeQuery<any>(query, [numId]);

    if (result === null) {
      const idx = SkillsService.localFallback.findIndex((item: any) => Number(item.id) === numId);
      if (idx === -1) throw new NotFoundException('Skill not found');
      SkillsService.localFallback.splice(idx, 1);
      return { success: true };
    }

    return { success: true };
  }
}
