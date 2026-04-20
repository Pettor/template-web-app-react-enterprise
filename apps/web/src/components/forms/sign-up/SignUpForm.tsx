import type { ReactElement } from "react";
import { EnvelopeIcon, IdentificationIcon, LockClosedIcon, PhoneIcon, UserIcon } from "@heroicons/react/24/outline";
import { Button, Form, Spinner } from "@heroui/react";
import { useForm } from "@tanstack/react-form";
import { useIntl } from "react-intl";
import { z } from "zod";
import { useFormValidation } from "../shared/FormValidation";
import { signUpFormMessages } from "./SignUpForm.messages";
import { InputField } from "~/components/input/input-field/InputField";

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
  const { emailSchema, passwordSchema, passwordConfirmSchema, passwordsMustMatchMessage } = useFormValidation();

  const baseSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    userName: z.string().min(1, intl.formatMessage(signUpFormMessages.userNameRequired)),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordConfirmSchema,
    phoneNumber: z.string(),
  });

  const schema = baseSchema.refine((data) => data.password === data.confirmPassword, {
    message: passwordsMustMatchMessage,
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
      className="flex min-w-full flex-col gap-4 md:min-w-sm"
    >
      <form.Field
        name="userName"
        children={(field) => (
          <InputField
            autoFocus
            fullWidth
            field={field}
            type="text"
            startContent={<UserIcon className="h-5 w-5" />}
            label={intl.formatMessage(signUpFormMessages.userNameLabel)}
            placeholder={intl.formatMessage(signUpFormMessages.userNamePlaceholder)}
            data-testid="sign-up-form__username-input"
          />
        )}
      />
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        <form.Field
          name="firstName"
          children={(field) => (
            <InputField
              field={field}
              type="text"
              startContent={<IdentificationIcon className="h-5 w-5" />}
              label={intl.formatMessage(signUpFormMessages.firstNameLabel)}
              placeholder={intl.formatMessage(signUpFormMessages.firstNamePlaceholder)}
              data-testid="sign-up-form__firstname-input"
            />
          )}
        />
        <form.Field
          name="lastName"
          children={(field) => (
            <InputField
              field={field}
              type="text"
              startContent={<IdentificationIcon className="h-5 w-5" />}
              label={intl.formatMessage(signUpFormMessages.lastNameLabel)}
              placeholder={intl.formatMessage(signUpFormMessages.lastNamePlaceholder)}
              data-testid="sign-up-form__lastname-input"
            />
          )}
        />
      </div>
      <form.Field
        name="email"
        children={(field) => (
          <InputField
            field={field}
            type="email"
            startContent={<EnvelopeIcon className="h-5 w-5" />}
            label={intl.formatMessage(signUpFormMessages.emailLabel)}
            placeholder={intl.formatMessage(signUpFormMessages.emailPlaceholder)}
            data-testid="sign-up-form__email-input"
          />
        )}
      />
      <form.Field
        name="phoneNumber"
        children={(field) => (
          <InputField
            field={field}
            type="tel"
            startContent={<PhoneIcon className="h-5 w-5" />}
            label={intl.formatMessage(signUpFormMessages.phoneNumberLabel)}
            placeholder={intl.formatMessage(signUpFormMessages.phoneNumberPlaceholder)}
            data-testid="sign-up-form__phonenumber-input"
          />
        )}
      />
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        <form.Field
          name="password"
          children={(field) => (
            <InputField
              field={field}
              type="password"
              startContent={<LockClosedIcon className="h-5 w-5" />}
              label={intl.formatMessage(signUpFormMessages.passwordLabel)}
              placeholder={intl.formatMessage(signUpFormMessages.passwordPlaceholder)}
              data-testid="sign-up-form__password-input"
            />
          )}
        />
        <form.Field
          name="confirmPassword"
          children={(field) => (
            <InputField
              field={field}
              type="password"
              startContent={<LockClosedIcon className="h-5 w-5" />}
              label={intl.formatMessage(signUpFormMessages.confirmPasswordLabel)}
              placeholder={intl.formatMessage(signUpFormMessages.confirmPasswordPlaceholder)}
              data-testid="sign-up-form__confirmpassword-input"
            />
          )}
        />
      </div>
      <form.Subscribe
        selector={(state) => [state.canSubmit]}
        children={([canSubmit]) => (
          <Button
            isDisabled={!canSubmit || loading}
            variant="primary"
            type="submit"
            size="lg"
            className="mt-2 w-full"
            onPress={() => form.handleSubmit()}
            data-testid="sign-up-form__submit-button"
          >
            {loading && <Spinner size="sm" />}
            {intl.formatMessage(signUpFormMessages.submit)}
          </Button>
        )}
      />
    </Form>
  );
}
