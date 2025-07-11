import { useState, type ReactElement } from "react";
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Button, Checkbox, Form, Input, Link } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { useForm, Controller } from "react-hook-form";
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
  onSubmit: SubmitHandler<FormLogin>;
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

  const { control, handleSubmit, register } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center">
      <Controller
        control={control}
        name="email"
        render={({ fieldState: { invalid, error } }) => (
          <Input
            {...register("email")}
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
            errorMessage={error?.message}
            isInvalid={invalid}
            validationBehavior="aria"
            data-testid="login-form__email-input"
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ fieldState: { invalid, error } }) => (
          <Input
            {...register("password")}
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
            errorMessage={error?.message}
            isInvalid={invalid}
            validationBehavior="aria"
            data-testid="login-form__password-input"
          />
        )}
      />
      <div className="flex w-full items-center justify-between px-1 py-2">
        <Checkbox defaultSelected size="sm" {...register("remember")}>
          {intl.formatMessage({
            description: "LoginForm - Remember me checkbox label",
            defaultMessage: "Remember me",
            id: "eSCI59",
          })}
        </Checkbox>
        <Link className="text-default-500 cursor-pointer" size="sm" onPress={onForgotPassword}>
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
