import { useIntl, defineMessages } from "react-intl";
import { z } from "zod";

const messages = defineMessages({
  emailInvalid: {
    description: "FormValidation: error - email must be valid",
    defaultMessage: "Email must be valid",
    id: "s7lnsz",
  },
  passwordTooShort: {
    description: "FormValidation: error - password too short (min 8 chars)",
    defaultMessage: "Password is too short - should be 8 chars minimum",
    id: "hYfjyQ",
  },
  passwordConfirmRequired: {
    description: "FormValidation: error - password confirmation required",
    defaultMessage: "Password must be confirmed",
    id: "Y342si",
  },
  passwordsMustMatch: {
    description: "FormValidation: error - passwords must match",
    defaultMessage: "Passwords must match",
    id: "WJko8Q",
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
    emailSchema: z.string().email(intl.formatMessage(messages.emailInvalid)),
    passwordSchema: z.string().min(8, intl.formatMessage(messages.passwordTooShort)),
    passwordConfirmSchema: z.string().min(8, intl.formatMessage(messages.passwordConfirmRequired)),
    passwordsMustMatchMessage: intl.formatMessage(messages.passwordsMustMatch),
  };
}
