import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateResumeDto, CreateResumeFromTemplateDto, CreateResumeTemplateDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ListRequest, ResumeEducation, ResumeExperience, ResumeSkill, Sorting } from 'src/shared/types/request.types';
import { Resume } from './entities/resume.entity';
import { Education } from './entities/education.entity';
import { Skill } from './entities/skill.entity';
import { DataSource, FindOptionsOrder } from 'typeorm';
import { ExperienceService } from './experience.service';
import { Experience } from './entities/experience.entity';
import { SkillsService } from './skills.service';
import { EducationService } from './education.service';
import { Pretty } from 'src/shared/types/utility.types';

type GenericEntity = Skill | Education | Experience;
type CreateGenericEntity<Ent extends GenericEntity> = Pretty<Partial<Ent> & { id?: number | null; }>;

@Injectable()
export class ResumesService {
  private resumeKeys = [
    'firstName',
    'lastName',
    'email',
    'phone',
    'location',
    'website',
    'github',
    'codepen',
    'targetCompany',
    'targetPosition',
    'summary'
  ] as (keyof Resume)[];
  private get repo() {
    return this.source.getRepository(Resume);
  }

  constructor(
    private source: DataSource,
    private experienceService: ExperienceService,
    private skillsService: SkillsService,
    private educationService: EducationService
  ) { }

  private async createResumeBasis(createResumeDto: CreateResumeTemplateDto | CreateResumeFromTemplateDto) {
    const resume = new Resume();

    const setField = <Key extends keyof Resume>(key: Key, value: Resume[Key]) => {
      if (value) {
        resume[key] = value;
      }
    };

    if (createResumeDto.resumeTemplateId) {
      const found = await this.findOne({ id: createResumeDto.resumeTemplateId });

      if (!found) {
        throw new NotFoundException(`Resume with id '${createResumeDto.resumeTemplateId}' not found`);
      }

      resume.resumeTemplateId = createResumeDto.resumeTemplateId;
    }

    for (const key of this.resumeKeys) {
      if (createResumeDto[key]) {
        setField(key, createResumeDto[key]);
      }
    }

    if (!createResumeDto.resumeTemplateId) {
      const dto = createResumeDto as CreateResumeTemplateDto;

      const skills = await this.skillsService.createSkills(dto.Skills);
      const education = await this.educationService.createEducation(dto.Education);
      const experiences = await this.experienceService.createExperiences(dto.Experience);

      resume.Skills = skills;
      resume.Education = education;
      resume.Experience = experiences;
    }

    return await this.repo.save(resume);
  }

  private isSkills(items: unknown[]): items is Array<Skill | ResumeSkill> {
    if (!items.length) {
      return false;
    }

    const first = items[0];

    return !!(first as ResumeSkill).name && !!(first as ResumeSkill).subcategory && !!(first as ResumeSkill).category;
  }

  private isEducation(items: unknown[]): items is Array<Education | ResumeEducation> {
    if (!items.length) {
      return false;
    }

    const first = items[0];

    return !!(first as ResumeEducation).school && !!(first as ResumeEducation).degree && !!(first as ResumeEducation).fieldOfStudy;
  }

  private isExperience(items: unknown[]): items is Array<Experience | ResumeExperience> {
    if (!items.length) {
      return false;
    }

    const first = items[0];

    return !!(first as ResumeExperience).company && !!(first as ResumeExperience).tagline && !!(first as ResumeExperience).position;
  }

  private async createOrUpdate<Ent extends GenericEntity>(items: (CreateGenericEntity<Ent> | Ent)[]): Promise<Ent[]> {
    if (items.length === 0) {
      return [] as Ent[];
    }

    if (this.isEducation(items)) {
      return await this.educationService.createOrUpdate(items) as Ent[];
    }

    if (this.isSkills(items)) {
      return await this.skillsService.createOrUpdate(items) as Ent[];
    }

    if (this.isExperience(items)) {
      return await this.experienceService.createOrUpdate(items) as Ent[];
    }

    throw new InternalServerErrorException(`items is not a valid entity type for 'createOrUpdate'`);
  }

  private getOrder(sorting?: Sorting<Resume> | null): FindOptionsOrder<Resume> | undefined {
    if (sorting && Object.keys(sorting).length) {
      const order = {} as FindOptionsOrder<Resume>;

      for (const key in sorting) {
        order[key] = sorting[key].toLowerCase();
      }

      return order;
    }

    return undefined;
  }

  create(createResumeDto: CreateResumeDto) {
    return this.createResumeBasis(createResumeDto);
  }

  async list(params?: ListRequest<Resume>) {
    const paging = {
      limit: params?.paging?.limit ?? 25,
      offset: params?.paging?.offset ?? 0
    };
    const records = await this.repo.find({
      order: this.getOrder(params?.sorting),
      take: paging.limit,
      skip: paging.offset
    });

    return {
      paging,
      sorting: params?.sorting ?? null,
      records
    };
  }

  findOne(where: Parameters<typeof this.repo.findOne>[0]['where']) {
    return this.repo.findOne({ where });
  }

  async update(id: number, updateResumeDto: UpdateResumeDto) {
    const foundResume = await this.findOne({ id });

    if (!foundResume) {
      throw new NotFoundException(`Resume with id '${id}' not found`);
    }

    const updateField = <Key extends keyof Resume>(key: Key, value?: Resume[Key]) => {
      if (value) {
        foundResume[key] = value;
      }
    };


    for (const key of this.resumeKeys) {
      updateField(key, updateResumeDto[key]);
    }

    const skills = await this.createOrUpdate<Skill>(updateResumeDto.Skills as (Skill | CreateGenericEntity<Skill>)[]);
    const education = await this.createOrUpdate<Education>(updateResumeDto.Education as (Education | CreateGenericEntity<Education>)[]);
    const experience = await this.createOrUpdate<Experience>(updateResumeDto.Experience as (Experience | CreateGenericEntity<Experience>)[]);

    foundResume.Skills = skills;
    foundResume.Education = education;
    foundResume.Experience = experience;

    return await this.repo.save(foundResume);
  }

  async remove(id: number) {
    const found = await this.findOne({ id });

    if (!found) {
      throw new Error(`Resume with id '${id}' not found`);
    }

    return await this.repo.remove(found);
  }

  async removeMany(ids: number[]) {
    for (const id of ids) {
      await this.remove(id);
    }
  }
}
