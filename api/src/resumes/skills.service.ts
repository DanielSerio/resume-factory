import { Injectable, NotFoundException } from '@nestjs/common';
import { Skill } from './entities/skill.entity';
import { DataSource } from 'typeorm';
import { ResumeSkill } from 'src/shared/types/request.types';

@Injectable()
export class SkillsService {
  private get skillsRepo() {
    return this.source.getRepository(Skill);
  }

  constructor(private source: DataSource) { }

  private createSkill(skillParams: ResumeSkill) {
    const skill = new Skill();

    skill.category = skillParams.category as typeof skill.category;
    skill.subcategory = skillParams.subcategory;
    skill.name = skillParams.name;

    return skill;
  }

  private async updateSkill(skill: Skill) {
    const found = await this.skillsRepo.findOne({ where: { id: skill.id } });

    if (!found) {
      throw new NotFoundException(`Skill not found with id '${skill.id}'`);
    }

    found.category = skill.category;
    found.subcategory = skill.subcategory;
    found.name = skill.name;

    return await this.skillsRepo.save(found);
  }

  public async createSkills(skills: ResumeSkill[]) {
    return await this.skillsRepo.save(skills.map(this.createSkill));
  }

  public async createOrUpdate(skills: (ResumeSkill | Skill)[]) {
    const results = [] as Skill[];

    for (const skillParam of skills) {
      if (skillParam.id) {
        results.push(await this.updateSkill(skillParam as Skill));
      } else {
        results.push(await this.createSkill(skillParam));
      }
    }

    return results;
  }
}
