import{b as i}from"./DocumentationLayout-BL8Umjgv.js";import"./iframe-CAxEJG-u.js";import{F as n}from"./ForgotPasswordForm-CfB9OjIf.js";import"./preload-helper-PPVm8Dsz.js";import"./chunk-YFAKJTDR-Dk9SSuiu.js";import"./chunk-JGY6VQQQ-tAznf3WQ.js";import"./index-7tZZOvsK.js";import"./index-BqdibKMT.js";import"./useLocalizedStringFormatter-B59HoBoj.js";import"./chunk-ZQGNWTBN-CVShAdbp.js";import"./chunk-YFAKJTDR-HL083fPa.js";import"./proxy-iLrMgQvU.js";import"./is-motion-value-gRKpgmBu.js";import"./chunk-6VC6TS2O-CddIr9ZB.js";import"./global-config-B5DaTUF1.js";import"./chunk-O24IAYCG-BL_RkUmx.js";import"./InputField-Bs29-C0b.js";import"./chunk-ICU6NNET-CEFcGw26.js";import"./chunk-US4SNHVL-DRBrkOfM.js";import"./index-CQQPs8rl.js";import"./index-QX0JLmSj.js";import"./useFormReset-BaGgXpzc.js";import"./useLabel-GH6kirb1.js";import"./useLabels-Byj9JTJs.js";import"./EnvelopeIcon-BMT0eegC.js";import"./chunk-AWMMSYR4-C9PVPxY8.js";import"./chunk-SBOMX3YT-V_B2H_Yq.js";import"./chunk-WBUKVQRU-CUOM9aLk.js";const{expect:m}=__STORYBOOK_MODULE_TEST__,K={component:n,title:"Forms/Forgot Password",decorators:[i],parameters:{a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}}},s={loading:!1,onSubmit:()=>console.log("onSubmit")},o={args:s},a={args:s,play:async({canvas:t,userEvent:r})=>{await r.type(t.getByTestId("forgot-password-form__email-input"),"email@provider.com"),await r.click(t.getByTestId("forgot-password-form__submit-button")),await m(t.getByTestId("forgot-password-form__email-input")).toHaveValue("email@provider.com")}},e={args:s,play:async({canvas:t,userEvent:r})=>{await r.click(t.getByTestId("forgot-password-form__submit-button")),await m(t.getByText("Email must be valid")).toBeInTheDocument()}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};const L=["Standard","Success","IncorrectEmail"];export{e as IncorrectEmail,o as Standard,a as Success,L as __namedExportsOrder,K as default};
