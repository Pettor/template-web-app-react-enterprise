import type { ReactElement } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import * as yup from "yup";
import { Button, Form, Input, Spacer } from "@heroui/react";

export interface FormForgotPassword {
  email: string;
}

export interface ForgotPasswordFormProps {
  loading: boolean;
  onSubmit: SubmitHandler<FormForgotPassword>;
}

export function ForgotPasswordForm({ loading, onSubmit }: ForgotPasswordFormProps): ReactElement {
  const intl = useIntl();

  const schema = yup
    .object()
    .shape({
      email: yup
        .string()
        .email(
          intl.formatMessage({
            description: "ForgotPasswordFormValidation - Email must be valid",
            defaultMessage: "Email must be valid",
            id: "4lmP9Q",
          })
        )
        .required(
          intl.formatMessage({
            description: "ForgotPasswordFormValidation - Email is required",
            defaultMessage: "Email is required",
            id: "wtHdxy",
          })
        ),
    })
    .required();

  const {
    handleSubmit: handleFormSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <Form onSubmit={handleFormSubmit(onSubmit)} className="md:min-w-sm">
      <Input
        autoFocus
        id="email"
        type="email"
        fullWidth
        label={intl.formatMessage({
          description: "ForgotPasswordFormValidation - Email label",
          defaultMessage: "Email",
          id: "2k1Z5e",
        })}
        startContent={<EnvelopeIcon className="h-5 w-5" />}
        errorMessage={errors.email?.message}
        data-testid="forgot-password-form__email-input"
        {...register("email")}
      />
      <Spacer />
      <Button
        isLoading={loading}
        type="submit"
        className="btn btn-primary text-base-100 dark:text-base-300 z-20"
        title={intl.formatMessage({
          description: "ForgotPasswordFormValidation - Send button title",
          defaultMessage: "Submit",
          id: "ojcPit",
        })}
        aria-label={intl.formatMessage({
          description: "ForgotPasswordFormValidation - Send button title",
          defaultMessage: "Submit",
          id: "ojcPit",
        })}
        data-testid="forgot-password-form__submit-button"
      >
        {intl.formatMessage({
          description: "ForgotPasswordFormValidation - Send",
          defaultMessage: "Send",
          id: "r3YQJ5",
        })}
      </Button>
    </Form>
  );
}
