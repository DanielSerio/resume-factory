import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Education } from './entities/education.entity';
import { ResumeEducation } from 'src/shared/types/request.types';

@Injectable()
export class EducationService {
  private get educationRepo() {
    return this.source.getRepository(Education);
  }

  constructor(private source: DataSource) { }


  private createEducationItem(edu: ResumeEducation) {
    const education = new Education();

    education.school = edu.school;
    education.degree = edu.degree;
    education.fieldOfStudy = edu.fieldOfStudy;
    education.startDate = edu.startDate;
    education.endDate = edu.endDate;

    return education;
  }

  private async updateEducationItem(edu: Education) {
    const found = await this.educationRepo.findOne({ where: { id: edu.id } });

    if (!found) {
      throw new NotFoundException(`Education with id '${edu.id}' not found`);
    }

    found.degree = edu.degree;
    found.fieldOfStudy = edu.fieldOfStudy;
    found.school = edu.school;
    found.startDate = edu.startDate;
    found.endDate = edu.endDate;

    return await this.educationRepo.save(found);
  }

  createEducation(education: ResumeEducation[]) {
    return education.map(this.createEducationItem);
  }

  async createOrUpdate(education: (ResumeEducation | Education)[]) {
    const results = [] as Education[];

    for (const eduParams of education) {
      if (eduParams.id) {
        results.push(await this.updateEducationItem(eduParams as Education));
      } else {
        results.push(await this.createEducationItem(eduParams as ResumeEducation));
      }
    }

    return results;
  }
}
