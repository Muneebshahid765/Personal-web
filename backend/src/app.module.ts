import { Module } from '@nestjs/common';
import { ServicesController } from './services/services.controller';
import { ServicesService } from './services/services.service';
import { ExperiencesController } from './experiences/experiences.controller';
import { ExperiencesService } from './experiences/experiences.service';
import { SkillsController } from './skills/skills.controller';
import { SkillsService } from './skills/skills.service';
import { ProjectsController } from './projects/projects.controller';
import { ProjectsService } from './projects/projects.service';
import { BlogController } from './blog/blog.controller';
import { BlogService } from './blog/blog.service';
import { ContactController } from './contact/contact.controller';
import { ContactService } from './contact/contact.service';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [],
  controllers: [
    ServicesController,
    ExperiencesController,
    SkillsController,
    ProjectsController,
    BlogController,
    ContactController,
    AuthController
  ],
  providers: [
    ServicesService,
    ExperiencesService,
    SkillsService,
    ProjectsService,
    BlogService,
    ContactService
  ],
})
export class AppModule {}
