import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Resume } from "./resume.entity";

@Entity()
export class Education {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', {
    length: 128
  })
  school: string;

  @Column('varchar', {
    length: 128
  })
  degree: string;

  @Column('varchar', {
    length: 128
  })
  fieldOfStudy: string;

  @Column('date')
  startDate: Date;

  @Column('date', { nullable: true })
  endDate: Date | null;

  @ManyToMany(() => Resume)
  Resumes?: Resume[];
}