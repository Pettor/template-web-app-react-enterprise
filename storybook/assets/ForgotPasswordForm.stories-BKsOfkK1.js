import{c as i}from"./DocumentationLayout-DwHr5F6m.js";import"./iframe-CnCK37SH.js";import{F as n}from"./ForgotPasswordForm-CeLmd20L.js";import"./preload-helper-PPVm8Dsz.js";import"./chunk-YFAKJTDR-RHHAD3T1.js";import"./chunk-BGEKJ4Q5-DzVAaTre.js";import"./index-Chq0pB1g.js";import"./index-CVb7lC0m.js";import"./useLocalizedStringFormatter-CAOMdgbu.js";import"./chunk-TRZPE5UW-OEw6EtHv.js";import"./chunk-YFAKJTDR-CnybrVn-.js";import"./proxy-DEW424Wg.js";import"./resolve-motion-value-qohy-mmk.js";import"./chunk-6VC6TS2O-Dkz43mP9.js";import"./chunk-QNLCCAKT-BzgxEJFD.js";import"./InputField-FcQEvc6G.js";import"./chunk-ICU6NNET-Cre-ZaDd.js";import"./chunk-EJDFNA7Y-C3S100eb.js";import"./index-B2AryxSl.js";import"./index-Cu36_eSG.js";import"./useFormReset-DnTqykAF.js";import"./useLabel-CMNBQ5Eu.js";import"./useLabels-BwsKugO_.js";import"./EnvelopeIcon-DBhfKNgR.js";import"./chunk-YZ6YLE2T-DmzaCbiG.js";import"./chunk-WBUKVQRU-fQrfIqFS.js";const{expect:m}=__STORYBOOK_MODULE_TEST__,V={component:n,title:"Forms/Forgot Password",decorators:[i],parameters:{a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}}},s={loading:!1,onSubmit:()=>console.log("onSubmit")},o={args:s},a={args:s,play:async({canvas:t,userEvent:r})=>{await r.type(t.getByTestId("forgot-password-form__email-input"),"email@provider.com"),await r.click(t.getByTestId("forgot-password-form__submit-button")),await m(t.getByTestId("forgot-password-form__email-input")).toHaveValue("email@provider.com")}},e={args:s,play:async({canvas:t,userEvent:r})=>{await r.click(t.getByTestId("forgot-password-form__submit-button")),await m(t.getByText("Email must be valid")).toBeInTheDocument()}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
