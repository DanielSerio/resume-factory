import { Lock, Unlock } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  forwardRef,
  useCallback,
  useRef,
  useState,
  type ForwardedRef,
  type InputHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

export interface LockableInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  defaultLocked?: boolean;
  rootClassName?: string;
  type?: "text" | "email" | "url" | "tel";
}

function LockableInputComponent(
  {
    defaultLocked,
    type,
    className,
    rootClassName,
    ...props
  }: LockableInputProps,
  ref?: ForwardedRef<HTMLInputElement>
) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isLocked, setIsLocked] = useState(defaultLocked ?? true);

  const onLock = () => setIsLocked(true);
  const onUnlock = () => {
    setIsLocked(false);

    if (rootRef.current) {
      const input = rootRef.current.querySelector("input");

      input?.focus?.();
    }
  };

  const toggle = useCallback(() => {
    if (isLocked) {
      onUnlock();
    } else {
      onLock();
    }
  }, [onLock, onUnlock, setIsLocked]);

  return (
    <div
      className={cn("relative min-w-xs max-h-[fit-content]", rootClassName)}
      ref={rootRef}
    >
      <Input
        className={cn("relative", className)}
        type={type ?? "text"}
        readOnly={isLocked}
        ref={ref}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        color="gray"
        className="grid absolute top-[1px] right-[1px] max-w-[34px] h-[calc(100%-2px)] text-gray-500"
        onClick={toggle}
      >
        {isLocked ? <Lock opacity={0.5} /> : <Unlock />}
      </Button>
    </div>
  );
}

export const LockableInput = forwardRef(LockableInputComponent);
