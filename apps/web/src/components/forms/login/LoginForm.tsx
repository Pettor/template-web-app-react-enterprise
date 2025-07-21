import { useState, type ReactElement } from "react";
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Button, Checkbox, Form, Link } from "@heroui/react";
import { useForm } from "@tanstack/react-form";
import { useIntl } from "react-intl";
import { z } from "zod";
import { InputField } from "~/components/input/InputField";

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
    email: z.email(
      intl.formatMessage({
        description: "LoginFormValidation - Email must be valid",
        defaultMessage: "Email must be valid",
        id: "+2i1XS",
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
    remember: z.boolean(),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
    validators: {
      onSubmit: schema,
    },
    onSubmit: async (values) => {
      onSubmit(values.value);
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
        children={(field) => {
          return (
            <InputField
              fullWidth
              autoFocus
              field={field}
              autoComplete="username"
              id={field.name}
              type="email"
              variant="bordered"
              placeholder={intl.formatMessage({
                description: "LoginForm - Email input placeholder",
                defaultMessage: "Email",
                id: "P2Xl0E",
              })}
              startContent={<EnvelopeIcon className="h-5 w-5" />}
              data-testid="login-form__email-input"
            />
          );
        }}
      />
      <form.Field
        name="password"
        children={(field) => (
          <InputField
            fullWidth
            field={field}
            autoComplete="current-password"
            type={isVisible ? "text" : "password"}
            variant="bordered"
            placeholder={intl.formatMessage({
              description: "LoginForm - Password input placeholder",
              defaultMessage: "Password",
              id: "2hRtil",
            })}
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
      <form.Subscribe
        selector={(state) => [state.canSubmit]}
        children={([canSubmit]) => (
          <Button
            fullWidth
            isLoading={loading}
            disabled={!canSubmit}
            color="primary"
            type="submit"
            onPress={() => form.handleSubmit()}
            data-testid="login-form__submit-button"
          >
            {intl.formatMessage({
              description: "LoginForm - Submit button text",
              defaultMessage: "Login",
              id: "/83/VX",
            })}
          </Button>
        )}
      />
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
