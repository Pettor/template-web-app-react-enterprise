import{b as p}from"./DocumentationLayout-Dr8hd-SR.js";import"./iframe-Cf7V4Wh9.js";import{L as c}from"./LoginForm-BojrT506.js";import"./preload-helper-PPVm8Dsz.js";import"./chunk-YFAKJTDR-BLNEHL9x.js";import"./chunk-EPPF4F2Y-N74DIiW5.js";import"./index-l8OuHtyp.js";import"./index-D8Z9jh5v.js";import"./useLocalizedStringFormatter-BNdJwMMF.js";import"./chunk-2KFDCN36-BKO1WVY5.js";import"./chunk-YFAKJTDR-BArGUceA.js";import"./proxy-CXbXiZf6.js";import"./resolve-motion-value-0VBr-JcK.js";import"./chunk-6VC6TS2O-D5bsGZi9.js";import"./chunk-QNLCCAKT-BNZIsdLm.js";import"./InputField-CXKpFy8s.js";import"./chunk-ICU6NNET-Dot4B9-n.js";import"./chunk-LKNOEPVR-BlWLXY9x.js";import"./index-CJ_Mv-0r.js";import"./index-CLbgCbz3.js";import"./useFormReset-DdP0ASU7.js";import"./useLabel-D_G7Q5gG.js";import"./useLabels-AhDTTNxk.js";import"./EnvelopeIcon-Di47PoxY.js";import"./chunk-PMMJMDBI-D7aMt4mR.js";import"./useToggleState-BO6taCcy.js";import"./chunk-SIOPM2FD-CDDzb4MO.js";import"./chunk-WBUKVQRU-Ftp2994r.js";const{expect:a}=__STORYBOOK_MODULE_TEST__,C={component:c,title:"Forms/Login",decorators:[p],parameters:{a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}}},o={loading:!1,onForgotPassword:()=>console.log("handleForgotPassword"),onSignUp:()=>console.log("handleSignUp"),onSubmit:()=>console.log("onSubmit")},s={args:o},r={args:o,play:async({canvas:t,userEvent:e})=>{await e.type(t.getByTestId("login-form__email-input"),"email@provider.com"),await e.type(t.getByTestId("login-form__password-input"),"password"),await e.click(t.getByTestId("login-form__submit-button")),await a(t.getByTestId("login-form__email-input")).toHaveValue("email@provider.com"),await a(t.getByTestId("login-form__password-input")).toHaveValue("password")}},i={args:o,play:async({canvas:t,userEvent:e})=>{await e.type(t.getByTestId("login-form__password-input"),"password"),await e.click(t.getByTestId("login-form__submit-button")),await a(t.getByText("Email must be valid")).toBeInTheDocument()}},n={args:o,play:async({canvas:t,userEvent:e})=>{await e.type(t.getByTestId("login-form__email-input"),"incorrect"),await e.type(t.getByTestId("login-form__password-input"),"password"),await e.click(t.getByTestId("login-form__submit-button")),await a(t.getByText("Email must be valid")).toBeInTheDocument()}},m={args:o,play:async({canvas:t,userEvent:e})=>{await e.type(t.getByTestId("login-form__email-input"),"email@provider.com"),await e.click(t.getByTestId("login-form__submit-button")),await a(t.getByText("Password is too short - should be 8 chars minimum")).toBeInTheDocument()}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}};const K=["Standard","Success","EmailMissing","EmailInvalid","PasswordMissing"];export{n as EmailInvalid,i as EmailMissing,m as PasswordMissing,s as Standard,r as Success,K as __namedExportsOrder,C as default};
