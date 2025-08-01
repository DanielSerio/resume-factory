export interface ResumeSkillCreate {
  category: 'Back-end' | 'Front-end' | 'Project Management' | 'Methodology';
  subcategory: string;
  name: string;
}

export interface ResumeSkill extends ResumeSkillCreate {
  id: number;
}