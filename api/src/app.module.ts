import { Module } from '@nestjs/common';
import { ResumesModule } from './resumes/resumes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Resume } from './resumes/entities/resume.entity';
import { ExperiencePoint } from './resumes/entities/experience-point.entity';
import { Experience } from './resumes/entities/experience.entity';
import { Education } from './resumes/entities/education.entity';
import { Skill } from './resumes/entities/skill.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local'
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        database: configService.get('DB_NAME'),
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        synchronize: true,
        entities: [
          ExperiencePoint,
          Experience,
          Education,
          Skill,
          Resume,
        ]
      }),
    }),
    ResumesModule
  ],
})
export class AppModule { }
