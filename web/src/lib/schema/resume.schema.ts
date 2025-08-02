import { z } from 'zod';

const standardStringSchema = z.string().min(1).max(128);
const stringNoMaxSchema = z.string().min(1);
const idTypeSchema = z.number().int().positive();
const nullableStringSchema = z.string().trim().max(128).nullable().transform((v) => !v ? null : v);

const EducationSchema = z.object({
  id: idTypeSchema.nullable().optional(),
  resumeId: idTypeSchema.nullable().optional(),
  school: standardStringSchema,
  degree: standardStringSchema,
  fieldOfStudy: standardStringSchema,
  startDate: z.coerce.date(),
  endDate: z.coerce.date().nullable()
});

const ExperiencePointSchema = z.object({
  id: idTypeSchema.nullable().optional(),
  resumeExperienceId: idTypeSchema.nullable().optional(),
  text: z.string().min(1)
});

const ExperienceSchema = z.object({
  id: idTypeSchema.nullable().optional(),
  resumeId: idTypeSchema.nullable().optional(),
  company: standardStringSchema,
  tagline: standardStringSchema,
  position: standardStringSchema,
  location: standardStringSchema,
  startDate: z.coerce.date(),
  endDate: z.coerce.date().nullable(),
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
    targetPosition: nullableStringSchema,
    targetCompany: nullableStringSchema,
    email: z.email().min(5),
    phone: z.string().min(10),
    location: stringNoMaxSchema,
    website: nullableStringSchema,
    github: stringNoMaxSchema,
    codepen: nullableStringSchema,
    summary: z.string().min(100)
  }),
  Education: z.array(EducationSchema),
  Experience: z.array(ExperienceSchema),
  Skills: z.array(SkillSchema)
});

// get the actual typed input that is the argument of `ResumeSchema.parse`
export type ResumeSchemaType = z.infer<typeof ResumeSchema>;