import{b as i}from"./DocumentationLayout-Dr8hd-SR.js";import"./iframe-Cf7V4Wh9.js";import{F as n}from"./ForgotPasswordForm-ZCZeJb7u.js";import"./preload-helper-PPVm8Dsz.js";import"./chunk-YFAKJTDR-BLNEHL9x.js";import"./chunk-EPPF4F2Y-N74DIiW5.js";import"./index-l8OuHtyp.js";import"./index-D8Z9jh5v.js";import"./useLocalizedStringFormatter-BNdJwMMF.js";import"./chunk-2KFDCN36-BKO1WVY5.js";import"./chunk-YFAKJTDR-BArGUceA.js";import"./proxy-CXbXiZf6.js";import"./resolve-motion-value-0VBr-JcK.js";import"./chunk-6VC6TS2O-D5bsGZi9.js";import"./chunk-QNLCCAKT-BNZIsdLm.js";import"./InputField-CXKpFy8s.js";import"./chunk-ICU6NNET-Dot4B9-n.js";import"./chunk-LKNOEPVR-BlWLXY9x.js";import"./index-CJ_Mv-0r.js";import"./index-CLbgCbz3.js";import"./useFormReset-DdP0ASU7.js";import"./useLabel-D_G7Q5gG.js";import"./useLabels-AhDTTNxk.js";import"./EnvelopeIcon-Di47PoxY.js";import"./chunk-YZ6YLE2T-piwEgFni.js";import"./chunk-WBUKVQRU-Ftp2994r.js";const{expect:m}=__STORYBOOK_MODULE_TEST__,V={component:n,title:"Forms/Forgot Password",decorators:[i],parameters:{a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}}},s={loading:!1,onSubmit:()=>console.log("onSubmit")},o={args:s},a={args:s,play:async({canvas:t,userEvent:r})=>{await r.type(t.getByTestId("forgot-password-form__email-input"),"email@provider.com"),await r.click(t.getByTestId("forgot-password-form__submit-button")),await m(t.getByTestId("forgot-password-form__email-input")).toHaveValue("email@provider.com")}},e={args:s,play:async({canvas:t,userEvent:r})=>{await r.click(t.getByTestId("forgot-password-form__submit-button")),await m(t.getByText("Email must be valid")).toBeInTheDocument()}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
