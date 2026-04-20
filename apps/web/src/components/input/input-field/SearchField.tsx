import type { ChangeEvent, ReactElement } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import type { InputProps } from "@heroui/react";
import { InputGroup, InputGroupInput, InputGroupPrefix, TextField } from "@heroui/react";

interface SearchFieldProps extends Omit<InputProps, "children" | "value" | "onChange"> {
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
  className?: string;
}

export function SearchField({ value, onChange, ariaLabel, className, ...rest }: SearchFieldProps): ReactElement {
  return (
    <TextField aria-label={ariaLabel} className={className}>
      <InputGroup>
        <InputGroupPrefix>
          <MagnifyingGlassIcon className="text-default-500 h-4 w-4" />
        </InputGroupPrefix>
        <InputGroupInput
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          {...rest}
        />
      </InputGroup>
    </TextField>
  );
}
