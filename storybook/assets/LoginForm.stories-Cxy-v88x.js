import{b as p}from"./DocumentationLayout-DubvHnwh.js";import"./iframe-DdqkjWab.js";import{L as c}from"./LoginForm-BOHwHZ8p.js";import"./preload-helper-D9Z9MdNV.js";import"./chunk-YFAKJTDR-BLY8ilgV.js";import"./chunk-JGY6VQQQ-CJc5eprO.js";import"./index-Bh5Aje1E.js";import"./index-BJ2GfZCG.js";import"./useLocalizedStringFormatter-CoQlH2dy.js";import"./chunk-ZQGNWTBN-BHCQk4RL.js";import"./chunk-YFAKJTDR-B6I8n8r9.js";import"./proxy-Dtf2FOfT.js";import"./is-motion-value-gRKpgmBu.js";import"./chunk-6VC6TS2O-HRdWtWwR.js";import"./global-config-B5DaTUF1.js";import"./chunk-O24IAYCG-B6Xb9ezp.js";import"./InputField-CVr6M7DB.js";import"./chunk-ICU6NNET-Ct6Cu6B-.js";import"./chunk-US4SNHVL-DAdRkCTO.js";import"./index-Dy6CUPll.js";import"./useFormReset-B1q8LlG8.js";import"./useLabel-CAUCgP36.js";import"./useLabels-D6nds5v_.js";import"./EnvelopeIcon-D36B16lY.js";import"./chunk-XJ2YRSUP-uFGOTQVN.js";import"./useToggleState-phHASfMr.js";import"./chunk-CR75Q2EZ-DqTM12e-.js";import"./chunk-JOT4BT4P-BLjcfwCD.js";import"./chunk-WBUKVQRU-DoHyFmuk.js";const{expect:a}=__STORYBOOK_MODULE_TEST__,K={component:c,title:"Forms/Login",decorators:[p],parameters:{a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}}},o={loading:!1,onForgotPassword:()=>console.log("handleForgotPassword"),onSignUp:()=>console.log("handleSignUp"),onSubmit:()=>console.log("onSubmit")},s={args:o},r={args:o,play:async({canvas:t,userEvent:e})=>{await e.type(t.getByTestId("login-form__email-input"),"email@provider.com"),await e.type(t.getByTestId("login-form__password-input"),"password"),await e.click(t.getByTestId("login-form__submit-button")),await a(t.getByTestId("login-form__email-input")).toHaveValue("email@provider.com"),await a(t.getByTestId("login-form__password-input")).toHaveValue("password")}},i={args:o,play:async({canvas:t,userEvent:e})=>{await e.type(t.getByTestId("login-form__password-input"),"password"),await e.click(t.getByTestId("login-form__submit-button")),await a(t.getByText("Email must be valid")).toBeInTheDocument()}},n={args:o,play:async({canvas:t,userEvent:e})=>{await e.type(t.getByTestId("login-form__email-input"),"incorrect"),await e.type(t.getByTestId("login-form__password-input"),"password"),await e.click(t.getByTestId("login-form__submit-button")),await a(t.getByText("Email must be valid")).toBeInTheDocument()}},m={args:o,play:async({canvas:t,userEvent:e})=>{await e.type(t.getByTestId("login-form__email-input"),"email@provider.com"),await e.click(t.getByTestId("login-form__submit-button")),await a(t.getByText("Password is too short - should be 8 chars minimum")).toBeInTheDocument()}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
