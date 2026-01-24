import{c as p}from"./DocumentationLayout-1rAMPyC8.js";import"./iframe-C2w-mLaN.js";import{L as c}from"./LoginForm-CJewj_7u.js";import"./preload-helper-PPVm8Dsz.js";import"./chunk-YFAKJTDR-BQuJm8Ov.js";import"./chunk-EPPF4F2Y-1Nh5Ibwx.js";import"./index-DEYuNRoU.js";import"./index-DvV4yheu.js";import"./useLocalizedStringFormatter-DOq-c6OV.js";import"./chunk-2KFDCN36-AbFUpE89.js";import"./chunk-YFAKJTDR-Hyxer1RJ.js";import"./proxy-Dn8wRnpX.js";import"./resolve-motion-value-qohy-mmk.js";import"./chunk-6VC6TS2O-BYrCQn34.js";import"./chunk-QNLCCAKT-rgiFWZ1R.js";import"./InputField-CFxFGOZf.js";import"./chunk-ICU6NNET-DwlW4TQj.js";import"./chunk-LKNOEPVR-DUYNf4Ci.js";import"./index-CxSWGwZq.js";import"./index-BiGbxJE-.js";import"./useFormReset-BgzIQsdL.js";import"./useLabel-CArOkbIU.js";import"./useLabels-DntHT_zK.js";import"./EnvelopeIcon-BV3vTaEg.js";import"./chunk-PMMJMDBI-CxCpej5k.js";import"./useToggleState-C5fLxXl9.js";import"./chunk-SIOPM2FD-Q2w89iTS.js";import"./chunk-WBUKVQRU-6u6QsrC1.js";const{expect:a}=__STORYBOOK_MODULE_TEST__,C={component:c,title:"Forms/Login",decorators:[p],parameters:{a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}}},o={loading:!1,onForgotPassword:()=>console.log("handleForgotPassword"),onSignUp:()=>console.log("handleSignUp"),onSubmit:()=>console.log("onSubmit")},s={args:o},r={args:o,play:async({canvas:t,userEvent:e})=>{await e.type(t.getByTestId("login-form__email-input"),"email@provider.com"),await e.type(t.getByTestId("login-form__password-input"),"password"),await e.click(t.getByTestId("login-form__submit-button")),await a(t.getByTestId("login-form__email-input")).toHaveValue("email@provider.com"),await a(t.getByTestId("login-form__password-input")).toHaveValue("password")}},i={args:o,play:async({canvas:t,userEvent:e})=>{await e.type(t.getByTestId("login-form__password-input"),"password"),await e.click(t.getByTestId("login-form__submit-button")),await a(t.getByText("Email must be valid")).toBeInTheDocument()}},n={args:o,play:async({canvas:t,userEvent:e})=>{await e.type(t.getByTestId("login-form__email-input"),"incorrect"),await e.type(t.getByTestId("login-form__password-input"),"password"),await e.click(t.getByTestId("login-form__submit-button")),await a(t.getByText("Email must be valid")).toBeInTheDocument()}},m={args:o,play:async({canvas:t,userEvent:e})=>{await e.type(t.getByTestId("login-form__email-input"),"email@provider.com"),await e.click(t.getByTestId("login-form__submit-button")),await a(t.getByText("Password is too short - should be 8 chars minimum")).toBeInTheDocument()}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
