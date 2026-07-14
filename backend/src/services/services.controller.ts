import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Inject } from '@nestjs/common';
import { ServicesService } from './services.service';
import { AdminGuard } from '../config/admin.guard';

@Controller('services')
export class ServicesController {
  constructor(@Inject(ServicesService) private readonly servicesService: ServicesService) {}

  @Get()
  async getServices() {
    return this.servicesService.getAllServices();
  }

  @Post()
  @UseGuards(AdminGuard)
  async createService(@Body() body: any) {
    return this.servicesService.createService(body);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  async updateService(@Param('id') id: string, @Body() body: any) {
    return this.servicesService.updateService(id, body);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async deleteService(@Param('id') id: string) {
    return this.servicesService.deleteService(id);
  }
}
