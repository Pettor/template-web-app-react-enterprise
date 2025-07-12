import{d as _}from"./DocumentationLayout-m7qcJ0CK.js";import"./iframe-Cj451IFH.js";import{F as y}from"./ForgotPasswordForm-DQz39Kxr.js";import"./chunk-JGY6VQQQ-CYi9Dj_J.js";import"./index-Y3gkNNaS.js";import"./index-C20t4iya.js";import"./chunk-GQT3YUX3-CKqljVT0.js";import"./chunk-BDGLNRCW-DWt2PDLm.js";import"./index-B-lMoGX-.js";import"./chunk-RJKRL3AU-CjtrMR1U.js";import"./proxy-D7qYYB_i.js";import"./chunk-O24IAYCG-4tKg9AWo.js";import"./chunk-6VC6TS2O-DP38dvAN.js";import"./index-B0Svzjwx.js";import"./chunk-ICU6NNET-DYIm_4wU.js";import"./index-DDR2dLiz.js";import"./useControlledState-BsRy6MkK.js";import"./useFormReset-CBtTJk1h.js";import"./useLabel-Cfdy64vw.js";import"./useLabels-l74sfIZ-.js";import"./EnvelopeIcon-B02UrhhL.js";import"./chunk-AWMMSYR4-Dzbntfm7.js";import"./chunk-WBUKVQRU-BJOK7rVk.js";const{expect:f}=__STORYBOOK_MODULE_TEST__,R={component:y,title:"Forms/Forgot Password",decorators:[_],parameters:{a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}}},s={loading:!1,onSubmit:()=>console.log("onSubmit")},o={args:s},e={args:s,play:async({canvas:r,userEvent:t})=>{await t.type(r.getByTestId("forgot-password-form__email-input"),"email@provider.com"),await t.click(r.getByTestId("forgot-password-form__submit-button")),await f(r.getByTestId("forgot-password-form__email-input")).toHaveValue("email@provider.com")}},a={args:s,play:async({canvas:r,userEvent:t})=>{await t.click(r.getByTestId("forgot-password-form__submit-button")),await f(r.getByText("Email is required")).toBeInTheDocument()}};var i,m,n;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: defaultArgs
}`,...(n=(m=o.parameters)==null?void 0:m.docs)==null?void 0:n.source}}};var c,p,d;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.type(canvas.getByTestId("forgot-password-form__email-input"), "email@provider.com");
    await userEvent.click(canvas.getByTestId("forgot-password-form__submit-button"));
    await expect(canvas.getByTestId("forgot-password-form__email-input")).toHaveValue("email@provider.com");
  }
}`,...(d=(p=e.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var u,l,g;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.click(canvas.getByTestId("forgot-password-form__submit-button"));
    await expect(canvas.getByText("Email is required")).toBeInTheDocument();
  }
}`,...(g=(l=a.parameters)==null?void 0:l.docs)==null?void 0:g.source}}};const U=["Standard","Success","IncorrectEmail"];export{a as IncorrectEmail,o as Standard,e as Success,U as __namedExportsOrder,R as default};
