import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./LogoFull-BWKy21Sj.js";var r,i,a,o,s,c;function l(){return(l=e((()=>{t(),{expect:r}=__STORYBOOK_MODULE_TEST__,i={component:n,title:`Shared/Branding/Logo/Full`,tags:[`autodocs`]},a={args:{appName:`My App`,size:`small`},play:async({canvas:e})=>{await r(e.getByText(`My App`)).toBeInTheDocument()}},o={args:{appName:`My App`,size:`medium`},play:async({canvas:e})=>{await r(e.getByText(`My App`)).toBeInTheDocument()}},s={args:{appName:`My App`,size:`large`},play:async({canvas:e})=>{await r(e.getByText(`My App`)).toBeInTheDocument()}},c=[`FullSmall`,`FullMedium`,`FullLarge`],a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    appName: "My App",
    size: "small"
  },
  play: async ({
    canvas
  }) => {
    await expect(canvas.getByText("My App")).toBeInTheDocument();
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    appName: "My App",
    size: "medium"
  },
  play: async ({
    canvas
  }) => {
    await expect(canvas.getByText("My App")).toBeInTheDocument();
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    appName: "My App",
    size: "large"
  },
  play: async ({
    canvas
  }) => {
    await expect(canvas.getByText("My App")).toBeInTheDocument();
  }
}`,...s.parameters?.docs?.source}}}})))()}l();export{s as FullLarge,o as FullMedium,a as FullSmall,c as __namedExportsOrder,i as default};