import{n as e}from"./chunk-zsgVPwQN.js";import{o as t,t as n}from"./src-Bp5RcZhR.js";import{n as r,t as i}from"./SignUpForm-9C26PNLo.js";var a,o,s,c,l,u,d,f;e((()=>{n(),r(),{expect:a}=__STORYBOOK_MODULE_TEST__,o={component:i,title:`Forms/Sign Up`,decorators:[t],parameters:{a11y:{config:{rules:[{id:`color-contrast`,enabled:!1}]}}}},s={loading:!1,onSubmit:()=>console.log(`onSubmit`)},c={args:s},l={args:s,play:async({canvas:e,userEvent:t})=>{await t.type(e.getByTestId(`sign-up-form__username-input`),`username`),await t.type(e.getByTestId(`sign-up-form__firstname-input`),`john`),await t.type(e.getByTestId(`sign-up-form__lastname-input`),`doe`),await t.type(e.getByTestId(`sign-up-form__email-input`),`email@provider.com`),await t.type(e.getByTestId(`sign-up-form__phonenumber-input`),`1234567890`),await t.type(e.getByTestId(`sign-up-form__password-input`),`password`),await t.type(e.getByTestId(`sign-up-form__confirmpassword-input`),`password`),await t.click(e.getByTestId(`sign-up-form__submit-button`)),await a(e.getByTestId(`sign-up-form__username-input`)).toHaveValue(`username`),await a(e.getByTestId(`sign-up-form__firstname-input`)).toHaveValue(`john`),await a(e.getByTestId(`sign-up-form__username-input`)).toHaveValue(`username`),await a(e.getByTestId(`sign-up-form__lastname-input`)).toHaveValue(`doe`),await a(e.getByTestId(`sign-up-form__email-input`)).toHaveValue(`email@provider.com`),await a(e.getByTestId(`sign-up-form__phonenumber-input`)).toHaveValue(`1234567890`),await a(e.getByTestId(`sign-up-form__password-input`)).toHaveValue(`password`),await a(e.getByTestId(`sign-up-form__confirmpassword-input`)).toHaveValue(`password`)}},u={args:s,play:async({canvas:e,userEvent:t})=>{await t.click(e.getByTestId(`sign-up-form__submit-button`)),await a(e.getByText(`We need to call you something`)).toBeInTheDocument(),await a(e.getByText(`Email must be valid`)).toBeInTheDocument(),await a(e.getByText(`Password is too short - should be 8 chars minimum`)).toBeInTheDocument(),await a(e.getByText(`Password must be confirmed`)).toBeInTheDocument()}},d={args:s,play:async({canvas:e,userEvent:t})=>{await t.type(e.getByTestId(`sign-up-form__username-input`),`username`),await t.type(e.getByTestId(`sign-up-form__email-input`),`email@provider.com`),await t.type(e.getByTestId(`sign-up-form__password-input`),`short`),await t.type(e.getByTestId(`sign-up-form__confirmpassword-input`),`short`),await t.click(e.getByTestId(`sign-up-form__submit-button`)),await a(e.getByText(`Password is too short - should be 8 chars minimum`)).toBeInTheDocument()}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}},f=[`Standard`,`Success`,`MissingFields`,`IncorrectPassword`]}))();export{d as IncorrectPassword,u as MissingFields,c as Standard,l as Success,f as __namedExportsOrder,o as default};