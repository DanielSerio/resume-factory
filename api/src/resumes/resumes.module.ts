import { Module } from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { ResumesController } from './resumes.controller';
import { ExperienceService } from './experience.service';
import { SkillsService } from './skills.service';
import { EducationService } from './education.service';

@Module({
  controllers: [ResumesController],
  providers: [ResumesService, ExperienceService, SkillsService, EducationService],
})
export class ResumesModule {}
