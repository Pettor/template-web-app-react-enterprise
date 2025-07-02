import type { ReactElement } from "react";
import { Button, Form, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
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

  const {
    handleSubmit: handleFormSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <Form onSubmit={handleFormSubmit(onSubmit)} className="md:min-w-sm">
      <Input
        autoFocus
        id="userName"
        type="text"
        placeholder={intl.formatMessage({
          description: "SignUpFormLabel - User Name",
          defaultMessage: "What should we call you?",
          id: "f2xRFX",
        })}
        isInvalid={!!errors.userName}
        errorMessage={errors.userName?.message}
        {...register("userName")}
        data-testid="sign-up-form__username-input"
      />
      <Input
        id="firstName"
        type="text"
        placeholder={intl.formatMessage({
          description: "SignUpFormLabel - First Name",
          defaultMessage: "What is your first name?",
          id: "NFDCUF",
        })}
        isInvalid={!!errors.firstName}
        errorMessage={errors.firstName?.message}
        {...register("firstName")}
        data-testid="sign-up-form__firstname-input"
      />
      <Input
        id="lastName"
        type="text"
        placeholder={intl.formatMessage({
          description: "SignUpFormLabel - Last Name",
          defaultMessage: "What is your last name?",
          id: "3YTbxI",
        })}
        isInvalid={!!errors.lastName}
        errorMessage={errors.lastName?.message}
        {...register("lastName")}
        data-testid="sign-up-form__lastname-input"
      />
      <Input
        id="email"
        type="email"
        placeholder={intl.formatMessage({
          description: "SignUpFormLabel - Email",
          defaultMessage: "What's your email?",
          id: "tZBQgk",
        })}
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message}
        {...register("email")}
        data-testid="sign-up-form__email-input"
      />
      <Input
        id="phoneNumber"
        type="tel"
        placeholder={intl.formatMessage({
          description: "SignUpFormLabel - Phone Number",
          defaultMessage: "What's your phone number?",
          id: "UjAA8C",
        })}
        isInvalid={!!errors.phoneNumber}
        errorMessage={errors.phoneNumber?.message}
        {...register("phoneNumber")}
        data-testid="sign-up-form__phonenumber-input"
      />
      <Input
        id="password"
        type="password"
        placeholder={intl.formatMessage({
          description: "SignUpFormLabel - Password",
          defaultMessage: "Create a password",
          id: "ppqAda",
        })}
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message}
        {...register("password")}
        data-testid="sign-up-form__password-input"
      />
      <Input
        id="confirmPassword"
        type="password"
        placeholder={intl.formatMessage({
          description: "SignUpFormLabel - Confirm Password",
          defaultMessage: "Confirm password",
          id: "dU9xzq",
        })}
        isInvalid={!!errors.confirmPassword}
        errorMessage={errors.confirmPassword?.message}
        {...register("confirmPassword")}
        data-testid="sign-up-form__confirmpassword-input"
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
