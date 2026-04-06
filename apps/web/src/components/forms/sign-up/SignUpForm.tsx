import type { ReactElement } from "react";
import { Button, Form, Spinner } from "@heroui/react";
import { useForm } from "@tanstack/react-form";
import { useIntl } from "react-intl";
import { z } from "zod";
import { InputField } from "~/components/input/InputField";

export interface FormSignUp {
  firstName?: string;
  lastName?: string;
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
  phoneNumber?: string;
}

export interface SignUpFormProps {
  loading: boolean;
  onSubmit: (data: FormSignUp) => void;
}

export function SignUpForm({ loading, onSubmit }: SignUpFormProps): ReactElement {
  const intl = useIntl();

  const baseSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    userName: z.string().min(
      1,
      intl.formatMessage({
        description: "SignUpFormValidation - Display Name is required",
        defaultMessage: "We need to call you something",
        id: "piUPAg",
      })
    ),
    email: z.email(
      intl.formatMessage({
        description: "SignUpFormValidation - Email must be valid",
        defaultMessage: "Email must be valid",
        id: "SBRRVR",
      })
    ),
    password: z.string().min(
      8,
      intl.formatMessage({
        description: "SignUpFormValidation - Password is too short - min 8 characters",
        defaultMessage: "Password is too short - should be 8 chars minimum",
        id: "YzHSuh",
      })
    ),
    confirmPassword: z.string().min(
      8,
      intl.formatMessage({
        description: "SignUpFormValidation - PasswordConfirm is required",
        defaultMessage: "Password must be confirmed",
        id: "WZbH01",
      })
    ),
    phoneNumber: z.string(),
  });

  const schema = baseSchema.refine((data) => data.password === data.confirmPassword, {
    message: intl.formatMessage({
      description: "SignUpFormValidation - Passwords must match",
      defaultMessage: "Passwords must match",
      id: "IOLTJ0",
    }),
    path: ["confirmPassword"],
  });

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    },
    validators: {
      onSubmit: schema,
    },
    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
  });

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex min-w-full flex-col gap-4 md:min-w-sm"
    >
      <form.Field
        name="userName"
        children={(field) => (
          <InputField
            autoFocus
            fullWidth
            field={field}
            type="text"
            label={intl.formatMessage({
              description: "SignUpFormLabel - User Name label",
              defaultMessage: "Username",
              id: "JCIgkj",
            })}
            placeholder={intl.formatMessage({
              description: "SignUpFormLabel - User Name",
              defaultMessage: "What should we call you?",
              id: "f2xRFX",
            })}
            data-testid="sign-up-form__username-input"
          />
        )}
      />
      <form.Field
        name="firstName"
        children={(field) => (
          <InputField
            field={field}
            type="text"
            label={intl.formatMessage({
              description: "SignUpFormLabel - First Name label",
              defaultMessage: "First name",
              id: "Jh5bEL",
            })}
            placeholder={intl.formatMessage({
              description: "SignUpFormLabel - First Name",
              defaultMessage: "What is your first name?",
              id: "NFDCUF",
            })}
            data-testid="sign-up-form__firstname-input"
          />
        )}
      />
      <form.Field
        name="lastName"
        children={(field) => (
          <InputField
            field={field}
            type="text"
            label={intl.formatMessage({
              description: "SignUpFormLabel - Last Name label",
              defaultMessage: "Last name",
              id: "txpR8G",
            })}
            placeholder={intl.formatMessage({
              description: "SignUpFormLabel - Last Name",
              defaultMessage: "What is your last name?",
              id: "3YTbxI",
            })}
            data-testid="sign-up-form__lastname-input"
          />
        )}
      />
      <form.Field
        name="email"
        children={(field) => (
          <InputField
            field={field}
            type="email"
            label={intl.formatMessage({
              description: "SignUpFormLabel - Email label",
              defaultMessage: "Email",
              id: "kcGGHB",
            })}
            placeholder={intl.formatMessage({
              description: "SignUpFormLabel - Email",
              defaultMessage: "What's your email?",
              id: "tZBQgk",
            })}
            data-testid="sign-up-form__email-input"
          />
        )}
      />
      <form.Field
        name="phoneNumber"
        children={(field) => (
          <InputField
            field={field}
            type="tel"
            label={intl.formatMessage({
              description: "SignUpFormLabel - Phone Number label",
              defaultMessage: "Phone number",
              id: "jdJhOL",
            })}
            placeholder={intl.formatMessage({
              description: "SignUpFormLabel - Phone Number",
              defaultMessage: "What's your phone number?",
              id: "UjAA8C",
            })}
            data-testid="sign-up-form__phonenumber-input"
          />
        )}
      />
      <form.Field
        name="password"
        children={(field) => (
          <InputField
            field={field}
            type="password"
            label={intl.formatMessage({
              description: "SignUpFormLabel - Password label",
              defaultMessage: "Password",
              id: "IVFk2K",
            })}
            placeholder={intl.formatMessage({
              description: "SignUpFormLabel - Password",
              defaultMessage: "Create a password",
              id: "ppqAda",
            })}
            data-testid="sign-up-form__password-input"
          />
        )}
      />
      <form.Field
        name="confirmPassword"
        children={(field) => (
          <InputField
            field={field}
            type="password"
            label={intl.formatMessage({
              description: "SignUpFormLabel - Confirm Password label",
              defaultMessage: "Confirm password",
              id: "MN04gk",
            })}
            placeholder={intl.formatMessage({
              description: "SignUpFormLabel - Confirm Password",
              defaultMessage: "Confirm password",
              id: "dU9xzq",
            })}
            data-testid="sign-up-form__confirmpassword-input"
          />
        )}
      />
      <form.Subscribe
        selector={(state) => [state.canSubmit]}
        children={([canSubmit]) => (
          <Button
            isDisabled={!canSubmit || loading}
            variant="primary"
            type="submit"
            onPress={() => form.handleSubmit()}
            data-testid="sign-up-form__submit-button"
          >
            {loading && <Spinner size="sm" />}
            {intl.formatMessage({
              description: "SignUpFormButton - Sign Up",
              defaultMessage: "Sign Up",
              id: "oigOyc",
            })}
          </Button>
        )}
      />
    </Form>
  );
}
