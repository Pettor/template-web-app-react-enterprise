import type { ReactElement } from "react";
import type { InputProps } from "@heroui/react";
import { Input } from "@heroui/react";
import type { AnyFieldApi } from "@tanstack/react-form";

interface InputFieldProps extends InputProps {
  field: AnyFieldApi;
}
export function InputField({ field, ...rest }: InputFieldProps): ReactElement {
  const errorMessage =
    field.state.meta.isTouched && !field.state.meta.isValid
      ? field.state.meta.errors.map((err) => err.message).join(",")
      : null;

  return (
    <Input
      id={field.name}
      value={field.state.value}
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(e.target.value)}
      errorMessage={errorMessage}
      isInvalid={!field.state.meta.isValid}
      validationBehavior="aria"
      {...rest}
    />
  );
}
