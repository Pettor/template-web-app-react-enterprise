import{b as _}from"./DocumentationLayout-DbnN6fMk.js";import"./iframe-l-KbKUdD.js";import{F as y}from"./ForgotPasswordForm-DtMfj7WM.js";import"./chunk-MW56SEHC-BJ__r44X.js";import"./useHover-DQt0fpzi.js";import"./index-CfTbfnnE.js";import"./chunk-OEE6MISH-CHnETqnH.js";import"./chunk-6VC6TS2O-T1o_L9x_.js";import"./proxy-DYEZCZ3C.js";import"./chunk-RJKRL3AU-CjtrMR1U.js";import"./index-C3RGNFti.js";import"./chunk-SLABUSGS-9bRI0mPY.js";import"./index-voa9g86k.js";import"./useFocusWithin-DQ0ttTPK.js";import"./useControlledState-CFq18L6O.js";import"./useControlledState-DIvXEQmI.js";import"./useFormReset-PvSdGmhK.js";import"./useLabel-CmyMWPZJ.js";import"./useLabels-DeQbWYR4.js";import"./EnvelopeIcon-MpTCRXv6.js";import"./chunk-GT2IF6NJ-gHLBTwaa.js";import"./chunk-GQT3YUX3-FQ1U8E7v.js";import"./chunk-AWMMSYR4-f-k0E6Jg.js";const{expect:f}=__STORYBOOK_MODULE_TEST__,R={component:y,title:"Forms/Forgot Password",decorators:[_],parameters:{a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}}},s={loading:!1,onSubmit:()=>console.log("onSubmit")},o={args:s},e={args:s,play:async({canvas:r,userEvent:t})=>{await t.type(r.getByTestId("forgot-password-form__email-input"),"email@provider.com"),await t.click(r.getByTestId("forgot-password-form__submit-button")),await f(r.getByTestId("forgot-password-form__email-input")).toHaveValue("email@provider.com")}},a={args:s,play:async({canvas:r,userEvent:t})=>{await t.click(r.getByTestId("forgot-password-form__submit-button")),await f(r.getByText("Email is required")).toBeInTheDocument()}};var i,m,n;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
