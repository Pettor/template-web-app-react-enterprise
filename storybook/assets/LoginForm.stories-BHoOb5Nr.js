import{b as E}from"./DocumentationLayout-BY_a2QGZ.js";import"./iframe-DmLKp9Tv.js";import{L as S}from"./LoginForm-CHc4Xbw1.js";import"./chunk-MW56SEHC-TFmV_jFW.js";import"./useHover-DsFVTdGv.js";import"./index-Dc3YyuCs.js";import"./chunk-OEE6MISH-CEuVOMkH.js";import"./chunk-6VC6TS2O-BTv5eN-g.js";import"./proxy-Bo16sm6l.js";import"./chunk-RJKRL3AU-CjtrMR1U.js";import"./index-SgozrWZK.js";import"./chunk-SLABUSGS-80IsjY-0.js";import"./index-D6PH6U1P.js";import"./useFocusWithin-Dco_lDfy.js";import"./useControlledState-yeAP3XmM.js";import"./useControlledState-Bnb6EqCZ.js";import"./useFormReset-ugqhufn3.js";import"./useLabel-WHANlPMJ.js";import"./useLabels-piLYatxm.js";import"./EnvelopeIcon-CciidgLf.js";import"./chunk-MZRCPRP2-CYeKEK6m.js";import"./useToggleState-C6_wjdCZ.js";import"./usePress-B-qkxyGK.js";import"./useToggle-BVITxwj0.js";import"./chunk-T45N425O-BCaouCW9.js";import"./chunk-GT2IF6NJ-p1J3jkdm.js";import"./chunk-GQT3YUX3-FQ1U8E7v.js";const{expect:a}=__STORYBOOK_MODULE_TEST__,$={component:S,title:"Forms/Login",decorators:[E]},o={loading:!1,onForgotPassword:()=>console.log("handleForgotPassword"),onSignUp:()=>console.log("handleSignUp"),onSubmit:()=>console.log("onSubmit")},s={args:o},r={args:o,play:async({canvas:t,userEvent:e})=>{await e.type(t.getByTestId("login-form__email-input"),"email@provider.com"),await e.type(t.getByTestId("login-form__password-input"),"password"),await e.click(t.getByTestId("login-form__submit-button")),await a(t.getByTestId("login-form__email-input")).toHaveValue("email@provider.com"),await a(t.getByTestId("login-form__password-input")).toHaveValue("password")}},i={args:o,play:async({canvas:t,userEvent:e})=>{await e.type(t.getByTestId("login-form__password-input"),"password"),await e.click(t.getByTestId("login-form__submit-button")),await a(t.getByText("Email is required")).toBeInTheDocument()}},n={args:o,play:async({canvas:t,userEvent:e})=>{await e.type(t.getByTestId("login-form__email-input"),"incorrect"),await e.type(t.getByTestId("login-form__password-input"),"password"),await e.click(t.getByTestId("login-form__submit-button")),await a(t.getByText("Email must be valid")).toBeInTheDocument()}},m={args:o,play:async({canvas:t,userEvent:e})=>{await e.type(t.getByTestId("login-form__email-input"),"email@provider.com"),await e.click(t.getByTestId("login-form__submit-button")),await a(t.getByText("Password is required")).toBeInTheDocument()}};var p,c,l;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: defaultArgs
}`,...(l=(c=s.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};var d,g,u;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.type(canvas.getByTestId("login-form__email-input"), "email@provider.com");
    await userEvent.type(canvas.getByTestId("login-form__password-input"), "password");
    await userEvent.click(canvas.getByTestId("login-form__submit-button"));
    await expect(canvas.getByTestId("login-form__email-input")).toHaveValue("email@provider.com");
    await expect(canvas.getByTestId("login-form__password-input")).toHaveValue("password");
  }
} satisfies Story`,...(u=(g=r.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};var y,_,w;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.type(canvas.getByTestId("login-form__password-input"), "password");
    await userEvent.click(canvas.getByTestId("login-form__submit-button"));
    await expect(canvas.getByText("Email is required")).toBeInTheDocument();
  }
} satisfies Story`,...(w=(_=i.parameters)==null?void 0:_.docs)==null?void 0:w.source}}};var T,B,f;n.parameters={...n.parameters,docs:{...(T=n.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.type(canvas.getByTestId("login-form__email-input"), "incorrect");
    await userEvent.type(canvas.getByTestId("login-form__password-input"), "password");
    await userEvent.click(canvas.getByTestId("login-form__submit-button"));
    await expect(canvas.getByText("Email must be valid")).toBeInTheDocument();
  }
}`,...(f=(B=n.parameters)==null?void 0:B.docs)==null?void 0:f.source}}};var I,v,b;m.parameters={...m.parameters,docs:{...(I=m.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.type(canvas.getByTestId("login-form__email-input"), "email@provider.com");
    await userEvent.click(canvas.getByTestId("login-form__submit-button"));
    await expect(canvas.getByText("Password is required")).toBeInTheDocument();
  }
}`,...(b=(v=m.parameters)==null?void 0:v.docs)==null?void 0:b.source}}};const tt=["Standard","Success","EmailMissing","EmailInvalid","PasswordMissing"];export{n as EmailInvalid,i as EmailMissing,m as PasswordMissing,s as Standard,r as Success,tt as __namedExportsOrder,$ as default};
