import { FormProvider } from "react-hook-form";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { TAB_LINKS } from "./links";
import { useTabbedResumeForm } from "../../hooks/useTabbedResumeForm";
import { TabList } from "./TabList";
import type { Resume } from "@/lib/types/models/resume/resume.model";
import { FloatingSection } from "./FloatingSection";

export function TabbedResumeForm({ resume }: { resume?: Resume }) {
  const methods = useTabbedResumeForm(resume);
  return (
    <div className="flex flex-col">
      <FormProvider {...methods}>
        <Tabs className="p-4 max-w-4xl mx-auto" defaultValue="personal">
          <TabsList className="w-full mb-8">
            <TabList />
          </TabsList>
          {TAB_LINKS.map(({ Component, tab }) => (
            <TabsContent key={tab.value} value={tab.value}>
              <Component />
            </TabsContent>
          ))}
        </Tabs>
        <FloatingSection />
      </FormProvider>
    </div>
  );
}
