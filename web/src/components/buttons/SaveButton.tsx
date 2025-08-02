import { LoaderCircle, Save } from "lucide-react";
import { Button } from "../ui/button";

export interface SaveButtonProps {
  disabled?: boolean | null;
  isBusy?: boolean | null;

  onClick: () => void;
}

export function SaveButton({ disabled, isBusy, onClick }: SaveButtonProps) {
  const isDisabled = (disabled || isBusy) ?? false;

  return (
    <Button
      className="h-[60px] w-[60px] rounded-full shadow-xl"
      disabled={isDisabled}
      onClick={onClick}
    >
      {isBusy ? <LoaderCircle /> : <Save style={{ width: 30, height: 30 }} />}
    </Button>
  );
}
