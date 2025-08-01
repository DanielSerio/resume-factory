import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResumeSchema } from "@/lib/schema";

export function useTabbedResumeForm() {
  return useForm({
    defaultValues: {
      PersonalInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        summary: "",
        targetCompany: "",
        targetPosition: "",
      },
    },
    resolver: zodResolver(ResumeSchema),
  });
}
