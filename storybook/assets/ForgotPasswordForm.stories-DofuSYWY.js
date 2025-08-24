import{b as i}from"./DocumentationLayout-d6vKNLxX.js";import"./iframe-BpyOjFLk.js";import{F as n}from"./ForgotPasswordForm-BP8Xc8dL.js";import"./preload-helper-D9Z9MdNV.js";import"./chunk-YFAKJTDR-BsxcyD9O.js";import"./chunk-JGY6VQQQ-BkFehgb2.js";import"./index-D5GmdqLr.js";import"./index-CC97iVX2.js";import"./useLocalizedStringFormatter-BVKxZ1rM.js";import"./chunk-ZQGNWTBN-Dn2EqAO6.js";import"./chunk-YFAKJTDR-Di6-d6KD.js";import"./proxy-DDcP7Dkb.js";import"./is-motion-value-gRKpgmBu.js";import"./chunk-6VC6TS2O-DKTOnU5X.js";import"./global-config-B5DaTUF1.js";import"./chunk-O24IAYCG-CC6h-P0A.js";import"./InputField-GUdr5wHn.js";import"./chunk-ICU6NNET-Idhfm636.js";import"./chunk-US4SNHVL-aVY3mrvc.js";import"./index-CDlKSLra.js";import"./useFormReset-De7JnuFt.js";import"./useLabel-BLf7k3a-.js";import"./useLabels-ChNF15kM.js";import"./EnvelopeIcon-obXJydqb.js";import"./chunk-AWMMSYR4-XYzZq0SE.js";import"./chunk-SBOMX3YT-DU9FHKf2.js";import"./chunk-WBUKVQRU-WlTGW6dN.js";const{expect:m}=__STORYBOOK_MODULE_TEST__,C={component:n,title:"Forms/Forgot Password",decorators:[i],parameters:{a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}}},s={loading:!1,onSubmit:()=>console.log("onSubmit")},o={args:s},a={args:s,play:async({canvas:t,userEvent:r})=>{await r.type(t.getByTestId("forgot-password-form__email-input"),"email@provider.com"),await r.click(t.getByTestId("forgot-password-form__submit-button")),await m(t.getByTestId("forgot-password-form__email-input")).toHaveValue("email@provider.com")}},e={args:s,play:async({canvas:t,userEvent:r})=>{await r.click(t.getByTestId("forgot-password-form__submit-button")),await m(t.getByText("Email must be valid")).toBeInTheDocument()}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
