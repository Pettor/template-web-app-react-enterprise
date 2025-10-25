import{b as p}from"./DocumentationLayout-Yu5PtoWW.js";import"./iframe-Ck-zY7hp.js";import{L as c}from"./LoginForm-AlqR0Jge.js";import"./preload-helper-PPVm8Dsz.js";import"./chunk-YFAKJTDR-CyP0vD2l.js";import"./chunk-JGY6VQQQ-tAznf3WQ.js";import"./index-wIFCU2xE.js";import"./index-DJUCz45Y.js";import"./useLocalizedStringFormatter-0PbleTvW.js";import"./chunk-ZQGNWTBN-9KIc47vs.js";import"./chunk-YFAKJTDR-ln9AFF-F.js";import"./proxy-Cnfh7O7K.js";import"./is-motion-value-gRKpgmBu.js";import"./chunk-6VC6TS2O-DXgTRzZq.js";import"./global-config-B5DaTUF1.js";import"./chunk-O24IAYCG-AQitN_eb.js";import"./InputField--5ZFFAyT.js";import"./chunk-ICU6NNET-CJfog-YH.js";import"./chunk-US4SNHVL-DRBrkOfM.js";import"./index-CXvQj_Ur.js";import"./useFormReset-CAhq2ERG.js";import"./useLabel-ceuQpQ0t.js";import"./useLabels-DBNmFB9Y.js";import"./EnvelopeIcon-CNb-L637.js";import"./chunk-XJ2YRSUP-BjUxMpDN.js";import"./useToggleState-DMARU546.js";import"./chunk-CR75Q2EZ-CoECdJfn.js";import"./chunk-JOT4BT4P-Cg5fsiYH.js";import"./chunk-WBUKVQRU-lTu47UTO.js";const{expect:a}=__STORYBOOK_MODULE_TEST__,K={component:c,title:"Forms/Login",decorators:[p],parameters:{a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}}},o={loading:!1,onForgotPassword:()=>console.log("handleForgotPassword"),onSignUp:()=>console.log("handleSignUp"),onSubmit:()=>console.log("onSubmit")},s={args:o},r={args:o,play:async({canvas:t,userEvent:e})=>{await e.type(t.getByTestId("login-form__email-input"),"email@provider.com"),await e.type(t.getByTestId("login-form__password-input"),"password"),await e.click(t.getByTestId("login-form__submit-button")),await a(t.getByTestId("login-form__email-input")).toHaveValue("email@provider.com"),await a(t.getByTestId("login-form__password-input")).toHaveValue("password")}},i={args:o,play:async({canvas:t,userEvent:e})=>{await e.type(t.getByTestId("login-form__password-input"),"password"),await e.click(t.getByTestId("login-form__submit-button")),await a(t.getByText("Email must be valid")).toBeInTheDocument()}},n={args:o,play:async({canvas:t,userEvent:e})=>{await e.type(t.getByTestId("login-form__email-input"),"incorrect"),await e.type(t.getByTestId("login-form__password-input"),"password"),await e.click(t.getByTestId("login-form__submit-button")),await a(t.getByText("Email must be valid")).toBeInTheDocument()}},m={args:o,play:async({canvas:t,userEvent:e})=>{await e.type(t.getByTestId("login-form__email-input"),"email@provider.com"),await e.click(t.getByTestId("login-form__submit-button")),await a(t.getByText("Password is too short - should be 8 chars minimum")).toBeInTheDocument()}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
