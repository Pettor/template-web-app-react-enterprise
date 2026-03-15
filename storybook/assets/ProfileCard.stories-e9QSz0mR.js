import{n as e}from"./chunk-zsgVPwQN.js";import{c as t,t as n}from"./src-Bp5RcZhR.js";import{n as r,t as i}from"./ProfileCard-DEzwpsmv.js";var a,o=e((()=>{a={name:`John Doe`,email:`john.doe@gmail.com`,onAbout:()=>console.log(`onAbout`),onLogout:()=>console.log(`onLogout`)}})),s,c,l,u,d,f;e((()=>{n(),r(),o(),{expect:s}=__STORYBOOK_MODULE_TEST__,c={component:i,title:`Feedback/Profile/Card`,decorators:[t],tags:[`autodocs`]},l={...a},u={args:l,parameters:{viewport:{value:`full`}},play:async({canvas:e,userEvent:t})=>{await s(e.getByTestId(`profile-card__details`)).toHaveTextContent(`John Doe`),await s(e.getByTestId(`profile-card__details`)).toHaveTextContent(`john.doe@gmail.com`),t.click(e.getByTestId(`profile-card__logout-button`))}},d={args:{...l,name:``,email:``},play:async({canvas:e})=>{await s(e.getByTestId(`profile-card__details`)).not.toHaveTextContent(/./),await s(e.getByTestId(`profile-card__details`)).not.toHaveTextContent(/./)}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  parameters: {
    viewport: {
      value: "full"
    }
  },
  play: async ({
    canvas,
    userEvent
  }) => {
    // No text should be visible during loading
    await expect(canvas.getByTestId("profile-card__details")).toHaveTextContent("John Doe");
    await expect(canvas.getByTestId("profile-card__details")).toHaveTextContent("john.doe@gmail.com");
    userEvent.click(canvas.getByTestId("profile-card__logout-button"));
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    name: "",
    email: ""
  },
  play: async ({
    canvas
  }) => {
    // No text should be visible during loading
    await expect(canvas.getByTestId("profile-card__details")).not.toHaveTextContent(/./);
    await expect(canvas.getByTestId("profile-card__details")).not.toHaveTextContent(/./);
  }
}`,...d.parameters?.docs?.source}}},f=[`WithData`,`Loading`]}))();export{d as Loading,u as WithData,f as __namedExportsOrder,c as default};