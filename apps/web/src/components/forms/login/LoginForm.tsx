import { useState, type ReactElement } from "react";
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Button, Checkbox, Form, Input, Link } from "@heroui/react";
import { useForm } from "@tanstack/react-form";
import { useIntl } from "react-intl";
import { z } from "zod";

export interface FormLogin {
  email: string;
  password: string;
  remember?: boolean;
}

export interface LoginFormProps {
  loading: boolean;
  error?: string;
  onForgotPassword(): void;
  onSignUp(): void;
  onSubmit: (data: FormLogin) => void;
}

export function LoginForm({ loading, error, onForgotPassword, onSignUp, onSubmit }: LoginFormProps): ReactElement {
  const intl = useIntl();
  const [isVisible, setIsVisible] = useState(false);

  function toggleVisibility(): void {
    setIsVisible(!isVisible);
  }

  const schema = z.object({
    email: z
      .string()
      .min(
        1,
        intl.formatMessage({
          description: "LoginFormValidation - Email is required",
          defaultMessage: "Email is required",
          id: "sJG6e/",
        })
      )
      .email(
        intl.formatMessage({
          description: "LoginFormValidation - Email must be valid",
          defaultMessage: "Email must be valid",
          id: "+2i1XS",
        })
      ),
    password: z.string().min(
      1,
      intl.formatMessage({
        description: "LoginFormValidation - Password is required",
        defaultMessage: "Password is required",
        id: "+ADOR2",
      })
    ),
    remember: z.boolean().optional(),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
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
      className="flex flex-col justify-center"
    >
      <form.Field
        name="email"
        validators={{
          onChange: ({ value }) => {
            const result = schema.shape.email.safeParse(value);
            return result.success ? undefined : result.error.format()._errors[0];
          },
        }}
        children={(field) => (
          <Input
            fullWidth
            autoFocus
            id="email"
            type="text"
            variant="bordered"
            placeholder={intl.formatMessage({
              description: "LoginForm - Email input placeholder",
              defaultMessage: "Email",
              id: "P2Xl0E",
            })}
            autoComplete="username"
            startContent={<EnvelopeIcon className="h-5 w-5" />}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            errorMessage={field.state.meta.errors.join(", ")}
            isInvalid={field.state.meta.errors.length > 0}
            validationBehavior="aria"
            data-testid="login-form__email-input"
          />
        )}
      />
      <form.Field
        name="password"
        validators={{
          onChange: ({ value }) => {
            const result = schema.shape.password.safeParse(value);
            return result.success ? undefined : result.error.format()._errors[0];
          },
        }}
        children={(field) => (
          <Input
            fullWidth
            id="password"
            type={isVisible ? "text" : "password"}
            variant="bordered"
            placeholder={intl.formatMessage({
              description: "LoginForm - Password input placeholder",
              defaultMessage: "Password",
              id: "2hRtil",
            })}
            autoComplete="current-password"
            startContent={<LockClosedIcon className="h-5 w-5" />}
            endContent={
              <button
                type="button"
                onClick={toggleVisibility}
                aria-label={intl.formatMessage({
                  defaultMessage: "Toggle password visibility",
                  id: "KjXbli",
                  description: "LoginForm - Toggle password visibility button aria label",
                })}
              >
                {isVisible ? <EyeIcon className="h-5 w-5" /> : <EyeSlashIcon className="h-5 w-5" />}
              </button>
            }
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            errorMessage={field.state.meta.errors.join(", ")}
            isInvalid={field.state.meta.errors.length > 0}
            validationBehavior="aria"
            data-testid="login-form__password-input"
          />
        )}
      />
      <div className="flex w-full items-center justify-between px-1 py-2">
        <form.Field
          name="remember"
          children={(field) => (
            <Checkbox size="sm" isSelected={field.state.value} onValueChange={(value) => field.handleChange(value)}>
              <p className="text-xs sm:text-sm">
                {intl.formatMessage({
                  description: "LoginForm - Remember me checkbox label",
                  defaultMessage: "Remember me",
                  id: "eSCI59",
                })}
              </p>
            </Checkbox>
          )}
        />
        <Link className="cursor-pointer text-xs sm:text-sm" size="sm" onPress={onForgotPassword}>
          {intl.formatMessage({
            description: "LoginForm - Forgot password link",
            defaultMessage: "Forgot password?",
            id: "Zz40WB",
          })}
        </Link>
      </div>
      <Button
        isLoading={loading}
        className="w-full"
        color="primary"
        type="submit"
        data-testid="login-form__submit-button"
      >
        {intl.formatMessage({
          description: "LoginForm - Submit button text",
          defaultMessage: "Login",
          id: "/83/VX",
        })}
      </Button>
      {error && <div className="text-small text-danger">{error}</div>}
      <p className="text-small text-center">
        <Link className="cursor-pointer" size="sm" onPress={onSignUp}>
          {intl.formatMessage({
            description: "LoginForm - Sign up link",
            defaultMessage: "Don't have an account? Sign up",
            id: "FroJyb",
          })}
        </Link>
      </p>
    </Form>
  );
}
