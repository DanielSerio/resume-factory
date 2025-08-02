import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Resume } from "./resume.entity";
import { ExperiencePoint } from "./experience-point.entity";

@Entity()
export class Experience {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 64 })
  company: string;

  @Column('varchar', { length: 64 })
  tagline: string;

  @Column('varchar', { length: 64 })
  position: string;

  @Column('varchar', { length: 64 })
  location: string;

  @Column('date')
  startDate: Date;

  @Column('date', { nullable: true })
  endDate: Date | null;

  @OneToMany(() => ExperiencePoint, (point) => point.Experience)
  Points?: ExperiencePoint[];

  @ManyToMany(() => Resume, (resumes) => resumes.Experience)
  Resumes?: Resume[];
}