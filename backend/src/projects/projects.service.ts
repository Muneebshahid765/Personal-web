import { Injectable, NotFoundException } from '@nestjs/common';
import { executeQuery } from '../config/db.config';
import * as fallback from '../config/fallbackData';

@Injectable()
export class ProjectsService {
  private static localFallback = JSON.parse(JSON.stringify(fallback.projects));

  async getAllProjects() {
    const query = 'SELECT * FROM projects';
    const rows = await executeQuery<any>(query);

    if (!rows || rows.length === 0) {
      return ProjectsService.localFallback;
    }

    return rows.map(row => ({
      id: row.id,
      title: row.title,
      subtitle: row.subtitle,
      challenge: row.challenge,
      solution: row.solution,
      results: typeof row.results === 'string' ? row.results.split(',').map((r: string) => r.trim()) : row.results,
      category: row.category,
      image: row.image,
      featured: !!row.featured,
      technologies: typeof row.technologies === 'string' ? row.technologies.split(',').map((t: string) => t.trim()) : row.technologies,
      year: row.year,
      client: row.client
    }));
  }

  async createProject(dto: any) {
    const { id, title, subtitle, challenge, solution, results, category, image, featured, technologies, year, client } = dto;
    const resultsStr = Array.isArray(results) ? results.join(',') : (results || '');
    const techStr = Array.isArray(technologies) ? technologies.join(',') : (technologies || '');
    const featVal = featured ? 1 : 0;

    const query = `INSERT INTO projects (id, title, subtitle, challenge, solution, results, category, image, featured, technologies, year, client) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const result = await executeQuery<any>(query, [id, title, subtitle, challenge, solution, resultsStr, category, image, featVal, techStr, year, client]);

    if (result === null) {
      const newItem = { id, title, subtitle, challenge, solution, results: Array.isArray(results) ? results : [], category, image, featured: !!featured, technologies: Array.isArray(technologies) ? technologies : [], year, client };
      ProjectsService.localFallback.push(newItem);
      return newItem;
    }

    return { id, title, subtitle, challenge, solution, results, category, image, featured: !!featured, technologies, year, client };
  }

  async updateProject(id: string, dto: any) {
    const { title, subtitle, challenge, solution, results, category, image, featured, technologies, year, client } = dto;
    const resultsStr = Array.isArray(results) ? results.join(',') : (results || '');
    const techStr = Array.isArray(technologies) ? technologies.join(',') : (technologies || '');
    const featVal = featured ? 1 : 0;

    const query = `UPDATE projects SET title = ?, subtitle = ?, challenge = ?, solution = ?, results = ?, category = ?, image = ?, featured = ?, technologies = ?, year = ?, client = ? 
                   WHERE id = ?`;
    const result = await executeQuery<any>(query, [title, subtitle, challenge, solution, resultsStr, category, image, featVal, techStr, year, client, id]);

    if (result === null) {
      const idx = ProjectsService.localFallback.findIndex((item: any) => item.id === id);
      if (idx === -1) throw new NotFoundException('Project not found');
      ProjectsService.localFallback[idx] = { id, title, subtitle, challenge, solution, results: Array.isArray(results) ? results : [], category, image, featured: !!featured, technologies: Array.isArray(technologies) ? technologies : [], year, client };
      return ProjectsService.localFallback[idx];
    }

    return { id, title, subtitle, challenge, solution, results, category, image, featured: !!featured, technologies, year, client };
  }

  async deleteProject(id: string) {
    const query = 'DELETE FROM projects WHERE id = ?';
    const result = await executeQuery<any>(query, [id]);

    if (result === null) {
      const idx = ProjectsService.localFallback.findIndex((item: any) => item.id === id);
      if (idx === -1) throw new NotFoundException('Project not found');
      ProjectsService.localFallback.splice(idx, 1);
      return { success: true };
    }

    return { success: true };
  }
}
