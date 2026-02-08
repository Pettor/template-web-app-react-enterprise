import{c as i}from"./DocumentationLayout-DESLflwa.js";import"./iframe-YtoMSC9b.js";import{F as n}from"./ForgotPasswordForm-BaIl6o_m.js";import"./preload-helper-PPVm8Dsz.js";import"./chunk-YFAKJTDR-8nLJQi6g.js";import"./chunk-BGEKJ4Q5-DzVAaTre.js";import"./index-j9ILsqx0.js";import"./index-C0IDy0rf.js";import"./useLocalizedStringFormatter-DoyP1OMw.js";import"./chunk-TRZPE5UW-DYqKtY72.js";import"./chunk-YFAKJTDR-DSW9XQbZ.js";import"./proxy-CmgMLf2W.js";import"./resolve-motion-value-DYFQeTuo.js";import"./chunk-6VC6TS2O-laIAtYmh.js";import"./resolve-transition-BRWD_pRL.js";import"./chunk-QNLCCAKT-3a28CFLe.js";import"./InputField-BRLUW67E.js";import"./chunk-ICU6NNET-B7M2FWZX.js";import"./chunk-EJDFNA7Y-C3S100eb.js";import"./index-C743fs0M.js";import"./index-BS9YWX_h.js";import"./useFormReset-BrHfC-aX.js";import"./useLabel-BrsUh4iB.js";import"./useLabels-DeNRhtDv.js";import"./EnvelopeIcon-TcjvvTXe.js";import"./chunk-YZ6YLE2T-C7Xqje9w.js";import"./chunk-WBUKVQRU-D9cFwZ--.js";const{expect:m}=__STORYBOOK_MODULE_TEST__,C={component:n,title:"Forms/Forgot Password",decorators:[i],parameters:{a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}}},s={loading:!1,onSubmit:()=>console.log("onSubmit")},o={args:s},a={args:s,play:async({canvas:t,userEvent:r})=>{await r.type(t.getByTestId("forgot-password-form__email-input"),"email@provider.com"),await r.click(t.getByTestId("forgot-password-form__submit-button")),await m(t.getByTestId("forgot-password-form__email-input")).toHaveValue("email@provider.com")}},e={args:s,play:async({canvas:t,userEvent:r})=>{await r.click(t.getByTestId("forgot-password-form__submit-button")),await m(t.getByText("Email must be valid")).toBeInTheDocument()}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
