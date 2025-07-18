import type { ReactElement } from "react";
import { Button, Form, Input } from "@heroui/react";
import { useForm } from "@tanstack/react-form";
import { useIntl } from "react-intl";
import { z } from "zod";

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
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    userName: z.string().min(
      1,
      intl.formatMessage({
        description: "SignUpFormValidation - Display Name is required",
        defaultMessage: "We need to call you something",
        id: "piUPAg",
      })
    ),
    email: z
      .string()
      .min(
        1,
        intl.formatMessage({
          description: "SignUpFormValidation - Email is required",
          defaultMessage: "Email is required",
          id: "o5TvN6",
        })
      )
      .email(
        intl.formatMessage({
          description: "SignUpFormValidation - Email must be valid",
          defaultMessage: "Email must be valid",
          id: "SBRRVR",
        })
      ),
    password: z
      .string()
      .min(
        1,
        intl.formatMessage({
          description: "SignUpFormValidation - Password is required",
          defaultMessage: "Password is required",
          id: "p9y0Zh",
        })
      )
      .min(
        8,
        intl.formatMessage({
          description: "SignUpFormValidation - Password is too short - min 8 characters",
          defaultMessage: "Password is too short - should be 8 chars minimum",
          id: "YzHSuh",
        })
      ),
    confirmPassword: z.string().min(
      1,
      intl.formatMessage({
        description: "SignUpFormValidation - PasswordConfirm is required",
        defaultMessage: "Password must be confirmed",
        id: "WZbH01",
      })
    ),
    phoneNumber: z.string().optional(),
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
      onSubmit: ({ value }) => {
        const result = schema.safeParse(value);
        return result.success ? undefined : result.error.format();
      },
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
      className="md:min-w-sm"
    >
      <form.Field
        name="userName"
        validators={{
          onChange: ({ value }) => {
            const result = baseSchema.shape.userName.safeParse(value);
            return result.success ? undefined : result.error.format()._errors[0];
          },
        }}
        children={(field) => (
          <Input
            autoFocus
            id="userName"
            type="text"
            placeholder={intl.formatMessage({
              description: "SignUpFormLabel - User Name",
              defaultMessage: "What should we call you?",
              id: "f2xRFX",
            })}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            errorMessage={field.state.meta.errors.join(", ")}
            isInvalid={field.state.meta.errors.length > 0}
            validationBehavior="aria"
            data-testid="sign-up-form__username-input"
          />
        )}
      />
      <form.Field
        name="firstName"
        validators={{
          onChange: ({ value }) => {
            const result = baseSchema.shape.firstName.safeParse(value);
            return result.success ? undefined : result.error.format()._errors[0];
          },
        }}
        children={(field) => (
          <Input
            id="firstName"
            type="text"
            placeholder={intl.formatMessage({
              description: "SignUpFormLabel - First Name",
              defaultMessage: "What is your first name?",
              id: "NFDCUF",
            })}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            errorMessage={field.state.meta.errors.join(", ")}
            isInvalid={field.state.meta.errors.length > 0}
            validationBehavior="aria"
            data-testid="sign-up-form__firstname-input"
          />
        )}
      />
      <form.Field
        name="lastName"
        validators={{
          onChange: ({ value }) => {
            const result = baseSchema.shape.lastName.safeParse(value);
            return result.success ? undefined : result.error.format()._errors[0];
          },
        }}
        children={(field) => (
          <Input
            id="lastName"
            type="text"
            placeholder={intl.formatMessage({
              description: "SignUpFormLabel - Last Name",
              defaultMessage: "What is your last name?",
              id: "3YTbxI",
            })}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            errorMessage={field.state.meta.errors.join(", ")}
            isInvalid={field.state.meta.errors.length > 0}
            validationBehavior="aria"
            data-testid="sign-up-form__lastname-input"
          />
        )}
      />
      <form.Field
        name="email"
        validators={{
          onChange: ({ value }) => {
            const result = baseSchema.shape.email.safeParse(value);
            return result.success ? undefined : result.error.format()._errors[0];
          },
        }}
        children={(field) => (
          <Input
            id="email"
            type="email"
            placeholder={intl.formatMessage({
              description: "SignUpFormLabel - Email",
              defaultMessage: "What's your email?",
              id: "tZBQgk",
            })}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            errorMessage={field.state.meta.errors.join(", ")}
            isInvalid={field.state.meta.errors.length > 0}
            validationBehavior="aria"
            data-testid="sign-up-form__email-input"
          />
        )}
      />
      <form.Field
        name="phoneNumber"
        validators={{
          onChange: ({ value }) => {
            const result = baseSchema.shape.phoneNumber.safeParse(value);
            return result.success ? undefined : result.error.format()._errors[0];
          },
        }}
        children={(field) => (
          <Input
            id="phoneNumber"
            type="tel"
            placeholder={intl.formatMessage({
              description: "SignUpFormLabel - Phone Number",
              defaultMessage: "What's your phone number?",
              id: "UjAA8C",
            })}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            errorMessage={field.state.meta.errors.join(", ")}
            isInvalid={field.state.meta.errors.length > 0}
            validationBehavior="aria"
            data-testid="sign-up-form__phonenumber-input"
          />
        )}
      />
      <form.Field
        name="password"
        validators={{
          onChange: ({ value }) => {
            const result = baseSchema.shape.password.safeParse(value);
            return result.success ? undefined : result.error.format()._errors[0];
          },
        }}
        children={(field) => (
          <Input
            id="password"
            type="password"
            placeholder={intl.formatMessage({
              description: "SignUpFormLabel - Password",
              defaultMessage: "Create a password",
              id: "ppqAda",
            })}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            errorMessage={field.state.meta.errors.join(", ")}
            isInvalid={field.state.meta.errors.length > 0}
            validationBehavior="aria"
            data-testid="sign-up-form__password-input"
          />
        )}
      />
      <form.Field
        name="confirmPassword"
        validators={{
          onChange: ({ value, fieldApi }) => {
            const passwordValue = field.form.getFieldValue("password");
            if (value && passwordValue && value !== passwordValue) {
              return intl.formatMessage({
                description: "SignUpFormValidation - Passwords must match",
                defaultMessage: "Passwords must match",
                id: "IOLTJ0",
              });
            }
            const result = baseSchema.shape.confirmPassword.safeParse(value);
            return result.success ? undefined : result.error.format()._errors[0];
          },
        }}
        children={(field) => (
          <Input
            id="confirmPassword"
            type="password"
            placeholder={intl.formatMessage({
              description: "SignUpFormLabel - Confirm Password",
              defaultMessage: "Confirm password",
              id: "dU9xzq",
            })}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            errorMessage={field.state.meta.errors.join(", ")}
            isInvalid={field.state.meta.errors.length > 0}
            validationBehavior="aria"
            data-testid="sign-up-form__confirmpassword-input"
          />
        )}
      />
      <Button
        isLoading={loading}
        type="submit"
        className="btn btn-primary text-base-100 dark:text-base-300 z-20 mt-2"
        data-testid="sign-up-form__submit-button"
      >
        {intl.formatMessage({
          description: "SignUpFormButton - Sign Up",
          defaultMessage: "Sign Up",
          id: "oigOyc",
        })}
      </Button>
    </Form>
  );
}
