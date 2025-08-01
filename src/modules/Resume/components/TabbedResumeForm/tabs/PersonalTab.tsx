import { Fieldset, FormControl } from "@/components/forms";
import { Input } from "@/components/ui/input";
import type { ResumeSchemaType } from "@/lib/schema";
import { useFormContext } from "react-hook-form";

export function PersonalTab() {
  const { register } = useFormContext<ResumeSchemaType>();
  return (
    <form>
      <Fieldset legend="Details">
        <FormControl label="Target Company" className="w-full sm:max-w-xs">
          <Input
            {...register("PersonalInfo.targetCompany")}
            placeholder="Acme, inc"
          />
        </FormControl>
        <FormControl label="Target Position" className="w-full sm:max-w-xs">
          <Input
            {...register("PersonalInfo.targetPosition")}
            placeholder="Staff Frontend Engineer"
          />
        </FormControl>
      </Fieldset>

      <Fieldset legend="Personal Information">
        <FormControl label="First Name" className="w-full sm:max-w-xs">
          <Input {...register("PersonalInfo.firstName")} />
        </FormControl>
        <FormControl label="Last Name" className="w-full sm:max-w-xs">
          <Input {...register("PersonalInfo.lastName")} />
        </FormControl>
        <FormControl label="Email" className="w-full sm:max-w-xs">
          <Input {...register("PersonalInfo.email")} />
        </FormControl>
        <FormControl label="Phone" className="w-full sm:max-w-xs">
          <Input {...register("PersonalInfo.phone")} />
        </FormControl>
        <FormControl label="Location" className="w-full sm:max-w-xs">
          <Input {...register("PersonalInfo.location")} />
        </FormControl>
        <FormControl label="Website" className="w-full sm:max-w-xs">
          <Input {...register("PersonalInfo.website")} />
        </FormControl>
        <FormControl label="Github" className="w-full sm:max-w-xs">
          <Input {...register("PersonalInfo.github")} />
        </FormControl>
        <FormControl label="Codepen" className="w-full sm:max-w-xs">
          <Input {...register("PersonalInfo.codepen")} />
        </FormControl>
      </Fieldset>
    </form>
  );
}
