import { Injectable, NotFoundException } from '@nestjs/common';
import { executeQuery } from '../config/db.config';
import * as fallback from '../config/fallbackData';

@Injectable()
export class ServicesService {
  private static localFallback = JSON.parse(JSON.stringify(fallback.services));

  async getAllServices() {
    const query = 'SELECT * FROM services';
    const rows = await executeQuery<any>(query);

    if (!rows || rows.length === 0) {
      return ServicesService.localFallback;
    }

    return rows.map(row => ({
      id: row.id,
      title: row.title,
      description: row.description,
      price: row.price,
      features: typeof row.features === 'string' ? row.features.split(',').map((f: string) => f.trim()) : row.features,
      details: row.details
    }));
  }

  async createService(dto: any) {
    const { id, title, description, price, features, details } = dto;
    const featuresStr = Array.isArray(features) ? features.join(',') : (features || '');
    
    const query = 'INSERT INTO services (id, title, description, price, features, details) VALUES (?, ?, ?, ?, ?, ?)';
    const result = await executeQuery<any>(query, [id, title, description, price, featuresStr, details]);

    if (result === null) {
      const newItem = { id, title, description, price, features: Array.isArray(features) ? features : [], details };
      ServicesService.localFallback.push(newItem);
      return newItem;
    }

    return { id, title, description, price, features, details };
  }

  async updateService(id: string, dto: any) {
    const { title, description, price, features, details } = dto;
    const featuresStr = Array.isArray(features) ? features.join(',') : (features || '');

    const query = 'UPDATE services SET title = ?, description = ?, price = ?, features = ?, details = ? WHERE id = ?';
    const result = await executeQuery<any>(query, [title, description, price, featuresStr, details, id]);

    if (result === null) {
      const idx = ServicesService.localFallback.findIndex((item: any) => item.id === id);
      if (idx === -1) throw new NotFoundException('Service not found');
      ServicesService.localFallback[idx] = { id, title, description, price, features: Array.isArray(features) ? features : [], details };
      return ServicesService.localFallback[idx];
    }

    return { id, title, description, price, features, details };
  }

  async deleteService(id: string) {
    const query = 'DELETE FROM services WHERE id = ?';
    const result = await executeQuery<any>(query, [id]);

    if (result === null) {
      const idx = ServicesService.localFallback.findIndex((item: any) => item.id === id);
      if (idx === -1) throw new NotFoundException('Service not found');
      ServicesService.localFallback.splice(idx, 1);
      return { success: true };
    }

    return { success: true };
  }
}
