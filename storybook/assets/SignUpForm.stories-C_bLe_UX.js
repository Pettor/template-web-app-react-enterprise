import{b as B}from"./DocumentationLayout-BY_a2QGZ.js";import"./iframe-DmLKp9Tv.js";import{S as I}from"./SignUpForm-DbY5zY4R.js";import"./chunk-MW56SEHC-TFmV_jFW.js";import"./useHover-DsFVTdGv.js";import"./index-Dc3YyuCs.js";import"./chunk-OEE6MISH-CEuVOMkH.js";import"./chunk-6VC6TS2O-BTv5eN-g.js";import"./proxy-Bo16sm6l.js";import"./chunk-RJKRL3AU-CjtrMR1U.js";import"./index-SgozrWZK.js";import"./chunk-SLABUSGS-80IsjY-0.js";import"./index-D6PH6U1P.js";import"./useFocusWithin-Dco_lDfy.js";import"./useControlledState-yeAP3XmM.js";import"./useControlledState-Bnb6EqCZ.js";import"./useFormReset-ugqhufn3.js";import"./useLabel-WHANlPMJ.js";import"./useLabels-piLYatxm.js";import"./chunk-GT2IF6NJ-p1J3jkdm.js";import"./chunk-GQT3YUX3-FQ1U8E7v.js";const{expect:a}=__STORYBOOK_MODULE_TEST__,L={component:I,title:"Forms/Sign Up",decorators:[B]},i={loading:!1,onSubmit:()=>console.log("onSubmit")},s={args:i},n={args:i,play:async({canvas:e,userEvent:t})=>{await t.type(e.getByTestId("sign-up-form__username-input"),"username"),await t.type(e.getByTestId("sign-up-form__firstname-input"),"john"),await t.type(e.getByTestId("sign-up-form__lastname-input"),"doe"),await t.type(e.getByTestId("sign-up-form__email-input"),"email@provider.com"),await t.type(e.getByTestId("sign-up-form__phonenumber-input"),"1234567890"),await t.type(e.getByTestId("sign-up-form__password-input"),"password"),await t.type(e.getByTestId("sign-up-form__confirmpassword-input"),"password"),await t.click(e.getByTestId("sign-up-form__submit-button")),await a(e.getByTestId("sign-up-form__username-input")).toHaveValue("username"),await a(e.getByTestId("sign-up-form__firstname-input")).toHaveValue("john"),await a(e.getByTestId("sign-up-form__username-input")).toHaveValue("username"),await a(e.getByTestId("sign-up-form__lastname-input")).toHaveValue("doe"),await a(e.getByTestId("sign-up-form__email-input")).toHaveValue("email@provider.com"),await a(e.getByTestId("sign-up-form__phonenumber-input")).toHaveValue("1234567890"),await a(e.getByTestId("sign-up-form__password-input")).toHaveValue("password"),await a(e.getByTestId("sign-up-form__confirmpassword-input")).toHaveValue("password")}},o={args:i,play:async({canvas:e,userEvent:t})=>{await t.click(e.getByTestId("sign-up-form__submit-button")),await a(e.getByText("We need to call you something")).toBeInTheDocument(),await a(e.getByText("Email is required")).toBeInTheDocument(),await a(e.getByText("Password is required")).toBeInTheDocument(),await a(e.getByText("Password must be confirmed")).toBeInTheDocument()}},r={args:i,play:async({canvas:e,userEvent:t})=>{await t.type(e.getByTestId("sign-up-form__username-input"),"username"),await t.type(e.getByTestId("sign-up-form__email-input"),"email@provider.com"),await t.type(e.getByTestId("sign-up-form__password-input"),"short"),await t.type(e.getByTestId("sign-up-form__confirmpassword-input"),"short"),await t.click(e.getByTestId("sign-up-form__submit-button")),await a(e.getByText("Password is too short - should be 8 chars minimum")).toBeInTheDocument()}};var p,u,m;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: defaultArgs
}`,...(m=(u=s.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var g,d,c;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.type(canvas.getByTestId("sign-up-form__username-input"), "username");
    await userEvent.type(canvas.getByTestId("sign-up-form__firstname-input"), "john");
    await userEvent.type(canvas.getByTestId("sign-up-form__lastname-input"), "doe");
    await userEvent.type(canvas.getByTestId("sign-up-form__email-input"), "email@provider.com");
    await userEvent.type(canvas.getByTestId("sign-up-form__phonenumber-input"), "1234567890");
    await userEvent.type(canvas.getByTestId("sign-up-form__password-input"), "password");
    await userEvent.type(canvas.getByTestId("sign-up-form__confirmpassword-input"), "password");
    await userEvent.click(canvas.getByTestId("sign-up-form__submit-button"));
    await expect(canvas.getByTestId("sign-up-form__username-input")).toHaveValue("username");
    await expect(canvas.getByTestId("sign-up-form__firstname-input")).toHaveValue("john");
    await expect(canvas.getByTestId("sign-up-form__username-input")).toHaveValue("username");
    await expect(canvas.getByTestId("sign-up-form__lastname-input")).toHaveValue("doe");
    await expect(canvas.getByTestId("sign-up-form__email-input")).toHaveValue("email@provider.com");
    await expect(canvas.getByTestId("sign-up-form__phonenumber-input")).toHaveValue("1234567890");
    await expect(canvas.getByTestId("sign-up-form__password-input")).toHaveValue("password");
    await expect(canvas.getByTestId("sign-up-form__confirmpassword-input")).toHaveValue("password");
  }
}`,...(c=(d=n.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var _,y,w;o.parameters={...o.parameters,docs:{...(_=o.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.click(canvas.getByTestId("sign-up-form__submit-button"));
    await expect(canvas.getByText("We need to call you something")).toBeInTheDocument();
    await expect(canvas.getByText("Email is required")).toBeInTheDocument();
    await expect(canvas.getByText("Password is required")).toBeInTheDocument();
    await expect(canvas.getByText("Password must be confirmed")).toBeInTheDocument();
  }
}`,...(w=(y=o.parameters)==null?void 0:y.docs)==null?void 0:w.source}}};var l,T,f;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.type(canvas.getByTestId("sign-up-form__username-input"), "username");
    await userEvent.type(canvas.getByTestId("sign-up-form__email-input"), "email@provider.com");
    await userEvent.type(canvas.getByTestId("sign-up-form__password-input"), "short");
    await userEvent.type(canvas.getByTestId("sign-up-form__confirmpassword-input"), "short");
    await userEvent.click(canvas.getByTestId("sign-up-form__submit-button"));
    await expect(canvas.getByText("Password is too short - should be 8 chars minimum")).toBeInTheDocument();
  }
}`,...(f=(T=r.parameters)==null?void 0:T.docs)==null?void 0:f.source}}};const R=["Standard","Success","MissingFields","IncorrectPassword"];export{r as IncorrectPassword,o as MissingFields,s as Standard,n as Success,R as __namedExportsOrder,L as default};
