import{n as e}from"./chunk-zsgVPwQN.js";import{o as t,t as n}from"./src-Bp5RcZhR.js";import{n as r,t as i}from"./LoginForm-CfoZxe5e.js";var a,o,s,c,l,u,d,f,p;e((()=>{n(),r(),{expect:a}=__STORYBOOK_MODULE_TEST__,o={component:i,title:`Forms/Login`,decorators:[t],parameters:{a11y:{config:{rules:[{id:`color-contrast`,enabled:!1}]}}}},s={loading:!1,onForgotPassword:()=>console.log(`handleForgotPassword`),onSignUp:()=>console.log(`handleSignUp`),onSubmit:()=>console.log(`onSubmit`)},c={args:s},l={args:s,play:async({canvas:e,userEvent:t})=>{await t.type(e.getByTestId(`login-form__email-input`),`email@provider.com`),await t.type(e.getByTestId(`login-form__password-input`),`password`),await t.click(e.getByTestId(`login-form__submit-button`)),await a(e.getByTestId(`login-form__email-input`)).toHaveValue(`email@provider.com`),await a(e.getByTestId(`login-form__password-input`)).toHaveValue(`password`)}},u={args:s,play:async({canvas:e,userEvent:t})=>{await t.type(e.getByTestId(`login-form__password-input`),`password`),await t.click(e.getByTestId(`login-form__submit-button`)),await a(e.getByText(`Email must be valid`)).toBeInTheDocument()}},d={args:s,play:async({canvas:e,userEvent:t})=>{await t.type(e.getByTestId(`login-form__email-input`),`incorrect`),await t.type(e.getByTestId(`login-form__password-input`),`password`),await t.click(e.getByTestId(`login-form__submit-button`)),await a(e.getByText(`Email must be valid`)).toBeInTheDocument()}},f={args:s,play:async({canvas:e,userEvent:t})=>{await t.type(e.getByTestId(`login-form__email-input`),`email@provider.com`),await t.click(e.getByTestId(`login-form__submit-button`)),await a(e.getByText(`Password is too short - should be 8 chars minimum`)).toBeInTheDocument()}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
} satisfies Story`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.type(canvas.getByTestId("login-form__password-input"), "password");
    await userEvent.click(canvas.getByTestId("login-form__submit-button"));
    await expect(canvas.getByText("Email must be valid")).toBeInTheDocument();
  }
} satisfies Story`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.type(canvas.getByTestId("login-form__email-input"), "email@provider.com");
    await userEvent.click(canvas.getByTestId("login-form__submit-button"));
    await expect(canvas.getByText("Password is too short - should be 8 chars minimum")).toBeInTheDocument();
  }
}`,...f.parameters?.docs?.source}}},p=[`Standard`,`Success`,`EmailMissing`,`EmailInvalid`,`PasswordMissing`]}))();export{d as EmailInvalid,u as EmailMissing,f as PasswordMissing,c as Standard,l as Success,p as __namedExportsOrder,o as default};