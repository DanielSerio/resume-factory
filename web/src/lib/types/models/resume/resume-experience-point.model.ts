export interface ResumeExperiencePointCreate {
  resumeExperienceId: number;
  text: string;
}

export interface ResumeExperiencePoint extends ResumeExperiencePointCreate {
  id: number;
}