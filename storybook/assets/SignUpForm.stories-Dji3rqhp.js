import{a as p}from"./DocumentationLayout-H-tGD38G.js";import"./iframe-c1YiYtnK.js";import{S as m}from"./SignUpForm-BPRuohsQ.js";import"./preload-helper-PPVm8Dsz.js";import"./chunk-YFAKJTDR-Ci6D3OJR.js";import"./chunk-JGY6VQQQ-BkgGoZtC.js";import"./index-Bw1Ctlrm.js";import"./index-DlMNUfEy.js";import"./useLocalizedStringFormatter-QR4BSf1N.js";import"./chunk-ZQGNWTBN-D-x6fJFC.js";import"./chunk-YFAKJTDR-BBykVR1J.js";import"./proxy-B2oItH5d.js";import"./is-motion-value-CykchRGT.js";import"./chunk-6VC6TS2O-B6Pwy_n_.js";import"./global-config-B5DaTUF1.js";import"./chunk-O24IAYCG-BrpeiVJJ.js";import"./InputField-L-eWcmqs.js";import"./chunk-ICU6NNET-gyv04Wxh.js";import"./chunk-US4SNHVL-iB09OJwD.js";import"./index-8N3RDKQ6.js";import"./useFormReset-CmP2TdOr.js";import"./useLabel-jrOLW8Zp.js";import"./useLabels-DWx7vO6i.js";import"./chunk-WBUKVQRU-cirVA12E.js";const{expect:a}=__STORYBOOK_MODULE_TEST__,O={component:m,title:"Forms/Sign Up",decorators:[p],parameters:{a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}}},r={loading:!1,onSubmit:()=>console.log("onSubmit")},s={args:r},n={args:r,play:async({canvas:t,userEvent:e})=>{await e.type(t.getByTestId("sign-up-form__username-input"),"username"),await e.type(t.getByTestId("sign-up-form__firstname-input"),"john"),await e.type(t.getByTestId("sign-up-form__lastname-input"),"doe"),await e.type(t.getByTestId("sign-up-form__email-input"),"email@provider.com"),await e.type(t.getByTestId("sign-up-form__phonenumber-input"),"1234567890"),await e.type(t.getByTestId("sign-up-form__password-input"),"password"),await e.type(t.getByTestId("sign-up-form__confirmpassword-input"),"password"),await e.click(t.getByTestId("sign-up-form__submit-button")),await a(t.getByTestId("sign-up-form__username-input")).toHaveValue("username"),await a(t.getByTestId("sign-up-form__firstname-input")).toHaveValue("john"),await a(t.getByTestId("sign-up-form__username-input")).toHaveValue("username"),await a(t.getByTestId("sign-up-form__lastname-input")).toHaveValue("doe"),await a(t.getByTestId("sign-up-form__email-input")).toHaveValue("email@provider.com"),await a(t.getByTestId("sign-up-form__phonenumber-input")).toHaveValue("1234567890"),await a(t.getByTestId("sign-up-form__password-input")).toHaveValue("password"),await a(t.getByTestId("sign-up-form__confirmpassword-input")).toHaveValue("password")}},o={args:r,play:async({canvas:t,userEvent:e})=>{await e.click(t.getByTestId("sign-up-form__submit-button")),await a(t.getByText("We need to call you something")).toBeInTheDocument(),await a(t.getByText("Email must be valid")).toBeInTheDocument(),await a(t.getByText("Password is too short - should be 8 chars minimum")).toBeInTheDocument(),await a(t.getByText("Password must be confirmed")).toBeInTheDocument()}},i={args:r,play:async({canvas:t,userEvent:e})=>{await e.type(t.getByTestId("sign-up-form__username-input"),"username"),await e.type(t.getByTestId("sign-up-form__email-input"),"email@provider.com"),await e.type(t.getByTestId("sign-up-form__password-input"),"short"),await e.type(t.getByTestId("sign-up-form__confirmpassword-input"),"short"),await e.click(t.getByTestId("sign-up-form__submit-button")),await a(t.getByText("Password is too short - should be 8 chars minimum")).toBeInTheDocument()}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
