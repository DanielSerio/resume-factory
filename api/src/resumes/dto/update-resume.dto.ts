import { PartialType } from '@nestjs/mapped-types';
import { CreateResumeTemplateDto } from './create-resume.dto';

export class UpdateResumeDto extends PartialType(CreateResumeTemplateDto) { }
