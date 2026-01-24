import{c as i}from"./DocumentationLayout-1rAMPyC8.js";import"./iframe-C2w-mLaN.js";import{F as n}from"./ForgotPasswordForm-BFp42JCc.js";import"./preload-helper-PPVm8Dsz.js";import"./chunk-YFAKJTDR-BQuJm8Ov.js";import"./chunk-EPPF4F2Y-1Nh5Ibwx.js";import"./index-DEYuNRoU.js";import"./index-DvV4yheu.js";import"./useLocalizedStringFormatter-DOq-c6OV.js";import"./chunk-2KFDCN36-AbFUpE89.js";import"./chunk-YFAKJTDR-Hyxer1RJ.js";import"./proxy-Dn8wRnpX.js";import"./resolve-motion-value-qohy-mmk.js";import"./chunk-6VC6TS2O-BYrCQn34.js";import"./chunk-QNLCCAKT-rgiFWZ1R.js";import"./InputField-CFxFGOZf.js";import"./chunk-ICU6NNET-DwlW4TQj.js";import"./chunk-LKNOEPVR-DUYNf4Ci.js";import"./index-CxSWGwZq.js";import"./index-BiGbxJE-.js";import"./useFormReset-BgzIQsdL.js";import"./useLabel-CArOkbIU.js";import"./useLabels-DntHT_zK.js";import"./EnvelopeIcon-BV3vTaEg.js";import"./chunk-YZ6YLE2T-DoHYqK5c.js";import"./chunk-WBUKVQRU-6u6QsrC1.js";const{expect:m}=__STORYBOOK_MODULE_TEST__,V={component:n,title:"Forms/Forgot Password",decorators:[i],parameters:{a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}}},s={loading:!1,onSubmit:()=>console.log("onSubmit")},o={args:s},a={args:s,play:async({canvas:t,userEvent:r})=>{await r.type(t.getByTestId("forgot-password-form__email-input"),"email@provider.com"),await r.click(t.getByTestId("forgot-password-form__submit-button")),await m(t.getByTestId("forgot-password-form__email-input")).toHaveValue("email@provider.com")}},e={args:s,play:async({canvas:t,userEvent:r})=>{await r.click(t.getByTestId("forgot-password-form__submit-button")),await m(t.getByText("Email must be valid")).toBeInTheDocument()}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};const C=["Standard","Success","IncorrectEmail"];export{e as IncorrectEmail,o as Standard,a as Success,C as __namedExportsOrder,V as default};
