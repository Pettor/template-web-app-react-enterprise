import{b as i}from"./DocumentationLayout-DPXqq37H.js";import"./iframe-CVh_g5GF.js";import{F as n}from"./ForgotPasswordForm-aWB7cwaP.js";import"./preload-helper-D9Z9MdNV.js";import"./chunk-YFAKJTDR-DlAwBfa8.js";import"./chunk-JGY6VQQQ-BkFehgb2.js";import"./index-Cs2DC1HH.js";import"./index-CXMfSR4R.js";import"./useLocalizedStringFormatter-Ck1EGdb_.js";import"./chunk-ZQGNWTBN-DGdDUK-u.js";import"./chunk-YFAKJTDR-D9NT3Wer.js";import"./proxy-3wtZ51YI.js";import"./is-motion-value-gRKpgmBu.js";import"./chunk-6VC6TS2O-Bm5cKJL1.js";import"./global-config-B5DaTUF1.js";import"./chunk-O24IAYCG-tYdgHnQJ.js";import"./InputField-Be0ZGU8U.js";import"./chunk-ICU6NNET-BeWtCggc.js";import"./chunk-US4SNHVL-aVY3mrvc.js";import"./index-XIFOz5bU.js";import"./useFormReset-CVH319KT.js";import"./useLabel-CoRkl_sc.js";import"./useLabels-D3unFxLh.js";import"./EnvelopeIcon-CZKsa3sm.js";import"./chunk-AWMMSYR4-B7KeM-19.js";import"./chunk-SBOMX3YT-DU9FHKf2.js";import"./chunk-WBUKVQRU-0OeFnGWg.js";const{expect:m}=__STORYBOOK_MODULE_TEST__,C={component:n,title:"Forms/Forgot Password",decorators:[i],parameters:{a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}}},s={loading:!1,onSubmit:()=>console.log("onSubmit")},o={args:s},a={args:s,play:async({canvas:t,userEvent:r})=>{await r.type(t.getByTestId("forgot-password-form__email-input"),"email@provider.com"),await r.click(t.getByTestId("forgot-password-form__submit-button")),await m(t.getByTestId("forgot-password-form__email-input")).toHaveValue("email@provider.com")}},e={args:s,play:async({canvas:t,userEvent:r})=>{await r.click(t.getByTestId("forgot-password-form__submit-button")),await m(t.getByText("Email must be valid")).toBeInTheDocument()}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
