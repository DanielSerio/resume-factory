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
import { ResumeTypeGuardHelpers } from './type-guard.helpers';
import { ResumeHelpers } from './resume.helpers';

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

  private async createOrUpdate<Ent extends GenericEntity>(items: (CreateGenericEntity<Ent> | Ent)[]): Promise<Ent[]> {
    if (items.length === 0) {
      return [] as Ent[];
    }

    if (ResumeTypeGuardHelpers.isEducation(items)) {
      return await this.educationService.createOrUpdate(items) as Ent[];
    }

    if (ResumeTypeGuardHelpers.isSkills(items)) {
      return await this.skillsService.createOrUpdate(items) as Ent[];
    }

    if (ResumeTypeGuardHelpers.isExperience(items)) {
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
    const all = await this.repo.count();
    const records = await this.repo.find({
      order: this.getOrder(params?.sorting),
      take: paging.limit,
      skip: paging.offset
    });

    return {
      paging: {
        ...paging,
        totals: {
          records: all,
          pages: Math.ceil(all / paging.limit)
        }
      },
      sorting: params?.sorting ?? null,
      records: records.map((record) => ({ ...record, name: ResumeHelpers.getUniqueResumeName(record) }))
    };
  }

  async findOne(where: Parameters<typeof this.repo.findOne>[0]['where']) {
    const found = await this.repo.findOne({
      where,
      relations: {
        Skills: true,
        Education: true,
        Experience: {
          Points: true
        }
      }
    });

    if (!found) {
      throw new NotFoundException(`Resume not found`);
    }

    return {
      ...found,
      name: ResumeHelpers.getUniqueResumeName(found)
    };
  }

  async update(id: number, updateResumeDto: UpdateResumeDto) {
    const foundResume = await this.findOne({ id });

    if (!foundResume) {
      throw new NotFoundException(`Resume with id '${id}' not found`);
    }

    const updateField = <Key extends keyof Resume>(key: Key, value?: Resume[Key]) => {
      if (value) {
        foundResume[key] = value as typeof foundResume[typeof key];
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
