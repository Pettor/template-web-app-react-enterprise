import type { ReactElement } from "react";
import { Button, Form } from "@heroui/react";
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
      className="min-w-full md:min-w-sm"
    >
      <form.Field
        name="userName"
        children={(field) => (
          <InputField
            autoFocus
            fullWidth
            field={field}
            type="text"
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
            isLoading={loading}
            disabled={!canSubmit}
            color="primary"
            type="submit"
            onPress={() => form.handleSubmit()}
            data-testid="sign-up-form__submit-button"
          >
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
