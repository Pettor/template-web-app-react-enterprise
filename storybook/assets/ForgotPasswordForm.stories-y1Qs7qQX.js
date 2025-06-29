import{b as _}from"./DocumentationLayout-BY_a2QGZ.js";import"./iframe-DmLKp9Tv.js";import{F as w}from"./ForgotPasswordForm-2yB693Sa.js";import"./chunk-MW56SEHC-TFmV_jFW.js";import"./useHover-DsFVTdGv.js";import"./index-Dc3YyuCs.js";import"./chunk-OEE6MISH-CEuVOMkH.js";import"./chunk-6VC6TS2O-BTv5eN-g.js";import"./proxy-Bo16sm6l.js";import"./chunk-RJKRL3AU-CjtrMR1U.js";import"./index-SgozrWZK.js";import"./chunk-SLABUSGS-80IsjY-0.js";import"./index-D6PH6U1P.js";import"./useFocusWithin-Dco_lDfy.js";import"./useControlledState-yeAP3XmM.js";import"./useControlledState-Bnb6EqCZ.js";import"./useFormReset-ugqhufn3.js";import"./useLabel-WHANlPMJ.js";import"./useLabels-piLYatxm.js";import"./EnvelopeIcon-CciidgLf.js";import"./chunk-GT2IF6NJ-p1J3jkdm.js";import"./chunk-GQT3YUX3-FQ1U8E7v.js";import"./chunk-AWMMSYR4-BDSSZ10b.js";const{expect:f}=__STORYBOOK_MODULE_TEST__,R={component:w,title:"Forms/Forgot Password",decorators:[_]},s={loading:!1,onSubmit:()=>console.log("onSubmit")},o={args:s},e={args:s,play:async({canvas:t,userEvent:r})=>{await r.type(t.getByTestId("forgot-password-form__email-input"),"email@provider.com"),await r.click(t.getByTestId("forgot-password-form__submit-button")),await f(t.getByTestId("forgot-password-form__email-input")).toHaveValue("email@provider.com")}},a={args:s,play:async({canvas:t,userEvent:r})=>{await r.click(t.getByTestId("forgot-password-form__submit-button")),await f(t.getByText("Email is required")).toBeInTheDocument()}};var i,m,n;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: defaultArgs
}`,...(n=(m=o.parameters)==null?void 0:m.docs)==null?void 0:n.source}}};var p,c,d;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.type(canvas.getByTestId("forgot-password-form__email-input"), "email@provider.com");
    await userEvent.click(canvas.getByTestId("forgot-password-form__submit-button"));
    await expect(canvas.getByTestId("forgot-password-form__email-input")).toHaveValue("email@provider.com");
  }
}`,...(d=(c=e.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var u,g,l;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.click(canvas.getByTestId("forgot-password-form__submit-button"));
    await expect(canvas.getByText("Email is required")).toBeInTheDocument();
  }
}`,...(l=(g=a.parameters)==null?void 0:g.docs)==null?void 0:l.source}}};const U=["Standard","Success","IncorrectEmail"];export{a as IncorrectEmail,o as Standard,e as Success,U as __namedExportsOrder,R as default};
