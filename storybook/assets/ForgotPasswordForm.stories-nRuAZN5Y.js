import{d as _}from"./DocumentationLayout-DNW0LLpC.js";import"./iframe-CP07UXYA.js";import{F as y}from"./ForgotPasswordForm-DalQlaHS.js";import"./chunk-3HKZRFKK-D9HcyUdp.js";import"./index-PutobBQ8.js";import"./index-CLQTGGdB.js";import"./chunk-GQT3YUX3-Ypbj_P3N.js";import"./chunk-BDGLNRCW-B_RP-iNZ.js";import"./index-B0fZTFEe.js";import"./chunk-RJKRL3AU-CjtrMR1U.js";import"./proxy-DCpZ5o1A.js";import"./chunk-O24IAYCG-BTAMXfHQ.js";import"./chunk-6VC6TS2O-Ih3LBMgq.js";import"./types-B7rvkadu.js";import"./chunk-ICU6NNET-DRHSSwc8.js";import"./index-D5R_uiWV.js";import"./useControlledState-iAtmbbWX.js";import"./useFormReset-CMBvfis7.js";import"./useLabel-DIBLPa-w.js";import"./useLabels-Dml9cxib.js";import"./EnvelopeIcon-CTfryVwU.js";import"./chunk-AWMMSYR4-46igYdaX.js";import"./chunk-WBUKVQRU-BRYNAtL_.js";const{expect:f}=__STORYBOOK_MODULE_TEST__,R={component:y,title:"Forms/Forgot Password",decorators:[_],parameters:{a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}}},s={loading:!1,onSubmit:()=>console.log("onSubmit")},o={args:s},e={args:s,play:async({canvas:r,userEvent:t})=>{await t.type(r.getByTestId("forgot-password-form__email-input"),"email@provider.com"),await t.click(r.getByTestId("forgot-password-form__submit-button")),await f(r.getByTestId("forgot-password-form__email-input")).toHaveValue("email@provider.com")}},a={args:s,play:async({canvas:r,userEvent:t})=>{await t.click(r.getByTestId("forgot-password-form__submit-button")),await f(r.getByText("Email is required")).toBeInTheDocument()}};var i,m,n;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
