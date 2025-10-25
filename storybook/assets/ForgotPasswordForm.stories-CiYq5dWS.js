import{b as i}from"./DocumentationLayout-Yu5PtoWW.js";import"./iframe-Ck-zY7hp.js";import{F as n}from"./ForgotPasswordForm-D3RI284T.js";import"./preload-helper-PPVm8Dsz.js";import"./chunk-YFAKJTDR-CyP0vD2l.js";import"./chunk-JGY6VQQQ-tAznf3WQ.js";import"./index-wIFCU2xE.js";import"./index-DJUCz45Y.js";import"./useLocalizedStringFormatter-0PbleTvW.js";import"./chunk-ZQGNWTBN-9KIc47vs.js";import"./chunk-YFAKJTDR-ln9AFF-F.js";import"./proxy-Cnfh7O7K.js";import"./is-motion-value-gRKpgmBu.js";import"./chunk-6VC6TS2O-DXgTRzZq.js";import"./global-config-B5DaTUF1.js";import"./chunk-O24IAYCG-AQitN_eb.js";import"./InputField--5ZFFAyT.js";import"./chunk-ICU6NNET-CJfog-YH.js";import"./chunk-US4SNHVL-DRBrkOfM.js";import"./index-CXvQj_Ur.js";import"./useFormReset-CAhq2ERG.js";import"./useLabel-ceuQpQ0t.js";import"./useLabels-DBNmFB9Y.js";import"./EnvelopeIcon-CNb-L637.js";import"./chunk-AWMMSYR4-DyqsbhuK.js";import"./chunk-SBOMX3YT-V_B2H_Yq.js";import"./chunk-WBUKVQRU-lTu47UTO.js";const{expect:m}=__STORYBOOK_MODULE_TEST__,C={component:n,title:"Forms/Forgot Password",decorators:[i],parameters:{a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}}},s={loading:!1,onSubmit:()=>console.log("onSubmit")},o={args:s},a={args:s,play:async({canvas:t,userEvent:r})=>{await r.type(t.getByTestId("forgot-password-form__email-input"),"email@provider.com"),await r.click(t.getByTestId("forgot-password-form__submit-button")),await m(t.getByTestId("forgot-password-form__email-input")).toHaveValue("email@provider.com")}},e={args:s,play:async({canvas:t,userEvent:r})=>{await r.click(t.getByTestId("forgot-password-form__submit-button")),await m(t.getByText("Email must be valid")).toBeInTheDocument()}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
