import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Inject } from '@nestjs/common';
import { BlogService } from './blog.service';
import { AdminGuard } from '../config/admin.guard';

@Controller('blog')
export class BlogController {
  constructor(@Inject(BlogService) private readonly blogService: BlogService) {}

  @Get()
  async getArticles() {
    return this.blogService.getAllArticles();
  }

  @Get(':id')
  async getArticle(@Param('id') id: string) {
    return this.blogService.getArticleById(id);
  }

  @Post()
  @UseGuards(AdminGuard)
  async createArticle(@Body() body: any) {
    return this.blogService.createArticle(body);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  async updateArticle(@Param('id') id: string, @Body() body: any) {
    return this.blogService.updateArticle(id, body);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async deleteArticle(@Param('id') id: string) {
    return this.blogService.deleteArticle(id);
  }
}
