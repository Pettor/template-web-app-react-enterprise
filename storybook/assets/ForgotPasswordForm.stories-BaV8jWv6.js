import{d as i}from"./DocumentationLayout-DAgG1-ZX.js";import"./iframe-oH_DC80A.js";import{F as n}from"./ForgotPasswordForm-C5kJrrjl.js";import"./chunk-3HKZRFKK-CI1EtVuS.js";import"./index-CQujp2HH.js";import"./index-gFDqmumT.js";import"./chunk-GQT3YUX3-DlgZpYdS.js";import"./chunk-BDGLNRCW-kbLzW4Gq.js";import"./index-BQ3rQu0T.js";import"./chunk-RJKRL3AU-CzlZidxD.js";import"./proxy-Saq8bX4Y.js";import"./chunk-O24IAYCG-CgsVN_sE.js";import"./chunk-6VC6TS2O-D8_K1fXx.js";import"./InputField-Bh7VkDju.js";import"./chunk-ICU6NNET-6kEIbKs9.js";import"./index-B6pczB3M.js";import"./useControlledState-Bs-o5zaq.js";import"./useFormReset-2lNVFKVQ.js";import"./useLabel-Bpy1T8Tv.js";import"./useLabels-DOf7al2g.js";import"./EnvelopeIcon-7NNmTK_d.js";import"./chunk-AWMMSYR4-BvRM6c9T.js";import"./chunk-WBUKVQRU-D8fPY8qX.js";const{expect:m}=__STORYBOOK_MODULE_TEST__,h={component:n,title:"Forms/Forgot Password",decorators:[i],parameters:{a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}}},s={loading:!1,onSubmit:()=>console.log("onSubmit")},o={args:s},a={args:s,play:async({canvas:t,userEvent:r})=>{await r.type(t.getByTestId("forgot-password-form__email-input"),"email@provider.com"),await r.click(t.getByTestId("forgot-password-form__submit-button")),await m(t.getByTestId("forgot-password-form__email-input")).toHaveValue("email@provider.com")}},e={args:s,play:async({canvas:t,userEvent:r})=>{await r.click(t.getByTestId("forgot-password-form__submit-button")),await m(t.getByText("Email must be valid")).toBeInTheDocument()}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};const H=["Standard","Success","IncorrectEmail"];export{e as IncorrectEmail,o as Standard,a as Success,H as __namedExportsOrder,h as default};
