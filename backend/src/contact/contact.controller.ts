import { Controller, Post, Get, Delete, Body, Param, UseGuards, Inject } from '@nestjs/common';
import { ContactService } from './contact.service';
import { AdminGuard } from '../config/admin.guard';

@Controller('contact')
export class ContactController {
  constructor(@Inject(ContactService) private readonly contactService: ContactService) {}

  @Post()
  async submitContact(@Body() body: { name: string; email: string; subject: string; budget: string; details: string }) {
    return this.contactService.submitContactForm(body);
  }

  @Get('messages')
  @UseGuards(AdminGuard)
  async getMessages() {
    return this.contactService.getAllMessages();
  }

  @Delete('messages/:id')
  @UseGuards(AdminGuard)
  async deleteMessage(@Param('id') id: string) {
    return this.contactService.deleteMessage(id);
  }
}
