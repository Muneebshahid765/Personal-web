import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Inject } from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { AdminGuard } from '../config/admin.guard';

@Controller('experiences')
export class ExperiencesController {
  constructor(@Inject(ExperiencesService) private readonly experiencesService: ExperiencesService) {}

  @Get()
  async getExperiences() {
    return this.experiencesService.getAllExperiences();
  }

  @Post()
  @UseGuards(AdminGuard)
  async createExperience(@Body() body: any) {
    return this.experiencesService.createExperience(body);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  async updateExperience(@Param('id') id: string, @Body() body: any) {
    return this.experiencesService.updateExperience(id, body);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async deleteExperience(@Param('id') id: string) {
    return this.experiencesService.deleteExperience(id);
  }
}
