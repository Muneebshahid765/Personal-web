import { Injectable, NotFoundException } from '@nestjs/common';
import { executeQuery } from '../config/db.config';
import * as fallback from '../config/fallbackData';

@Injectable()
export class ExperiencesService {
  private static localFallback = JSON.parse(JSON.stringify(fallback.experiences));

  async getAllExperiences() {
    const query = 'SELECT * FROM experiences';
    const rows = await executeQuery<any>(query);

    if (!rows || rows.length === 0) {
      return ExperiencesService.localFallback;
    }

    return rows.map(row => ({
      id: row.id,
      role: row.role,
      company: row.company,
      period: row.period,
      description: typeof row.description === 'string' ? row.description.split('|').map((d: string) => d.trim()) : row.description,
      skills: typeof row.skills === 'string' ? row.skills.split(',').map((s: string) => s.trim()) : row.skills
    }));
  }

  async createExperience(dto: any) {
    const { id, role, company, period, description, skills } = dto;
    const descStr = Array.isArray(description) ? description.join('|') : (description || '');
    const skillsStr = Array.isArray(skills) ? skills.join(',') : (skills || '');

    const query = 'INSERT INTO experiences (id, role, company, period, description, skills) VALUES (?, ?, ?, ?, ?, ?)';
    const result = await executeQuery<any>(query, [id, role, company, period, descStr, skillsStr]);

    if (result === null) {
      const newItem = { id, role, company, period, description: Array.isArray(description) ? description : [], skills: Array.isArray(skills) ? skills : [] };
      ExperiencesService.localFallback.push(newItem);
      return newItem;
    }

    return { id, role, company, period, description, skills };
  }

  async updateExperience(id: string, dto: any) {
    const { role, company, period, description, skills } = dto;
    const descStr = Array.isArray(description) ? description.join('|') : (description || '');
    const skillsStr = Array.isArray(skills) ? skills.join(',') : (skills || '');

    const query = 'UPDATE experiences SET role = ?, company = ?, period = ?, description = ?, skills = ? WHERE id = ?';
    const result = await executeQuery<any>(query, [role, company, period, descStr, skillsStr, id]);

    if (result === null) {
      const idx = ExperiencesService.localFallback.findIndex((item: any) => item.id === id);
      if (idx === -1) throw new NotFoundException('Experience not found');
      ExperiencesService.localFallback[idx] = { id, role, company, period, description: Array.isArray(description) ? description : [], skills: Array.isArray(skills) ? skills : [] };
      return ExperiencesService.localFallback[idx];
    }

    return { id, role, company, period, description, skills };
  }

  async deleteExperience(id: string) {
    const query = 'DELETE FROM experiences WHERE id = ?';
    const result = await executeQuery<any>(query, [id]);

    if (result === null) {
      const idx = ExperiencesService.localFallback.findIndex((item: any) => item.id === id);
      if (idx === -1) throw new NotFoundException('Experience not found');
      ExperiencesService.localFallback.splice(idx, 1);
      return { success: true };
    }

    return { success: true };
  }
}
