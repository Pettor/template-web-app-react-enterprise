import{a as i}from"./DocumentationLayout-H-tGD38G.js";import"./iframe-c1YiYtnK.js";import{F as n}from"./ForgotPasswordForm-BINb0aC5.js";import"./preload-helper-PPVm8Dsz.js";import"./chunk-YFAKJTDR-Ci6D3OJR.js";import"./chunk-JGY6VQQQ-BkgGoZtC.js";import"./index-Bw1Ctlrm.js";import"./index-DlMNUfEy.js";import"./useLocalizedStringFormatter-QR4BSf1N.js";import"./chunk-ZQGNWTBN-D-x6fJFC.js";import"./chunk-YFAKJTDR-BBykVR1J.js";import"./proxy-B2oItH5d.js";import"./is-motion-value-CykchRGT.js";import"./chunk-6VC6TS2O-B6Pwy_n_.js";import"./global-config-B5DaTUF1.js";import"./chunk-O24IAYCG-BrpeiVJJ.js";import"./InputField-L-eWcmqs.js";import"./chunk-ICU6NNET-gyv04Wxh.js";import"./chunk-US4SNHVL-iB09OJwD.js";import"./index-8N3RDKQ6.js";import"./useFormReset-CmP2TdOr.js";import"./useLabel-jrOLW8Zp.js";import"./useLabels-DWx7vO6i.js";import"./EnvelopeIcon-w0VcgXks.js";import"./chunk-AWMMSYR4-DiwsRxfM.js";import"./chunk-SBOMX3YT-Foxv0x7d.js";import"./chunk-WBUKVQRU-cirVA12E.js";const{expect:m}=__STORYBOOK_MODULE_TEST__,C={component:n,title:"Forms/Forgot Password",decorators:[i],parameters:{a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}}},s={loading:!1,onSubmit:()=>console.log("onSubmit")},o={args:s},a={args:s,play:async({canvas:t,userEvent:r})=>{await r.type(t.getByTestId("forgot-password-form__email-input"),"email@provider.com"),await r.click(t.getByTestId("forgot-password-form__submit-button")),await m(t.getByTestId("forgot-password-form__email-input")).toHaveValue("email@provider.com")}},e={args:s,play:async({canvas:t,userEvent:r})=>{await r.click(t.getByTestId("forgot-password-form__submit-button")),await m(t.getByText("Email must be valid")).toBeInTheDocument()}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
