import type { ReactElement } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { Button, Form, Input, Spacer } from "@heroui/react";
import { useForm } from "@tanstack/react-form";
import { useIntl } from "react-intl";
import { z } from "zod";

export interface FormForgotPassword {
  email: string;
}

export interface ForgotPasswordFormProps {
  loading: boolean;
  onSubmit: (data: FormForgotPassword) => void;
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

  const form = useForm({
    defaultValues: {
      email: "",
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
        name="email"
        validators={{
          onChange: ({ value }) => {
            const result = schema.shape.email.safeParse(value);
            return result.success ? undefined : result.error.format()._errors[0];
          },
        }}
        children={(field) => (
          <Input
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
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            errorMessage={field.state.meta.errors.join(", ")}
            isInvalid={field.state.meta.errors.length > 0}
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
