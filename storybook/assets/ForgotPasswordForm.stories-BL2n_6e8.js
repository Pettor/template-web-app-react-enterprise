import{b as i}from"./DocumentationLayout-BDyE8v8w.js";import"./iframe-CUJgGUwl.js";import{F as n}from"./ForgotPasswordForm-aIrp6Oz0.js";import"./preload-helper-PPVm8Dsz.js";import"./chunk-YFAKJTDR-BiTQdIj6.js";import"./chunk-EPPF4F2Y-N74DIiW5.js";import"./index-DJxdgZX2.js";import"./index-CRoNW6TX.js";import"./useLocalizedStringFormatter-CZ4Cm07c.js";import"./chunk-2KFDCN36-CKYY4SnA.js";import"./chunk-YFAKJTDR-B9bk3R-t.js";import"./proxy-B__BNl_-.js";import"./is-motion-value-COLMKfLZ.js";import"./chunk-6VC6TS2O-D3Fc84_O.js";import"./global-config-B5DaTUF1.js";import"./chunk-QNLCCAKT-BttbCLow.js";import"./InputField-D4TGQAZd.js";import"./chunk-ICU6NNET-CsUavpl4.js";import"./chunk-LKNOEPVR-BlWLXY9x.js";import"./index-C-WjUxFg.js";import"./index-CVdUDKGF.js";import"./useFormReset-QQaNdJOZ.js";import"./useLabel-BvzKPJlk.js";import"./useLabels-DlSQl0rN.js";import"./EnvelopeIcon-CZ15-u_m.js";import"./chunk-YZ6YLE2T-BS-RAdB7.js";import"./chunk-WBUKVQRU-BCDsbKqK.js";const{expect:m}=__STORYBOOK_MODULE_TEST__,C={component:n,title:"Forms/Forgot Password",decorators:[i],parameters:{a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}}},s={loading:!1,onSubmit:()=>console.log("onSubmit")},o={args:s},a={args:s,play:async({canvas:t,userEvent:r})=>{await r.type(t.getByTestId("forgot-password-form__email-input"),"email@provider.com"),await r.click(t.getByTestId("forgot-password-form__submit-button")),await m(t.getByTestId("forgot-password-form__email-input")).toHaveValue("email@provider.com")}},e={args:s,play:async({canvas:t,userEvent:r})=>{await r.click(t.getByTestId("forgot-password-form__submit-button")),await m(t.getByText("Email must be valid")).toBeInTheDocument()}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
