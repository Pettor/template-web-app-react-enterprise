import{b as i}from"./DocumentationLayout-CJxVEWzC.js";import"./iframe-FYjSiTNB.js";import{F as n}from"./ForgotPasswordForm-BarXkG7H.js";import"./preload-helper-D9Z9MdNV.js";import"./chunk-YFAKJTDR-BvTqOLLD.js";import"./chunk-JGY6VQQQ-BkFehgb2.js";import"./index-B430vpiK.js";import"./index-Bygt4LQ9.js";import"./useLocalizedStringFormatter-DueuQoN5.js";import"./chunk-ZQGNWTBN-CIwwD9I8.js";import"./chunk-YFAKJTDR-CQ1m-4rQ.js";import"./proxy-BLIooMCO.js";import"./is-motion-value-gRKpgmBu.js";import"./chunk-6VC6TS2O-3krgdrQx.js";import"./global-config-B5DaTUF1.js";import"./chunk-O24IAYCG-Du2BTSAN.js";import"./InputField-DTQCUF9F.js";import"./chunk-ICU6NNET-C7-bvLJ_.js";import"./chunk-US4SNHVL-aVY3mrvc.js";import"./index-DIVNhdf-.js";import"./useFormReset-BNSZoV-6.js";import"./useLabel-CbsYngQ6.js";import"./useLabels-Cu-uIKR7.js";import"./EnvelopeIcon-BzUWnKix.js";import"./chunk-AWMMSYR4-CHA1p_0k.js";import"./chunk-SBOMX3YT-DU9FHKf2.js";import"./chunk-WBUKVQRU-D93_svuW.js";const{expect:m}=__STORYBOOK_MODULE_TEST__,C={component:n,title:"Forms/Forgot Password",decorators:[i],parameters:{a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}}},s={loading:!1,onSubmit:()=>console.log("onSubmit")},o={args:s},a={args:s,play:async({canvas:t,userEvent:r})=>{await r.type(t.getByTestId("forgot-password-form__email-input"),"email@provider.com"),await r.click(t.getByTestId("forgot-password-form__submit-button")),await m(t.getByTestId("forgot-password-form__email-input")).toHaveValue("email@provider.com")}},e={args:s,play:async({canvas:t,userEvent:r})=>{await r.click(t.getByTestId("forgot-password-form__submit-button")),await m(t.getByText("Email must be valid")).toBeInTheDocument()}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
