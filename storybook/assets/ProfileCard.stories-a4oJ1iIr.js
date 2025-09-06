import{a as i}from"./DocumentationLayout-DubvHnwh.js";import"./iframe-DdqkjWab.js";import{P as s}from"./ProfileCard-2H6REneB.js";import"./preload-helper-D9Z9MdNV.js";import"./chunk-YFAKJTDR-BLY8ilgV.js";import"./chunk-JGY6VQQQ-CJc5eprO.js";import"./index-Bh5Aje1E.js";import"./index-BJ2GfZCG.js";import"./useLocalizedStringFormatter-CoQlH2dy.js";import"./chunk-ZQGNWTBN-BHCQk4RL.js";import"./chunk-YFAKJTDR-B6I8n8r9.js";import"./proxy-Dtf2FOfT.js";import"./is-motion-value-gRKpgmBu.js";import"./chunk-6VC6TS2O-HRdWtWwR.js";import"./global-config-B5DaTUF1.js";import"./chunk-O24IAYCG-B6Xb9ezp.js";import"./chunk-D2DWF4OD-_SUQX2nZ.js";import"./index-Dy6CUPll.js";import"./useLabel-CAUCgP36.js";import"./useLabels-D6nds5v_.js";import"./index-LLciPC0B.js";import"./index-CsNLSLO4.js";import"./chunk-IHO36JMK-D6Hn9BKa.js";import"./InformationCircleIcon-Blc_uJ8L.js";import"./chunk-AWMMSYR4-Dq-Tywei.js";import"./chunk-SBOMX3YT-Bgk95Hp2.js";const p={name:"John Doe",email:"john.doe@gmail.com",onAbout:()=>console.log("onAbout"),onLogout:()=>console.log("onLogout")},{expect:a}=__STORYBOOK_MODULE_TEST__,k={component:s,title:"Feedback/Profile/Card",decorators:[i],tags:["autodocs"]},r={...p},e={args:r,parameters:{viewport:{value:"full"}},play:async({canvas:t,userEvent:n})=>{await a(t.getByTestId("profile-card__details")).toHaveTextContent("John Doe"),await a(t.getByTestId("profile-card__details")).toHaveTextContent("john.doe@gmail.com"),n.click(t.getByTestId("profile-card__logout-button"))}},o={args:{...r,name:"",email:""},play:async({canvas:t})=>{await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./),await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./)}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const J=["WithData","Loading"];export{o as Loading,e as WithData,J as __namedExportsOrder,k as default};
