import{c as p}from"./DocumentationLayout-Dx_MQrT-.js";import"./iframe-rb5u8kG-.js";import{L as c}from"./LoginForm-Bw_8-Kli.js";import"./preload-helper-PPVm8Dsz.js";import"./chunk-YFAKJTDR-DKwxRaj9.js";import"./chunk-BGEKJ4Q5-DzVAaTre.js";import"./index-CX-lnvfg.js";import"./index-A0a1QD7y.js";import"./useLocalizedStringFormatter-D8BkpgXj.js";import"./chunk-TRZPE5UW-BdIhqDBY.js";import"./proxy-BtTjdtxL.js";import"./resolve-motion-value-BAmjP_zU.js";import"./useFocusRing-Xo4cRvQI.js";import"./chunk-6VC6TS2O-bSW3gb1N.js";import"./resolve-transition-BRWD_pRL.js";import"./chunk-QNLCCAKT-Dpve5lD2.js";import"./InputField-CeUPzS9h.js";import"./chunk-ICU6NNET-C0ZFCgrq.js";import"./focusSafely-uUZoqiSA.js";import"./useFocusRing-CTo2e8po.js";import"./chunk-EJDFNA7Y-C3S100eb.js";import"./index-DxI_pWl0.js";import"./index-DJTH_STx.js";import"./useLabel-BuKBfsgx.js";import"./useLabels-lAvE5r34.js";import"./EnvelopeIcon-BxH_HigW.js";import"./chunk-PMMJMDBI-BZ4b3aMI.js";import"./chunk-LGMZDQT5-Bh98Nj7H.js";import"./chunk-SIOPM2FD-BlFUHj-T.js";import"./chunk-JXT5O7F3-CbBJL0PR.js";const{expect:a}=__STORYBOOK_MODULE_TEST__,R={component:c,title:"Forms/Login",decorators:[p],parameters:{a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}}},o={loading:!1,onForgotPassword:()=>console.log("handleForgotPassword"),onSignUp:()=>console.log("handleSignUp"),onSubmit:()=>console.log("onSubmit")},s={args:o},r={args:o,play:async({canvas:t,userEvent:e})=>{await e.type(t.getByTestId("login-form__email-input"),"email@provider.com"),await e.type(t.getByTestId("login-form__password-input"),"password"),await e.click(t.getByTestId("login-form__submit-button")),await a(t.getByTestId("login-form__email-input")).toHaveValue("email@provider.com"),await a(t.getByTestId("login-form__password-input")).toHaveValue("password")}},i={args:o,play:async({canvas:t,userEvent:e})=>{await e.type(t.getByTestId("login-form__password-input"),"password"),await e.click(t.getByTestId("login-form__submit-button")),await a(t.getByText("Email must be valid")).toBeInTheDocument()}},n={args:o,play:async({canvas:t,userEvent:e})=>{await e.type(t.getByTestId("login-form__email-input"),"incorrect"),await e.type(t.getByTestId("login-form__password-input"),"password"),await e.click(t.getByTestId("login-form__submit-button")),await a(t.getByText("Email must be valid")).toBeInTheDocument()}},m={args:o,play:async({canvas:t,userEvent:e})=>{await e.type(t.getByTestId("login-form__email-input"),"email@provider.com"),await e.click(t.getByTestId("login-form__submit-button")),await a(t.getByText("Password is too short - should be 8 chars minimum")).toBeInTheDocument()}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}};const Y=["Standard","Success","EmailMissing","EmailInvalid","PasswordMissing"];export{n as EmailInvalid,i as EmailMissing,m as PasswordMissing,s as Standard,r as Success,Y as __namedExportsOrder,R as default};
