import { Injectable, NotFoundException } from '@nestjs/common';

import { DataSource } from 'typeorm';
import { ExperiencePoint } from './entities/experience-point.entity';
import { ResumeExperience, ResumeExperiencePoint } from 'src/shared/types/request.types';
import { Experience } from './entities/experience.entity';

@Injectable()
export class ExperienceService {
  private get experienceRepo() {
    return this.source.getRepository(Experience);
  }

  private get experiencePointRepo() {
    return this.source.getRepository(ExperiencePoint);
  }

  constructor(private source: DataSource) { }

  private createExperiencePoint(experiencePoint: ResumeExperiencePoint) {
    const point = new ExperiencePoint();

    point.text = experiencePoint.text;

    return point;
  }

  private createExperiencePoints(experiencePoints: ResumeExperiencePoint[]) {
    return experiencePoints.map(this.createExperiencePoint);
  }

  private async updateExperiencePoint(experiencePoint: ExperiencePoint) {
    const found = await this.experiencePointRepo.findOne({ where: { id: experiencePoint.id } });

    if (!found) {
      throw new NotFoundException(`Experience point with id '${experiencePoint.id}' not found`);
    }

    found.text = experiencePoint.text;

    return await this.experiencePointRepo.save(found);
  }

  private async createOrUpdateExperiencePoints(experiencePoints: (ExperiencePoint | ResumeExperiencePoint)[]) {
    const results = [] as ExperiencePoint[];

    for (const point of experiencePoints) {
      if (point.id) {
        results.push(await this.updateExperiencePoint(point as ExperiencePoint));
      } else {
        results.push(await this.createExperiencePoint(point));
      }
    }

    return results;
  }

  private async createExperience(experience: ResumeExperience) {
    const exp = new Experience();

    exp.company = experience.company;
    exp.tagline = experience.tagline;
    exp.location = experience.location;
    exp.position = experience.position;
    exp.startDate = experience.startDate;
    exp.endDate = experience.endDate;

    const points = await this.experiencePointRepo.save(this.createExperiencePoints(experience.Points));

    exp.Points = points;

    return exp;
  }

  private async updateExperience(experience: Experience) {
    const found = await this.experienceRepo.findOne({
      where: {
        id: experience.id
      }
    });

    if (!found) {
      throw new NotFoundException(`Experience with id '${experience.id}' not found`);
    }

    found.company = experience.company;
    found.tagline = experience.tagline;
    found.location = experience.location;
    found.position = experience.position;
    found.startDate = experience.startDate;
    found.endDate = experience.endDate;

    if (experience.Points) {
      found.Points = await this.createOrUpdateExperiencePoints(experience.Points);
    }

    return await this.experienceRepo.save(found);
  }

  async createExperiences(experiences: ResumeExperience[]) {
    const exps = [] as Experience[];

    for (const exp of experiences) {
      exps.push(await this.createExperience(exp));
    }

    return await this.experienceRepo.save(exps);
  }

  async createOrUpdate(experiences: (ResumeExperience | Experience)[]) {
    const results = [] as Experience[];

    for (const exp of experiences) {
      if (exp.id) {
        results.push(await this.updateExperience(exp as Experience));
      } else {
        results.push(await this.createExperience(exp as ResumeExperience));
      }
    }

    return results;
  }
}
