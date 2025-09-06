import{b as i}from"./DocumentationLayout-DubvHnwh.js";import"./iframe-DdqkjWab.js";import{F as n}from"./ForgotPasswordForm-A5cWnYuS.js";import"./preload-helper-D9Z9MdNV.js";import"./chunk-YFAKJTDR-BLY8ilgV.js";import"./chunk-JGY6VQQQ-CJc5eprO.js";import"./index-Bh5Aje1E.js";import"./index-BJ2GfZCG.js";import"./useLocalizedStringFormatter-CoQlH2dy.js";import"./chunk-ZQGNWTBN-BHCQk4RL.js";import"./chunk-YFAKJTDR-B6I8n8r9.js";import"./proxy-Dtf2FOfT.js";import"./is-motion-value-gRKpgmBu.js";import"./chunk-6VC6TS2O-HRdWtWwR.js";import"./global-config-B5DaTUF1.js";import"./chunk-O24IAYCG-B6Xb9ezp.js";import"./InputField-CVr6M7DB.js";import"./chunk-ICU6NNET-Ct6Cu6B-.js";import"./chunk-US4SNHVL-DAdRkCTO.js";import"./index-Dy6CUPll.js";import"./useFormReset-B1q8LlG8.js";import"./useLabel-CAUCgP36.js";import"./useLabels-D6nds5v_.js";import"./EnvelopeIcon-D36B16lY.js";import"./chunk-AWMMSYR4-Dq-Tywei.js";import"./chunk-SBOMX3YT-Bgk95Hp2.js";import"./chunk-WBUKVQRU-DoHyFmuk.js";const{expect:m}=__STORYBOOK_MODULE_TEST__,C={component:n,title:"Forms/Forgot Password",decorators:[i],parameters:{a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}}},s={loading:!1,onSubmit:()=>console.log("onSubmit")},o={args:s},a={args:s,play:async({canvas:t,userEvent:r})=>{await r.type(t.getByTestId("forgot-password-form__email-input"),"email@provider.com"),await r.click(t.getByTestId("forgot-password-form__submit-button")),await m(t.getByTestId("forgot-password-form__email-input")).toHaveValue("email@provider.com")}},e={args:s,play:async({canvas:t,userEvent:r})=>{await r.click(t.getByTestId("forgot-password-form__submit-button")),await m(t.getByText("Email must be valid")).toBeInTheDocument()}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.type(canvas.getByTestId("forgot-password-form__email-input"), "email@provider.com");
    await userEvent.click(canvas.getByTestId("forgot-password-form__submit-button"));
    await expect(canvas.getByTestId("forgot-password-form__email-input")).toHaveValue("email@provider.com");
  }
}`,...a.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.click(canvas.getByTestId("forgot-password-form__submit-button"));
    await expect(canvas.getByText("Email must be valid")).toBeInTheDocument();
  }
}`,...e.parameters?.docs?.source}}};const K=["Standard","Success","IncorrectEmail"];export{e as IncorrectEmail,o as Standard,a as Success,K as __namedExportsOrder,C as default};
