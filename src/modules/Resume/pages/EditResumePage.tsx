import { Page } from "@/components/layout";
import { TabbedResumeForm } from "../components/TabbedResumeForm";

export function EditResumePage() {
  return (
    <Page>
      <header>
        <h1>Edit resume</h1>
      </header>
      <div>
        <TabbedResumeForm />
      </div>
    </Page>
  );
}
