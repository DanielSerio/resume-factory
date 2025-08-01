import { LockableInput } from "@/components/controls";
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
        <FormControl required label="First Name" className="w-full sm:max-w-xs">
          <LockableInput {...register("PersonalInfo.firstName")} />
        </FormControl>
        <FormControl required label="Last Name" className="w-full sm:max-w-xs">
          <LockableInput {...register("PersonalInfo.lastName")} />
        </FormControl>
        <FormControl required label="Email" className="w-full sm:max-w-xs">
          <LockableInput type="email" {...register("PersonalInfo.email")} />
        </FormControl>
        <FormControl required label="Phone" className="w-full sm:max-w-xs">
          <LockableInput type="tel" {...register("PersonalInfo.phone")} />
        </FormControl>
        <FormControl required label="Location" className="w-full sm:max-w-xs">
          <LockableInput {...register("PersonalInfo.location")} />
        </FormControl>
        <FormControl label="Website" className="w-full sm:max-w-xs">
          <LockableInput type="url" {...register("PersonalInfo.website")} />
        </FormControl>
        <FormControl required label="Github" className="w-full sm:max-w-xs">
          <LockableInput type="url" {...register("PersonalInfo.github")} />
        </FormControl>
        <FormControl label="Codepen" className="w-full sm:max-w-xs">
          <LockableInput type="url" {...register("PersonalInfo.codepen")} />
        </FormControl>
      </Fieldset>
    </form>
  );
}
