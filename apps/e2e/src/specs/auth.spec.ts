import { mocksClient } from "@package/mocks";
import { expect, test } from "../fixtures";

test.describe("auth.loggedin", () => {
  test.beforeEach(async () => {
    await mocksClient.useRouteVariant("Tokens_Refresh:400-json-status-400-no-error");
  });

  test("do login attempt", async ({ page }) => {
    await page.goto("/");

    await expect(async () => {
      expect(await page.title()).toBe("Login");
    }).toPass();

    await page.getByTestId("login-form__email-input").fill("root@admin.com");
    await page.getByTestId("login-form__password-input").fill("password");
    await page.getByTestId("login-form__submit-button").click();

    await expect(async () => {
      expect(await page.title()).toBe("Home");
    }).toPass();
  });
});

test.describe("auth.refreshtoken", () => {
  test.beforeEach(async () => {
    await mocksClient.restoreRouteVariants();
  });

  test("do refresh", async ({ page }) => {
    await page.goto("/");

    await expect(async () => {
      expect(await page.title()).toBe("Home");
    }).toPass();
  });
});

test.describe("auth.logout", () => {
  test.beforeEach(async () => {
    await mocksClient.restoreRouteVariants();
  });

  test("do logout attempt", async ({ page }) => {
    await page.goto("/");

    await expect(async () => {
      expect(await page.title()).toBe("Home");
    }).toPass();

    await page.getByTestId("home-page__menu-button").click();
    await page.getByTestId("quick-menu__logout-button").click();

    await expect(async () => {
      expect(await page.title()).toBe("Login");
    }).toPass();
  });
});

test.describe("auth.forgotpassword", () => {
  test.beforeEach(async () => {
    await mocksClient.useRouteVariant("Tokens_Refresh:400-json-status-400-no-error");
  });

  test("shows validation error on invalid email submission", async ({ page }) => {
    await page.goto("/#/forgot-password");

    await expect(async () => {
      expect(await page.title()).toBe("Forgot Password");
    }).toPass();

    // Fill an invalid email and submit — Zod validation should block navigation
    await page.getByTestId("forgot-password-form__email-input").fill("not-an-email");
    await page.getByTestId("forgot-password-form__submit-button").click();

    // Page should remain on Forgot Password (form validation prevented submission)
    expect(await page.title()).toBe("Forgot Password");
  });

  test("submits successfully with valid email", async ({ page }) => {
    await mocksClient.useRouteVariant("Users_ForgotPassword:200-json-default");

    await page.goto("/#/forgot-password");

    await expect(async () => {
      expect(await page.title()).toBe("Forgot Password");
    }).toPass();

    await page.getByTestId("forgot-password-form__email-input").fill("user@example.com");
    await page.getByTestId("forgot-password-form__submit-button").click();

    // After successful submission the route navigates to "/" which redirects to login (unauthenticated)
    await expect(async () => {
      expect(await page.title()).toBe("Login");
    }).toPass();
  });
});

test.describe("auth.signup", () => {
  test.beforeEach(async () => {
    await mocksClient.useRouteVariant("Tokens_Refresh:400-json-status-400-no-error");
  });

  test("shows validation error when passwords do not match", async ({ page }) => {
    await page.goto("/#/sign-up");

    await expect(async () => {
      expect(await page.title()).toBe("Sign Up");
    }).toPass();

    await page.getByTestId("sign-up-form__username-input").fill("testuser");
    await page.getByTestId("sign-up-form__email-input").fill("test@example.com");
    await page.getByTestId("sign-up-form__password-input").fill("password123");
    await page.getByTestId("sign-up-form__confirmpassword-input").fill("differentpassword");
    await page.getByTestId("sign-up-form__submit-button").click();

    // After failed validation, canSubmit becomes false and button is disabled
    const submitButton = page.getByTestId("sign-up-form__submit-button");
    await expect(submitButton).toBeDisabled();
  });

  test("submits successfully with valid sign-up data", async ({ page }) => {
    await mocksClient.useRouteVariant("Users_SelfRegister:200-json-default");

    await page.goto("/#/sign-up");

    await expect(async () => {
      expect(await page.title()).toBe("Sign Up");
    }).toPass();

    await page.getByTestId("sign-up-form__username-input").fill("newuser");
    await page.getByTestId("sign-up-form__email-input").fill("newuser@example.com");
    await page.getByTestId("sign-up-form__password-input").fill("securepassword");
    await page.getByTestId("sign-up-form__confirmpassword-input").fill("securepassword");
    await page.getByTestId("sign-up-form__submit-button").click();

    // After successful signup the route navigates to "/" which redirects to login (unauthenticated)
    await expect(async () => {
      expect(await page.title()).toBe("Login");
    }).toPass();
  });
});
