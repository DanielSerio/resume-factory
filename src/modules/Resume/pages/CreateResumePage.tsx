import { Page } from "@/components/layout";
import { TabbedResumeForm } from "../components/TabbedResumeForm";

export function CreateResumePage() {
  return (
    <Page>
      <header>
        <h1>Create a new resume</h1>
        <label>
          <span>Template</span>
        </label>
      </header>
      <div>
        <TabbedResumeForm />
      </div>
    </Page>
  );
}
