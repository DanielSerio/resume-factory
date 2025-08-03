import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn } from 'typeorm';
import { Education } from './education.entity';
import { Experience } from './experience.entity';
import { Skill } from './skill.entity';

@Entity()
export class Resume {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column('int', { nullable: true })
  resumeTemplateId: null | number;

  @Column('varchar', { length: 128 })
  targetPosition: string;

  @Column('varchar', { length: 128 })
  targetCompany: null | string;

  @Column('varchar', { length: 32 })
  firstName: string;

  @Column('varchar', { length: 32 })
  lastName: string;

  @Column('varchar', { length: 128 })
  email: string;

  @Column('varchar', { length: 13 })
  phone: string;

  @Column('varchar', { length: 128 })
  location: string;

  @Column('text')
  website: string;

  @Column('text')
  github: string;

  @Column({ type: 'text', nullable: true })
  codepen: string | null;

  @Column('text')
  summary: string;

  @ManyToOne(() => Resume)
  @JoinColumn({
    name: 'resumeTemplateId',
    referencedColumnName: 'id'
  })
  TemplateResume?: Resume;

  @ManyToMany(() => Education)
  @JoinTable()
  Education?: Education[];

  @ManyToMany(() => Experience)
  @JoinTable()
  Experience?: Experience[];

  @ManyToMany(() => Skill)
  @JoinTable()
  Skills?: Skill[];
}
