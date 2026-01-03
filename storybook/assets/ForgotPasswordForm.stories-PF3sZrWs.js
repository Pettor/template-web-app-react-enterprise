import{b as i}from"./DocumentationLayout-Brs5rNN_.js";import"./iframe-DcPPQ38v.js";import{F as n}from"./ForgotPasswordForm-BtBZZgsr.js";import"./preload-helper-PPVm8Dsz.js";import"./chunk-YFAKJTDR-3z9mjsbI.js";import"./chunk-EPPF4F2Y-N74DIiW5.js";import"./index-BBWTL6ob.js";import"./index-CHuGHTnU.js";import"./useLocalizedStringFormatter-Dw6JReuB.js";import"./chunk-2KFDCN36-wMFw96ye.js";import"./chunk-YFAKJTDR-BC-JekcA.js";import"./proxy-D6aSC7tz.js";import"./is-motion-value-CYPXd9ku.js";import"./chunk-6VC6TS2O-BaHIOEi-.js";import"./global-config-B5DaTUF1.js";import"./chunk-QNLCCAKT-BChoLmeI.js";import"./InputField-Beic1NgY.js";import"./chunk-ICU6NNET-_KAmJ8XC.js";import"./chunk-LKNOEPVR-BlWLXY9x.js";import"./index-DQIHwIog.js";import"./index-C3iF5Pfm.js";import"./useFormReset-BvPEefmW.js";import"./useLabel-lIWvMcul.js";import"./useLabels-DQ5t4fQS.js";import"./EnvelopeIcon-BdwwuWhd.js";import"./chunk-YZ6YLE2T-DF4HTOGm.js";import"./chunk-WBUKVQRU-CRAE6OXm.js";const{expect:m}=__STORYBOOK_MODULE_TEST__,C={component:n,title:"Forms/Forgot Password",decorators:[i],parameters:{a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}}},s={loading:!1,onSubmit:()=>console.log("onSubmit")},o={args:s},a={args:s,play:async({canvas:t,userEvent:r})=>{await r.type(t.getByTestId("forgot-password-form__email-input"),"email@provider.com"),await r.click(t.getByTestId("forgot-password-form__submit-button")),await m(t.getByTestId("forgot-password-form__email-input")).toHaveValue("email@provider.com")}},e={args:s,play:async({canvas:t,userEvent:r})=>{await r.click(t.getByTestId("forgot-password-form__submit-button")),await m(t.getByText("Email must be valid")).toBeInTheDocument()}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
