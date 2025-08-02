import { Page } from "@/components/layout";
import { TabbedResumeForm } from "../components/TabbedResumeForm";

export function CreateResumePage() {
  return (
    <Page>
      <header>
        <h1>Create a new resume</h1>
      </header>
      <div>
        <TabbedResumeForm />
      </div>
    </Page>
  );
}
