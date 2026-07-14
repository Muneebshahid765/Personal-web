import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Inject } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { AdminGuard } from '../config/admin.guard';

@Controller('skills')
export class SkillsController {
  constructor(@Inject(SkillsService) private readonly skillsService: SkillsService) {}

  @Get()
  async getSkills() {
    return this.skillsService.getAllSkills();
  }

  @Post()
  @UseGuards(AdminGuard)
  async createSkill(@Body() body: any) {
    return this.skillsService.createSkill(body);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  async updateSkill(@Param('id') id: string, @Body() body: any) {
    return this.skillsService.updateSkill(id, body);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async deleteSkill(@Param('id') id: string) {
    return this.skillsService.deleteSkill(id);
  }
}
