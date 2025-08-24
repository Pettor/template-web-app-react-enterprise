import{a as i}from"./DocumentationLayout-d6vKNLxX.js";import"./iframe-BpyOjFLk.js";import{P as s}from"./ProfileCard-B6mIQ2Oa.js";import"./preload-helper-D9Z9MdNV.js";import"./chunk-YFAKJTDR-BsxcyD9O.js";import"./chunk-JGY6VQQQ-BkFehgb2.js";import"./index-D5GmdqLr.js";import"./index-CC97iVX2.js";import"./useLocalizedStringFormatter-BVKxZ1rM.js";import"./chunk-ZQGNWTBN-Dn2EqAO6.js";import"./chunk-YFAKJTDR-Di6-d6KD.js";import"./proxy-DDcP7Dkb.js";import"./is-motion-value-gRKpgmBu.js";import"./chunk-6VC6TS2O-DKTOnU5X.js";import"./global-config-B5DaTUF1.js";import"./chunk-O24IAYCG-CC6h-P0A.js";import"./chunk-D2DWF4OD-CH3FXhj0.js";import"./index-CDlKSLra.js";import"./useLabel-BLf7k3a-.js";import"./useLabels-ChNF15kM.js";import"./index-BPD1-VI1.js";import"./index-CsNLSLO4.js";import"./chunk-IHO36JMK-gWp-ceLe.js";import"./InformationCircleIcon-BCAbakP1.js";import"./chunk-AWMMSYR4-XYzZq0SE.js";import"./chunk-SBOMX3YT-DU9FHKf2.js";const p={name:"John Doe",email:"john.doe@gmail.com",onAbout:()=>console.log("onAbout"),onLogout:()=>console.log("onLogout")},{expect:a}=__STORYBOOK_MODULE_TEST__,k={component:s,title:"Feedback/Profile/Card",decorators:[i],tags:["autodocs"]},r={...p},e={args:r,parameters:{viewport:{value:"full"}},play:async({canvas:t,userEvent:n})=>{await a(t.getByTestId("profile-card__details")).toHaveTextContent("John Doe"),await a(t.getByTestId("profile-card__details")).toHaveTextContent("john.doe@gmail.com"),n.click(t.getByTestId("profile-card__logout-button"))}},o={args:{...r,name:"",email:""},play:async({canvas:t})=>{await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./),await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./)}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
