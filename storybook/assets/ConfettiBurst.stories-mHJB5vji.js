import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-DCluhXK3.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{n as r,t as i}from"./button-C5GnRu5O.js";import{n as a,t as o}from"./ConfettiBurst-Ci394A6y.js";function s(){let[e,t]=(0,c.useState)(0);return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(o,{active:e>0},e),(0,l.jsx)(i,{onPress:()=>t(e=>e+1),children:`Celebrate 🎉`})]})}var c,l,u,d,f,p,m,h,g,_;function v(){return(v=e((()=>{c=t(),r(),a(),l=n(),{expect:u,within:d}=__STORYBOOK_MODULE_TEST__,f={component:o,title:`Display/Confetti Burst`,tags:[`autodocs`],decorators:[e=>(0,l.jsx)(`div`,{className:`bg-surface relative grid h-64 w-full place-items-center overflow-hidden rounded-3xl`,children:(0,l.jsx)(e,{})})]},p={active:!0},m={args:p,play:async({canvasElement:e})=>{await u(e.querySelectorAll(`span`).length).toBe(36)}},h={args:{...p,pieces:12}},g={render:()=>(0,l.jsx)(s,{}),play:async({canvasElement:e})=>{let t=d(e);await u(t.getByRole(`button`,{name:/Celebrate/})).toBeInTheDocument()}},_=[`Default`,`Small`,`Replay`],m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvasElement
  }) => {
    await expect(canvasElement.querySelectorAll("span").length).toBe(36);
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    pieces: 12
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <ReplayExample />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button", {
      name: /Celebrate/
    })).toBeInTheDocument();
  }
}`,...g.parameters?.docs?.source}}}})))()}v();export{m as Default,g as Replay,h as Small,_ as __namedExportsOrder,f as default};