import{a as i}from"./DocumentationLayout-CJxVEWzC.js";import"./iframe-FYjSiTNB.js";import{P as s}from"./ProfileCard-BTtHrbOi.js";import"./preload-helper-D9Z9MdNV.js";import"./chunk-YFAKJTDR-BvTqOLLD.js";import"./chunk-JGY6VQQQ-BkFehgb2.js";import"./index-B430vpiK.js";import"./index-Bygt4LQ9.js";import"./useLocalizedStringFormatter-DueuQoN5.js";import"./chunk-ZQGNWTBN-CIwwD9I8.js";import"./chunk-YFAKJTDR-CQ1m-4rQ.js";import"./proxy-BLIooMCO.js";import"./is-motion-value-gRKpgmBu.js";import"./chunk-6VC6TS2O-3krgdrQx.js";import"./global-config-B5DaTUF1.js";import"./chunk-O24IAYCG-Du2BTSAN.js";import"./chunk-D2DWF4OD-2VjfnWoI.js";import"./index-DIVNhdf-.js";import"./useLabel-CbsYngQ6.js";import"./useLabels-Cu-uIKR7.js";import"./index-DHXDq9JI.js";import"./index-CsNLSLO4.js";import"./chunk-IHO36JMK-BYMyX-AT.js";import"./InformationCircleIcon-C0ewdoPa.js";import"./chunk-AWMMSYR4-CHA1p_0k.js";import"./chunk-SBOMX3YT-DU9FHKf2.js";const p={name:"John Doe",email:"john.doe@gmail.com",onAbout:()=>console.log("onAbout"),onLogout:()=>console.log("onLogout")},{expect:a}=__STORYBOOK_MODULE_TEST__,k={component:s,title:"Feedback/Profile/Card",decorators:[i],tags:["autodocs"]},r={...p},e={args:r,parameters:{viewport:{value:"full"}},play:async({canvas:t,userEvent:n})=>{await a(t.getByTestId("profile-card__details")).toHaveTextContent("John Doe"),await a(t.getByTestId("profile-card__details")).toHaveTextContent("john.doe@gmail.com"),n.click(t.getByTestId("profile-card__logout-button"))}},o={args:{...r,name:"",email:""},play:async({canvas:t})=>{await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./),await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./)}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
