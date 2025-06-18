import{b as _}from"./DocumentationLayout-B8C3khKL.js";import"./iframe-AX-ZHRPq.js";import{F as w}from"./ForgotPasswordForm-DI43wShF.js";import"./chunk-MW56SEHC-OXtVZdTl.js";import"./chunk-3HKZRFKK-BUq3PZP3.js";import"./index-SOlPy6ph.js";import"./chunk-OEE6MISH-iYYuBCZd.js";import"./chunk-6VC6TS2O-DSZcp7nF.js";import"./proxy-CpOrQZxw.js";import"./chunk-RJKRL3AU-CjtrMR1U.js";import"./index.esm-TJKTMdf8.js";import"./chunk-SLABUSGS-CKyLQa6f.js";import"./index-ejUXTslw.js";import"./useControlledState-DceTrbrl.js";import"./useFormReset-BChVea6x.js";import"./useLabel-RkN2cl25.js";import"./useLabels-B3_heUOs.js";import"./EnvelopeIcon-EKxADl_S.js";import"./chunk-GT2IF6NJ-vXE5EvJU.js";import"./chunk-GQT3YUX3-FQ1U8E7v.js";import"./chunk-AWMMSYR4-D7Oz3SW6.js";const{expect:f}=__STORYBOOK_MODULE_TEST__,M={component:w,title:"Forms/Forgot Password",decorators:[_]},s={loading:!1,onSubmit:()=>console.log("onSubmit")},r={args:s},a={args:s,play:async({canvas:t,userEvent:o})=>{await o.type(t.getByTestId("forgot-password-form__email-input"),"email@provider.com"),await o.click(t.getByTestId("forgot-password-form__submit-button")),await f(t.getByTestId("forgot-password-form__email-input")).toHaveValue("email@provider.com")}},e={args:s,play:async({canvas:t,userEvent:o})=>{await o.type(t.getByTestId("forgot-password-form__email-input"),"incorrect"),await o.click(t.getByTestId("forgot-password-form__submit-button")),await f(t.getByText("Email must be valid")).toBeInTheDocument}};var i,m,n;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: defaultArgs
}`,...(n=(m=r.parameters)==null?void 0:m.docs)==null?void 0:n.source}}};var p,c,d;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.type(canvas.getByTestId("forgot-password-form__email-input"), "email@provider.com");
    await userEvent.click(canvas.getByTestId("forgot-password-form__submit-button"));
    await expect(canvas.getByTestId("forgot-password-form__email-input")).toHaveValue("email@provider.com");
  }
}`,...(d=(c=a.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var u,g,l;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.type(canvas.getByTestId("forgot-password-form__email-input"), "incorrect");
    await userEvent.click(canvas.getByTestId("forgot-password-form__submit-button"));
    await expect(canvas.getByText("Email must be valid")).toBeInTheDocument;
  }
}`,...(l=(g=e.parameters)==null?void 0:g.docs)==null?void 0:l.source}}};const R=["Standard","Success","IncorrectEmail"];export{e as IncorrectEmail,r as Standard,a as Success,R as __namedExportsOrder,M as default};
//# sourceMappingURL=ForgotPasswordForm.stories-CTaOvJtP.js.map
