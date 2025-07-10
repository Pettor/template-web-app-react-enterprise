import type { ReactElement } from "react";
import { Button, Form, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { useForm, Controller } from "react-hook-form";
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
  onSubmit: SubmitHandler<FormSignUp>;
}

export function SignUpForm({ loading, onSubmit }: SignUpFormProps): ReactElement {
  const intl = useIntl();

  const schema = z
    .object({
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
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: intl.formatMessage({
        description: "SignUpFormValidation - Passwords must match",
        defaultMessage: "Passwords must match",
        id: "IOLTJ0",
      }),
      path: ["confirmPassword"],
    });

  const { control, handleSubmit, register } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="md:min-w-sm">
      <Controller
        control={control}
        name="userName"
        render={({ fieldState: { invalid, error } }) => (
          <Input
            {...register("userName")}
            autoFocus
            id="userName"
            type="text"
            placeholder={intl.formatMessage({
              description: "SignUpFormLabel - User Name",
              defaultMessage: "What should we call you?",
              id: "f2xRFX",
            })}
            errorMessage={error?.message}
            isInvalid={invalid}
            validationBehavior="aria"
            data-testid="sign-up-form__username-input"
          />
        )}
      />
      <Controller
        control={control}
        name="firstName"
        render={({ fieldState: { invalid, error } }) => (
          <Input
            {...register("firstName")}
            id="firstName"
            type="text"
            placeholder={intl.formatMessage({
              description: "SignUpFormLabel - First Name",
              defaultMessage: "What is your first name?",
              id: "NFDCUF",
            })}
            errorMessage={error?.message}
            isInvalid={invalid}
            validationBehavior="aria"
            data-testid="sign-up-form__firstname-input"
          />
        )}
      />
      <Controller
        control={control}
        name="lastName"
        render={({ fieldState: { invalid, error } }) => (
          <Input
            {...register("lastName")}
            id="lastName"
            type="text"
            placeholder={intl.formatMessage({
              description: "SignUpFormLabel - Last Name",
              defaultMessage: "What is your last name?",
              id: "3YTbxI",
            })}
            errorMessage={error?.message}
            isInvalid={invalid}
            validationBehavior="aria"
            data-testid="sign-up-form__lastname-input"
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ fieldState: { invalid, error } }) => (
          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder={intl.formatMessage({
              description: "SignUpFormLabel - Email",
              defaultMessage: "What's your email?",
              id: "tZBQgk",
            })}
            errorMessage={error?.message}
            isInvalid={invalid}
            validationBehavior="aria"
            data-testid="sign-up-form__email-input"
          />
        )}
      />
      <Controller
        control={control}
        name="phoneNumber"
        render={({ fieldState: { invalid, error } }) => (
          <Input
            {...register("phoneNumber")}
            id="phoneNumber"
            type="tel"
            placeholder={intl.formatMessage({
              description: "SignUpFormLabel - Phone Number",
              defaultMessage: "What's your phone number?",
              id: "UjAA8C",
            })}
            errorMessage={error?.message}
            isInvalid={invalid}
            validationBehavior="aria"
            data-testid="sign-up-form__phonenumber-input"
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ fieldState: { invalid, error } }) => (
          <Input
            {...register("password")}
            id="password"
            type="password"
            placeholder={intl.formatMessage({
              description: "SignUpFormLabel - Password",
              defaultMessage: "Create a password",
              id: "ppqAda",
            })}
            errorMessage={error?.message}
            isInvalid={invalid}
            validationBehavior="aria"
            data-testid="sign-up-form__password-input"
          />
        )}
      />
      <Controller
        control={control}
        name="confirmPassword"
        render={({ fieldState: { invalid, error } }) => (
          <Input
            {...register("confirmPassword")}
            id="confirmPassword"
            type="password"
            placeholder={intl.formatMessage({
              description: "SignUpFormLabel - Confirm Password",
              defaultMessage: "Confirm password",
              id: "dU9xzq",
            })}
            errorMessage={error?.message}
            isInvalid={invalid}
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
