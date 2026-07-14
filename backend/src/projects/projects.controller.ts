import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Inject } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { AdminGuard } from '../config/admin.guard';

@Controller('projects')
export class ProjectsController {
  constructor(@Inject(ProjectsService) private readonly projectsService: ProjectsService) {}

  @Get()
  async getProjects() {
    return this.projectsService.getAllProjects();
  }

  @Post()
  @UseGuards(AdminGuard)
  async createProject(@Body() body: any) {
    return this.projectsService.createProject(body);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  async updateProject(@Param('id') id: string, @Body() body: any) {
    return this.projectsService.updateProject(id, body);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async deleteProject(@Param('id') id: string) {
    return this.projectsService.deleteProject(id);
  }
}
