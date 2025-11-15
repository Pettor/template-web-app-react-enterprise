import{a as i}from"./DocumentationLayout-23UleARG.js";import"./iframe-C6AZxKr1.js";import{F as n}from"./ForgotPasswordForm-DEtb7Prp.js";import"./preload-helper-PPVm8Dsz.js";import"./chunk-YFAKJTDR-CzZ_8dr-.js";import"./chunk-JGY6VQQQ-BkgGoZtC.js";import"./index-BtuE92fA.js";import"./index-B_W1-M7C.js";import"./useLocalizedStringFormatter-BxPXHGva.js";import"./chunk-ZQGNWTBN-Dy_4uniI.js";import"./chunk-YFAKJTDR-CCqOzW-r.js";import"./proxy-Dz1ebHA1.js";import"./is-motion-value-CykchRGT.js";import"./chunk-6VC6TS2O-CPbXJLEj.js";import"./global-config-B5DaTUF1.js";import"./chunk-O24IAYCG-DVzujteO.js";import"./InputField-BMb08f0_.js";import"./chunk-ICU6NNET-DMnLNQUX.js";import"./chunk-US4SNHVL-iB09OJwD.js";import"./index-C_8p7YAa.js";import"./useFormReset-DwLEtbq1.js";import"./useLabel-DmhaZqQu.js";import"./useLabels-CtiM7yf6.js";import"./EnvelopeIcon-BqFWSceU.js";import"./chunk-AWMMSYR4-C5PSaf7n.js";import"./chunk-SBOMX3YT-Foxv0x7d.js";import"./chunk-WBUKVQRU-BNxx8prK.js";const{expect:m}=__STORYBOOK_MODULE_TEST__,C={component:n,title:"Forms/Forgot Password",decorators:[i],parameters:{a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}}},s={loading:!1,onSubmit:()=>console.log("onSubmit")},o={args:s},a={args:s,play:async({canvas:t,userEvent:r})=>{await r.type(t.getByTestId("forgot-password-form__email-input"),"email@provider.com"),await r.click(t.getByTestId("forgot-password-form__submit-button")),await m(t.getByTestId("forgot-password-form__email-input")).toHaveValue("email@provider.com")}},e={args:s,play:async({canvas:t,userEvent:r})=>{await r.click(t.getByTestId("forgot-password-form__submit-button")),await m(t.getByText("Email must be valid")).toBeInTheDocument()}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
