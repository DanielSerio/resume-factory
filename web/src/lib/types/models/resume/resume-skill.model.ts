export interface ResumeSkillCreate {
  category: 'Backend' | 'Frontend' | 'Project Management' | 'Methodology';
  subcategory: string;
  name: string;
}

export interface ResumeSkill extends ResumeSkillCreate {
  id: number;
}