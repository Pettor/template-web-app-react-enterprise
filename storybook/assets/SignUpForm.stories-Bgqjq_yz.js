import{c as p}from"./DocumentationLayout-DESLflwa.js";import"./iframe-YtoMSC9b.js";import{S as m}from"./SignUpForm-BLH_Zj9E.js";import"./preload-helper-PPVm8Dsz.js";import"./chunk-YFAKJTDR-8nLJQi6g.js";import"./chunk-BGEKJ4Q5-DzVAaTre.js";import"./index-j9ILsqx0.js";import"./index-C0IDy0rf.js";import"./useLocalizedStringFormatter-DoyP1OMw.js";import"./chunk-TRZPE5UW-DYqKtY72.js";import"./chunk-YFAKJTDR-DSW9XQbZ.js";import"./proxy-CmgMLf2W.js";import"./resolve-motion-value-DYFQeTuo.js";import"./chunk-6VC6TS2O-laIAtYmh.js";import"./resolve-transition-BRWD_pRL.js";import"./chunk-QNLCCAKT-3a28CFLe.js";import"./InputField-BRLUW67E.js";import"./chunk-ICU6NNET-B7M2FWZX.js";import"./chunk-EJDFNA7Y-C3S100eb.js";import"./index-C743fs0M.js";import"./index-BS9YWX_h.js";import"./useFormReset-BrHfC-aX.js";import"./useLabel-BrsUh4iB.js";import"./useLabels-DeNRhtDv.js";import"./chunk-WBUKVQRU-D9cFwZ--.js";const{expect:a}=__STORYBOOK_MODULE_TEST__,j={component:m,title:"Forms/Sign Up",decorators:[p],parameters:{a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}}},r={loading:!1,onSubmit:()=>console.log("onSubmit")},s={args:r},n={args:r,play:async({canvas:t,userEvent:e})=>{await e.type(t.getByTestId("sign-up-form__username-input"),"username"),await e.type(t.getByTestId("sign-up-form__firstname-input"),"john"),await e.type(t.getByTestId("sign-up-form__lastname-input"),"doe"),await e.type(t.getByTestId("sign-up-form__email-input"),"email@provider.com"),await e.type(t.getByTestId("sign-up-form__phonenumber-input"),"1234567890"),await e.type(t.getByTestId("sign-up-form__password-input"),"password"),await e.type(t.getByTestId("sign-up-form__confirmpassword-input"),"password"),await e.click(t.getByTestId("sign-up-form__submit-button")),await a(t.getByTestId("sign-up-form__username-input")).toHaveValue("username"),await a(t.getByTestId("sign-up-form__firstname-input")).toHaveValue("john"),await a(t.getByTestId("sign-up-form__username-input")).toHaveValue("username"),await a(t.getByTestId("sign-up-form__lastname-input")).toHaveValue("doe"),await a(t.getByTestId("sign-up-form__email-input")).toHaveValue("email@provider.com"),await a(t.getByTestId("sign-up-form__phonenumber-input")).toHaveValue("1234567890"),await a(t.getByTestId("sign-up-form__password-input")).toHaveValue("password"),await a(t.getByTestId("sign-up-form__confirmpassword-input")).toHaveValue("password")}},o={args:r,play:async({canvas:t,userEvent:e})=>{await e.click(t.getByTestId("sign-up-form__submit-button")),await a(t.getByText("We need to call you something")).toBeInTheDocument(),await a(t.getByText("Email must be valid")).toBeInTheDocument(),await a(t.getByText("Password is too short - should be 8 chars minimum")).toBeInTheDocument(),await a(t.getByText("Password must be confirmed")).toBeInTheDocument()}},i={args:r,play:async({canvas:t,userEvent:e})=>{await e.type(t.getByTestId("sign-up-form__username-input"),"username"),await e.type(t.getByTestId("sign-up-form__email-input"),"email@provider.com"),await e.type(t.getByTestId("sign-up-form__password-input"),"short"),await e.type(t.getByTestId("sign-up-form__confirmpassword-input"),"short"),await e.click(t.getByTestId("sign-up-form__submit-button")),await a(t.getByText("Password is too short - should be 8 chars minimum")).toBeInTheDocument()}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.click(canvas.getByTestId("sign-up-form__submit-button"));
    await expect(canvas.getByText("We need to call you something")).toBeInTheDocument();
    await expect(canvas.getByText("Email must be valid")).toBeInTheDocument();
    await expect(canvas.getByText("Password is too short - should be 8 chars minimum")).toBeInTheDocument();
    await expect(canvas.getByText("Password must be confirmed")).toBeInTheDocument();
  }
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}};const F=["Standard","Success","MissingFields","IncorrectPassword"];export{i as IncorrectPassword,o as MissingFields,s as Standard,n as Success,F as __namedExportsOrder,j as default};
