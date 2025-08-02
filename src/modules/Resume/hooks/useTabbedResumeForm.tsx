import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResumeSchema } from "@/lib/schema";
import type { Resume } from "@/lib/types/models/resume/resume.model";
import { useEffect } from "react";

const FIRST_NAME = import.meta.env.VITE_FIRST_NAME;
const LAST_NAME = import.meta.env.VITE_LAST_NAME;
const EMAIL = import.meta.env.VITE_EMAIL;
const PHONE = import.meta.env.VITE_PHONE;
const LOCATION = import.meta.env.VITE_LOCATION;
const WEBSITE = import.meta.env.VITE_WEBSITE;
const GITHUB = import.meta.env.VITE_GITHUB;
const CODEPEN = import.meta.env.VITE_CODEPEN;

export function useTabbedResumeForm(resume?: Resume) {
  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      PersonalInfo: {
        firstName: FIRST_NAME,
        lastName: LAST_NAME,
        email: EMAIL,
        phone: PHONE,
        location: LOCATION,
        website: WEBSITE,
        github: GITHUB,
        codepen: CODEPEN,
        summary: "",
        targetCompany: "",
        targetPosition: "",
      },
      Education: [],
      Experience: [],
      Skills: [],
    },
    resolver: zodResolver(ResumeSchema),
  });

  useEffect(() => {
    if (resume) {
      form.reset(resume);
    }
  }, [resume]);

  return form;
}
