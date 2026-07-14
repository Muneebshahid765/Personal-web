import { Injectable, NotFoundException } from '@nestjs/common';
import { executeQuery } from '../config/db.config';
import * as fallback from '../config/fallbackData';

@Injectable()
export class BlogService {
  private static localFallback = JSON.parse(JSON.stringify(fallback.articles));

  async getAllArticles() {
    const query = 'SELECT * FROM blog_articles';
    const rows = await executeQuery<any>(query);

    if (!rows || rows.length === 0) {
      return BlogService.localFallback;
    }

    return rows.map(row => ({
      id: row.id,
      title: row.title,
      category: row.category,
      readTime: row.readTime,
      date: row.date,
      image: row.image,
      summary: row.summary,
      content: row.content,
      featured: !!row.featured,
      author: row.author,
      authorRole: row.authorRole,
      likes: Number(row.likes || 0),
      views: Number(row.views || 0)
    }));
  }

  async getArticleById(id: string) {
    const query = 'SELECT * FROM blog_articles WHERE id = ?';
    const rows = await executeQuery<any>(query, [id]);

    if (!rows || rows.length === 0) {
      const fbArticle = BlogService.localFallback.find((a: any) => a.id === id);
      if (!fbArticle) {
        throw new NotFoundException(`Article with ID ${id} not found`);
      }
      return fbArticle;
    }

    const row = rows[0];
    return {
      id: row.id,
      title: row.title,
      category: row.category,
      readTime: row.readTime,
      date: row.date,
      image: row.image,
      summary: row.summary,
      content: row.content,
      featured: !!row.featured,
      author: row.author,
      authorRole: row.authorRole,
      likes: Number(row.likes || 0),
      views: Number(row.views || 0)
    };
  }

  async createArticle(dto: any) {
    const { id, title, category, readTime, date, image, summary, content, featured, author, authorRole } = dto;
    const featVal = featured ? 1 : 0;
    const authVal = author || 'Muneeb Shahid';
    const authRoleVal = authorRole || 'Senior Full-Stack Developer';

    const query = `INSERT INTO blog_articles (id, title, category, readTime, date, image, summary, content, featured, author, authorRole, likes, views) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0)`;
    const result = await executeQuery<any>(query, [id, title, category, readTime, date, image, summary, content, featVal, authVal, authRoleVal]);

    if (result === null) {
      const newItem = { id, title, category, readTime, date, image, summary, content, featured: !!featured, author: authVal, authorRole: authRoleVal, likes: 0, views: 0 };
      BlogService.localFallback.push(newItem);
      return newItem;
    }

    return { id, title, category, readTime, date, image, summary, content, featured: !!featured, author: authVal, authorRole: authRoleVal, likes: 0, views: 0 };
  }

  async updateArticle(id: string, dto: any) {
    const { title, category, readTime, date, image, summary, content, featured, author, authorRole } = dto;
    const featVal = featured ? 1 : 0;
    const authVal = author || 'Muneeb Shahid';
    const authRoleVal = authorRole || 'Senior Full-Stack Developer';

    const query = `UPDATE blog_articles SET title = ?, category = ?, readTime = ?, date = ?, image = ?, summary = ?, content = ?, featured = ?, author = ?, authorRole = ? 
                   WHERE id = ?`;
    const result = await executeQuery<any>(query, [title, category, readTime, date, image, summary, content, featVal, authVal, authRoleVal, id]);

    if (result === null) {
      const idx = BlogService.localFallback.findIndex((item: any) => item.id === id);
      if (idx === -1) throw new NotFoundException('Article not found');
      BlogService.localFallback[idx] = { ...BlogService.localFallback[idx], title, category, readTime, date, image, summary, content, featured: !!featured, author: authVal, authorRole: authRoleVal };
      return BlogService.localFallback[idx];
    }

    return { id, title, category, readTime, date, image, summary, content, featured: !!featured, author: authVal, authorRole: authRoleVal };
  }

  async deleteArticle(id: string) {
    const query = 'DELETE FROM blog_articles WHERE id = ?';
    const result = await executeQuery<any>(query, [id]);

    if (result === null) {
      const idx = BlogService.localFallback.findIndex((item: any) => item.id === id);
      if (idx === -1) throw new NotFoundException('Article not found');
      BlogService.localFallback.splice(idx, 1);
      return { success: true };
    }

    return { success: true };
  }
}
