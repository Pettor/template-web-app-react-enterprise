import type { ReactElement } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { Button, Form, Spacer } from "@heroui/react";
import { useForm } from "@tanstack/react-form";
import { useIntl } from "react-intl";
import { z } from "zod";
import { InputField } from "~/components/input/InputField";

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
    email: z.email(
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
      className="md:min-w-sm"
    >
      <form.Field
        name="email"
        children={(field) => (
          <InputField
            autoFocus
            field={field}
            type="email"
            fullWidth
            label={intl.formatMessage({
              description: "ForgotPasswordFormValidation - Email label",
              defaultMessage: "Email",
              id: "0YmbIp",
            })}
            startContent={<EnvelopeIcon className="h-5 w-5" />}
            data-testid="forgot-password-form__email-input"
          />
        )}
      />
      <Spacer />
      <form.Subscribe
        selector={(state) => [state.canSubmit]}
        children={([canSubmit]) => (
          <Button
            isLoading={loading}
            disabled={!canSubmit}
            color="primary"
            type="submit"
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
        )}
      />
    </Form>
  );
}
