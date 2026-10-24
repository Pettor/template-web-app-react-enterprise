import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./QuickMenu-OZ52t8Eo.js";import{c as r,t as i}from"./src-jqeclvhF.js";var a,o,s,c,l,u;function d(){return(d=e((()=>{i(),t(),{expect:a}=__STORYBOOK_MODULE_TEST__,o={component:n,title:`Actions/Quick Menu`,tags:[`autodocs`],decorators:[r]},s={onSettings:()=>console.log(`onSettings`),onLogout:()=>console.log(`onLogout`),onSearch:()=>console.log(`onSearch`)},c={args:s},l={args:s,play:async({canvas:e,userEvent:t})=>{let n=e.getByTestId(`quick-menu__search-button`),r=e.getByTestId(`quick-menu__settings-button`),i=e.getByTestId(`quick-menu__logout-button`);await a(n).toBeInTheDocument(),await a(r).toBeInTheDocument(),await a(i).toBeInTheDocument(),await t.click(n),await t.click(r),await t.click(i)}},u=[`Default`,`Interaction`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas,
    userEvent
  }) => {
    const searchButton = canvas.getByTestId("quick-menu__search-button");
    const settingsButton = canvas.getByTestId("quick-menu__settings-button");
    const logoutButton = canvas.getByTestId("quick-menu__logout-button");
    await expect(searchButton).toBeInTheDocument();
    await expect(settingsButton).toBeInTheDocument();
    await expect(logoutButton).toBeInTheDocument();
    await userEvent.click(searchButton);
    await userEvent.click(settingsButton);
    await userEvent.click(logoutButton);
  }
} satisfies Story`,...l.parameters?.docs?.source}}}})))()}d();export{c as Default,l as Interaction,u as __namedExportsOrder,o as default};