import type { ReactElement } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { Button, Form, Input, Spacer } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { useForm, Controller } from "react-hook-form";
import { useIntl } from "react-intl";
import { z } from "zod";

export interface FormForgotPassword {
  email: string;
}

export interface ForgotPasswordFormProps {
  loading: boolean;
  onSubmit: SubmitHandler<FormForgotPassword>;
}

export function ForgotPasswordForm({ loading, onSubmit }: ForgotPasswordFormProps): ReactElement {
  const intl = useIntl();

  const schema = z.object({
    email: z
      .string()
      .min(
        1,
        intl.formatMessage({
          description: "ForgotPasswordFormValidation - Email is required",
          defaultMessage: "Email is required",
          id: "wtHdxy",
        })
      )
      .email(
        intl.formatMessage({
          description: "ForgotPasswordFormValidation - Email must be valid",
          defaultMessage: "Email must be valid",
          id: "4lmP9Q",
        })
      ),
  });

  const { control, handleSubmit, register } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="md:min-w-sm">
      <Controller
        control={control}
        name="email"
        render={({ fieldState: { invalid, error } }) => (
          <Input
            {...register("email")}
            autoFocus
            id="email"
            type="email"
            fullWidth
            label={intl.formatMessage({
              description: "ForgotPasswordFormValidation - Email label",
              defaultMessage: "Email",
              id: "0YmbIp",
            })}
            startContent={<EnvelopeIcon className="h-5 w-5" />}
            errorMessage={error?.message}
            isInvalid={invalid}
            validationBehavior="aria"
            data-testid="forgot-password-form__email-input"
          />
        )}
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
