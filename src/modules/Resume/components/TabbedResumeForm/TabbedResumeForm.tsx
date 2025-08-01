import { FormProvider } from "react-hook-form";
import { TabsTrigger, Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { TAB_LINKS } from "./links";
import { useTabbedResumeForm } from "../../hooks/useTabbedResumeForm";

export function TabbedResumeForm() {
  const methods = useTabbedResumeForm();

  return (
    <div className="flex flex-col">
      <FormProvider {...methods}>
        <Tabs className="w-full p-4 max-w-4xl mx-auto" defaultValue="personal">
          <TabsList className="w-full mb-8">
            {TAB_LINKS.map(({ tab }) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {TAB_LINKS.map(({ Component, tab }) => (
            <TabsContent key={tab.value} value={tab.value}>
              <Component />
            </TabsContent>
          ))}
        </Tabs>
      </FormProvider>
    </div>
  );
}
