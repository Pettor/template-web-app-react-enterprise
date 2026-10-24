import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{i as n,n as r,r as i,t as a}from"./StorybookNavbarContentComponent-BEOq6x9q.js";var o,s,c,l,u,d,f;function p(){return(p=e((()=>{r(),n(),o=t(),{expect:s}=__STORYBOOK_MODULE_TEST__,c={component:i,title:`Shared/Navigation/Navbar`,parameters:{a11y:{config:{rules:[{id:`color-contrast`,enabled:!1},{id:`list`,enabled:!1},{id:`th-has-data-cells`,enabled:!1}]}},layout:`fullscreen`}},l={title:`This is a Header`},u={args:l,play:async({canvas:e})=>{await s(e.getByText(`This is a Header`)).toBeInTheDocument(),await s(e.getByRole(`banner`)).toBeInTheDocument()}},d={args:{...l,endElement:(0,o.jsx)(a,{})},parameters:{viewport:{value:`full`}}},f=[`Standard`,`WithComponents`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas
  }) => {
    await expect(canvas.getByText("This is a Header")).toBeInTheDocument();
    await expect(canvas.getByRole("banner")).toBeInTheDocument();
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    endElement: <StorybookNavbarContentComponent />
  },
  parameters: {
    viewport: {
      value: "full"
    }
  }
}`,...d.parameters?.docs?.source}}}})))()}p();export{u as Standard,d as WithComponents,f as __namedExportsOrder,c as default};