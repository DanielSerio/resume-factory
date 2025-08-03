import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Experience } from "./experience.entity";

@Entity()
export class ExperiencePoint {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  text: string;

  @ManyToOne(() => Experience, (exp) => exp.Points)
  Experience?: Experience;
}