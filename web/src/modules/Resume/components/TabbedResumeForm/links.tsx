import type { FC } from "react";
import { PersonalTab } from "./tabs/PersonalTab";
import type { ResumeFormTabName } from "./types";
import { SummaryTab } from "./tabs/SummaryTab";
import { EducationTab } from "./tabs/EducationTab";
import { ExperienceTab } from "./tabs/ExperienceTab";
import { SkillsTab } from "./tabs/SkillsTab";

interface TabLinkTab {
  title: string;
  value: ResumeFormTabName;
}

interface TabLink {
  tab: TabLinkTab;
  Component: FC;
}

export const TAB_LINKS: TabLink[] = [
  {
    tab: {
      title: "Personal",
      value: "personal",
    },
    Component: PersonalTab,
  },
  {
    tab: {
      title: "Summary",
      value: "summary",
    },
    Component: SummaryTab,
  },
  {
    tab: {
      title: "Education",
      value: "education",
    },
    Component: EducationTab,
  },
  {
    tab: {
      title: "Experience",
      value: "experience",
    },
    Component: ExperienceTab,
  },
  {
    tab: {
      title: "Skills",
      value: "skills",
    },
    Component: SkillsTab,
  },
];
