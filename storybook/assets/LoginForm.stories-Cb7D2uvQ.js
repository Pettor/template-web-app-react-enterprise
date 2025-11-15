import{a as p}from"./DocumentationLayout-23UleARG.js";import"./iframe-C6AZxKr1.js";import{L as c}from"./LoginForm-D9UqVSUX.js";import"./preload-helper-PPVm8Dsz.js";import"./chunk-YFAKJTDR-CzZ_8dr-.js";import"./chunk-JGY6VQQQ-BkgGoZtC.js";import"./index-BtuE92fA.js";import"./index-B_W1-M7C.js";import"./useLocalizedStringFormatter-BxPXHGva.js";import"./chunk-ZQGNWTBN-Dy_4uniI.js";import"./chunk-YFAKJTDR-CCqOzW-r.js";import"./proxy-Dz1ebHA1.js";import"./is-motion-value-CykchRGT.js";import"./chunk-6VC6TS2O-CPbXJLEj.js";import"./global-config-B5DaTUF1.js";import"./chunk-O24IAYCG-DVzujteO.js";import"./InputField-BMb08f0_.js";import"./chunk-ICU6NNET-DMnLNQUX.js";import"./chunk-US4SNHVL-iB09OJwD.js";import"./index-C_8p7YAa.js";import"./useFormReset-DwLEtbq1.js";import"./useLabel-DmhaZqQu.js";import"./useLabels-CtiM7yf6.js";import"./EnvelopeIcon-BqFWSceU.js";import"./chunk-XJ2YRSUP-DgHSdnSQ.js";import"./useToggleState-DsLqUUlC.js";import"./chunk-CR75Q2EZ-DpmuckMp.js";import"./chunk-JOT4BT4P-C5Cq8hY5.js";import"./chunk-WBUKVQRU-BNxx8prK.js";const{expect:a}=__STORYBOOK_MODULE_TEST__,K={component:c,title:"Forms/Login",decorators:[p],parameters:{a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}}},o={loading:!1,onForgotPassword:()=>console.log("handleForgotPassword"),onSignUp:()=>console.log("handleSignUp"),onSubmit:()=>console.log("onSubmit")},s={args:o},r={args:o,play:async({canvas:t,userEvent:e})=>{await e.type(t.getByTestId("login-form__email-input"),"email@provider.com"),await e.type(t.getByTestId("login-form__password-input"),"password"),await e.click(t.getByTestId("login-form__submit-button")),await a(t.getByTestId("login-form__email-input")).toHaveValue("email@provider.com"),await a(t.getByTestId("login-form__password-input")).toHaveValue("password")}},i={args:o,play:async({canvas:t,userEvent:e})=>{await e.type(t.getByTestId("login-form__password-input"),"password"),await e.click(t.getByTestId("login-form__submit-button")),await a(t.getByText("Email must be valid")).toBeInTheDocument()}},n={args:o,play:async({canvas:t,userEvent:e})=>{await e.type(t.getByTestId("login-form__email-input"),"incorrect"),await e.type(t.getByTestId("login-form__password-input"),"password"),await e.click(t.getByTestId("login-form__submit-button")),await a(t.getByText("Email must be valid")).toBeInTheDocument()}},m={args:o,play:async({canvas:t,userEvent:e})=>{await e.type(t.getByTestId("login-form__email-input"),"email@provider.com"),await e.click(t.getByTestId("login-form__submit-button")),await a(t.getByText("Password is too short - should be 8 chars minimum")).toBeInTheDocument()}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.type(canvas.getByTestId("login-form__email-input"), "email@provider.com");
    await userEvent.type(canvas.getByTestId("login-form__password-input"), "password");
    await userEvent.click(canvas.getByTestId("login-form__submit-button"));
    await expect(canvas.getByTestId("login-form__email-input")).toHaveValue("email@provider.com");
    await expect(canvas.getByTestId("login-form__password-input")).toHaveValue("password");
  }
} satisfies Story`,...r.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.type(canvas.getByTestId("login-form__password-input"), "password");
    await userEvent.click(canvas.getByTestId("login-form__submit-button"));
    await expect(canvas.getByText("Email must be valid")).toBeInTheDocument();
  }
} satisfies Story`,...i.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.type(canvas.getByTestId("login-form__email-input"), "incorrect");
    await userEvent.type(canvas.getByTestId("login-form__password-input"), "password");
    await userEvent.click(canvas.getByTestId("login-form__submit-button"));
    await expect(canvas.getByText("Email must be valid")).toBeInTheDocument();
  }
}`,...n.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.type(canvas.getByTestId("login-form__email-input"), "email@provider.com");
    await userEvent.click(canvas.getByTestId("login-form__submit-button"));
    await expect(canvas.getByText("Password is too short - should be 8 chars minimum")).toBeInTheDocument();
  }
}`,...m.parameters?.docs?.source}}};const R=["Standard","Success","EmailMissing","EmailInvalid","PasswordMissing"];export{n as EmailInvalid,i as EmailMissing,m as PasswordMissing,s as Standard,r as Success,R as __namedExportsOrder,K as default};
