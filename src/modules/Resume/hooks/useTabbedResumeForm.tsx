import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResumeSchema } from "@/lib/schema";

const FIRST_NAME = import.meta.env.VITE_FIRST_NAME;
const LAST_NAME = import.meta.env.VITE_LAST_NAME;
const EMAIL = import.meta.env.VITE_EMAIL;
const PHONE = import.meta.env.VITE_PHONE;
const LOCATION = import.meta.env.VITE_LOCATION;
const WEBSITE = import.meta.env.VITE_WEBSITE;
const GITHUB = import.meta.env.VITE_GITHUB;
const CODEPEN = import.meta.env.VITE_CODEPEN;

export function useTabbedResumeForm() {
  return useForm({
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
    },
    resolver: zodResolver(ResumeSchema),
  });
}
