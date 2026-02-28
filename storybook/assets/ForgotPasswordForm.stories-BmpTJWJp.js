import{c as i}from"./DocumentationLayout-Dx_MQrT-.js";import"./iframe-rb5u8kG-.js";import{F as n}from"./ForgotPasswordForm-CH13dow1.js";import"./preload-helper-PPVm8Dsz.js";import"./chunk-YFAKJTDR-DKwxRaj9.js";import"./chunk-BGEKJ4Q5-DzVAaTre.js";import"./index-CX-lnvfg.js";import"./index-A0a1QD7y.js";import"./useLocalizedStringFormatter-D8BkpgXj.js";import"./chunk-TRZPE5UW-BdIhqDBY.js";import"./proxy-BtTjdtxL.js";import"./resolve-motion-value-BAmjP_zU.js";import"./useFocusRing-Xo4cRvQI.js";import"./chunk-6VC6TS2O-bSW3gb1N.js";import"./resolve-transition-BRWD_pRL.js";import"./chunk-QNLCCAKT-Dpve5lD2.js";import"./InputField-CeUPzS9h.js";import"./chunk-ICU6NNET-C0ZFCgrq.js";import"./focusSafely-uUZoqiSA.js";import"./useFocusRing-CTo2e8po.js";import"./chunk-EJDFNA7Y-C3S100eb.js";import"./index-DxI_pWl0.js";import"./index-DJTH_STx.js";import"./useLabel-BuKBfsgx.js";import"./useLabels-lAvE5r34.js";import"./EnvelopeIcon-BxH_HigW.js";import"./chunk-YZ6YLE2T-DLqpCQU8.js";import"./chunk-JXT5O7F3-CbBJL0PR.js";const{expect:m}=__STORYBOOK_MODULE_TEST__,K={component:n,title:"Forms/Forgot Password",decorators:[i],parameters:{a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}}},s={loading:!1,onSubmit:()=>console.log("onSubmit")},o={args:s},a={args:s,play:async({canvas:t,userEvent:r})=>{await r.type(t.getByTestId("forgot-password-form__email-input"),"email@provider.com"),await r.click(t.getByTestId("forgot-password-form__submit-button")),await m(t.getByTestId("forgot-password-form__email-input")).toHaveValue("email@provider.com")}},e={args:s,play:async({canvas:t,userEvent:r})=>{await r.click(t.getByTestId("forgot-password-form__submit-button")),await m(t.getByText("Email must be valid")).toBeInTheDocument()}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};const L=["Standard","Success","IncorrectEmail"];export{e as IncorrectEmail,o as Standard,a as Success,L as __namedExportsOrder,K as default};
