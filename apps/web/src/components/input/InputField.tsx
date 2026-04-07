import type { ReactElement, ReactNode } from "react";
import type { InputProps } from "@heroui/react";
import {
  FieldError,
  InputGroup,
  InputGroupInput,
  InputGroupPrefix,
  InputGroupSuffix,
  Label,
  TextField,
} from "@heroui/react";
import type { AnyFieldApi } from "@tanstack/react-form";

interface InputFieldProps extends Omit<InputProps, "children"> {
  field: AnyFieldApi;
  label?: string;
  startContent?: ReactNode;
  endContent?: ReactNode;
}

export function InputField({ field, label, startContent, endContent, ...rest }: InputFieldProps): ReactElement {
  const errorMessage =
    field.state.meta.isTouched && !field.state.meta.isValid
      ? field.state.meta.errors.map((err) => err.message).join(",")
      : null;

  return (
    <TextField isInvalid={field.state.meta.isTouched && !field.state.meta.isValid} validationBehavior="aria">
      {label && <Label>{label}</Label>}
      <InputGroup fullWidth>
        {startContent && <InputGroupPrefix>{startContent}</InputGroupPrefix>}
        <InputGroupInput
          id={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          {...rest}
        />
        {endContent && <InputGroupSuffix>{endContent}</InputGroupSuffix>}
      </InputGroup>
      {errorMessage && <FieldError>{errorMessage}</FieldError>}
    </TextField>
  );
}
