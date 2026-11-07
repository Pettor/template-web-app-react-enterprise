import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{c as t,t as n}from"./src-8qpjjsx2.js";import{n as r,t as i}from"./ForgotPasswordForm-DnBog5VY.js";var a,o,s,c,l,u,d;function f(){return(f=e((()=>{n(),r(),{expect:a}=__STORYBOOK_MODULE_TEST__,o={component:i,title:`Forms/Forgot Password`,decorators:[t],parameters:{a11y:{config:{rules:[{id:`color-contrast`,enabled:!1}]}}}},s={loading:!1,onSubmit:()=>console.log(`onSubmit`)},c={args:s},l={args:s,play:async({canvas:e,userEvent:t})=>{await t.type(e.getByTestId(`forgot-password-form__email-input`),`email@provider.com`),await t.click(e.getByTestId(`forgot-password-form__submit-button`)),await a(e.getByTestId(`forgot-password-form__email-input`)).toHaveValue(`email@provider.com`)}},u={args:s,play:async({canvas:e,userEvent:t})=>{await t.click(e.getByTestId(`forgot-password-form__submit-button`)),await a(e.getByText(`Email must be valid`)).toBeInTheDocument()}},d=[`Standard`,`Success`,`IncorrectEmail`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.type(canvas.getByTestId("forgot-password-form__email-input"), "email@provider.com");
    await userEvent.click(canvas.getByTestId("forgot-password-form__submit-button"));
    await expect(canvas.getByTestId("forgot-password-form__email-input")).toHaveValue("email@provider.com");
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.click(canvas.getByTestId("forgot-password-form__submit-button"));
    await expect(canvas.getByText("Email must be valid")).toBeInTheDocument();
  }
}`,...u.parameters?.docs?.source}}}})))()}f();export{u as IncorrectEmail,c as Standard,l as Success,d as __namedExportsOrder,o as default};