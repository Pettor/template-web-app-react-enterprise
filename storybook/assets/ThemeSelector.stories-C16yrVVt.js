import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{n as t,t as n}from"./ThemeSelector-Dr36sA7L.js";var r,i,a,o,s,c,l,u,d;function f(){return(f=e((()=>{t(),{expect:r}=__STORYBOOK_MODULE_TEST__,i={component:n,title:`Actions/Theme Selector`},a={mode:`auto`,onSelect:e=>console.log(`Selected:`,e)},o={args:a},s={args:{...a,mode:`light`}},c={args:{...a,mode:`dark`}},l={args:a,play:async({canvas:e,userEvent:t})=>{let n=e.getByRole(`radio`,{name:`Light`});await r(n).toBeInTheDocument(),await t.click(n)}},u={args:{...a,mode:`light`},play:async({canvas:e,userEvent:t})=>{let n=e.getByRole(`radio`,{name:`Dark`});await r(n).toBeInTheDocument(),await t.click(n)}},d=[`Auto`,`Light`,`Dark`,`SelectLight`,`SelectDark`],o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    mode: "light"
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    mode: "dark"
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas,
    userEvent
  }) => {
    const lightOption = canvas.getByRole("radio", {
      name: "Light"
    });
    await expect(lightOption).toBeInTheDocument();
    await userEvent.click(lightOption);
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    mode: "light"
  },
  play: async ({
    canvas,
    userEvent
  }) => {
    const darkOption = canvas.getByRole("radio", {
      name: "Dark"
    });
    await expect(darkOption).toBeInTheDocument();
    await userEvent.click(darkOption);
  }
}`,...u.parameters?.docs?.source}}}})))()}f();export{o as Auto,c as Dark,s as Light,u as SelectDark,l as SelectLight,d as __namedExportsOrder,i as default};