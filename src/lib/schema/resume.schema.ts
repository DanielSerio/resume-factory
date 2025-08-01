import { z } from 'zod';

const standardStringSchema = z.string().min(1).max(128);
const stringNoMaxSchema = z.string().min(1);
const idTypeSchema = z.number().int().positive();

const EducationSchema = z.object({
  id: idTypeSchema.nullable().optional(),
  resumeId: idTypeSchema,
  school: standardStringSchema,
  degree: standardStringSchema,
  fieldOfStudy: standardStringSchema,
  startDate: z.coerce.date(),
  endDate: z.coerce.date().nullable(),
  description: stringNoMaxSchema.nullable()
});

const ExperiencePointSchema = z.object({
  id: idTypeSchema.nullable().optional(),
  resumeExperienceId: idTypeSchema,
  text: z.string()
});

const ExperienceSchema = z.object({
  id: idTypeSchema.nullable().optional(),
  resumeId: idTypeSchema,
  company: standardStringSchema,
  position: standardStringSchema,
  location: standardStringSchema,
  startDate: z.coerce.date(),
  endDate: z.coerce.date().nullable(),
  description: stringNoMaxSchema.nullable(),
  Points: z.array(ExperiencePointSchema)
});

const SkillSchema = z.object({
  category: z.enum(['Backend', 'Frontend', 'Project Management', 'Methodology']),
  subcategory: standardStringSchema,
  name: standardStringSchema
});

export const ResumeSchema = z.object({
  PersonalInfo: z.object({
    firstName: standardStringSchema,
    lastName: standardStringSchema,
    targetPosition: standardStringSchema,
    targetCompany: standardStringSchema.nullable(),
    email: z.email().min(5),
    phone: z.string().min(10),
    location: stringNoMaxSchema,
    website: stringNoMaxSchema,
    github: stringNoMaxSchema,
    codepen: stringNoMaxSchema,
    summary: z.string().nullable()
  }),
  Education: z.array(EducationSchema),
  Experience: z.array(ExperienceSchema),
  Skills: z.array(SkillSchema)
});

// get the actual typed input that is the argument of `ResumeSchema.parse`
export type ResumeSchemaType = z.infer<typeof ResumeSchema>;