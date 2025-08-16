import{b as p}from"./DocumentationLayout-DPXqq37H.js";import"./iframe-CVh_g5GF.js";import{S as m}from"./SignUpForm-BGheeLlC.js";import"./preload-helper-D9Z9MdNV.js";import"./chunk-YFAKJTDR-DlAwBfa8.js";import"./chunk-JGY6VQQQ-BkFehgb2.js";import"./index-Cs2DC1HH.js";import"./index-CXMfSR4R.js";import"./useLocalizedStringFormatter-Ck1EGdb_.js";import"./chunk-ZQGNWTBN-DGdDUK-u.js";import"./chunk-YFAKJTDR-D9NT3Wer.js";import"./proxy-3wtZ51YI.js";import"./is-motion-value-gRKpgmBu.js";import"./chunk-6VC6TS2O-Bm5cKJL1.js";import"./global-config-B5DaTUF1.js";import"./chunk-O24IAYCG-tYdgHnQJ.js";import"./InputField-Be0ZGU8U.js";import"./chunk-ICU6NNET-BeWtCggc.js";import"./chunk-US4SNHVL-aVY3mrvc.js";import"./index-XIFOz5bU.js";import"./useFormReset-CVH319KT.js";import"./useLabel-CoRkl_sc.js";import"./useLabels-D3unFxLh.js";import"./chunk-WBUKVQRU-0OeFnGWg.js";const{expect:a}=__STORYBOOK_MODULE_TEST__,O={component:m,title:"Forms/Sign Up",decorators:[p],parameters:{a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}}},r={loading:!1,onSubmit:()=>console.log("onSubmit")},s={args:r},n={args:r,play:async({canvas:t,userEvent:e})=>{await e.type(t.getByTestId("sign-up-form__username-input"),"username"),await e.type(t.getByTestId("sign-up-form__firstname-input"),"john"),await e.type(t.getByTestId("sign-up-form__lastname-input"),"doe"),await e.type(t.getByTestId("sign-up-form__email-input"),"email@provider.com"),await e.type(t.getByTestId("sign-up-form__phonenumber-input"),"1234567890"),await e.type(t.getByTestId("sign-up-form__password-input"),"password"),await e.type(t.getByTestId("sign-up-form__confirmpassword-input"),"password"),await e.click(t.getByTestId("sign-up-form__submit-button")),await a(t.getByTestId("sign-up-form__username-input")).toHaveValue("username"),await a(t.getByTestId("sign-up-form__firstname-input")).toHaveValue("john"),await a(t.getByTestId("sign-up-form__username-input")).toHaveValue("username"),await a(t.getByTestId("sign-up-form__lastname-input")).toHaveValue("doe"),await a(t.getByTestId("sign-up-form__email-input")).toHaveValue("email@provider.com"),await a(t.getByTestId("sign-up-form__phonenumber-input")).toHaveValue("1234567890"),await a(t.getByTestId("sign-up-form__password-input")).toHaveValue("password"),await a(t.getByTestId("sign-up-form__confirmpassword-input")).toHaveValue("password")}},o={args:r,play:async({canvas:t,userEvent:e})=>{await e.click(t.getByTestId("sign-up-form__submit-button")),await a(t.getByText("We need to call you something")).toBeInTheDocument(),await a(t.getByText("Email must be valid")).toBeInTheDocument(),await a(t.getByText("Password is too short - should be 8 chars minimum")).toBeInTheDocument(),await a(t.getByText("Password must be confirmed")).toBeInTheDocument()}},i={args:r,play:async({canvas:t,userEvent:e})=>{await e.type(t.getByTestId("sign-up-form__username-input"),"username"),await e.type(t.getByTestId("sign-up-form__email-input"),"email@provider.com"),await e.type(t.getByTestId("sign-up-form__password-input"),"short"),await e.type(t.getByTestId("sign-up-form__confirmpassword-input"),"short"),await e.click(t.getByTestId("sign-up-form__submit-button")),await a(t.getByText("Password is too short - should be 8 chars minimum")).toBeInTheDocument()}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}};const j=["Standard","Success","MissingFields","IncorrectPassword"];export{i as IncorrectPassword,o as MissingFields,s as Standard,n as Success,j as __namedExportsOrder,O as default};
