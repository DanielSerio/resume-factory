import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Resume } from "./resume.entity";

@Entity()
export class Skill {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('simple-enum', {
    enum: ['Backend', 'Frontend', 'Project Management', 'Methodology']
  })
  category: 'Backend' | 'Frontend' | 'Project Management' | 'Methodology';

  @Column('varchar', {
    length: 128
  })
  subcategory: string;

  @Column('varchar', {
    length: 128
  })
  name: string;

  @ManyToMany(() => Resume, (resumes) => resumes.Skills)
  Resumes?: Resume[];
}