import { useIntl, defineMessages } from "react-intl";
import { z } from "zod";

const messages = defineMessages({
  emailInvalid: {
    description: "FormValidation - Email must be valid",
    defaultMessage: "Email must be valid",
    id: "8di2Oc",
  },
  passwordTooShort: {
    description: "FormValidation - Password is too short (minimum 8 characters)",
    defaultMessage: "Password is too short - should be 8 chars minimum",
    id: "irK1Wl",
  },
  passwordConfirmRequired: {
    description: "FormValidation - Password confirmation is required",
    defaultMessage: "Password must be confirmed",
    id: "EZrpOs",
  },
  passwordsMustMatch: {
    description: "FormValidation - Passwords must match",
    defaultMessage: "Passwords must match",
    id: "LYevZg",
  },
});

export interface FormValidation {
  emailSchema: z.ZodString;
  passwordSchema: z.ZodString;
  passwordConfirmSchema: z.ZodString;
  passwordsMustMatchMessage: string;
}

export function useFormValidation(): FormValidation {
  const intl = useIntl();

  return {
    emailSchema: z.email(intl.formatMessage(messages.emailInvalid)),
    passwordSchema: z.string().min(8, intl.formatMessage(messages.passwordTooShort)),
    passwordConfirmSchema: z.string().min(8, intl.formatMessage(messages.passwordConfirmRequired)),
    passwordsMustMatchMessage: intl.formatMessage(messages.passwordsMustMatch),
  };
}
