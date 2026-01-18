import{a as i}from"./DocumentationLayout-Dr8hd-SR.js";import"./iframe-Cf7V4Wh9.js";import{P as s}from"./ProfileCard-DzYVQcDs.js";import"./preload-helper-PPVm8Dsz.js";import"./chunk-YFAKJTDR-BLNEHL9x.js";import"./chunk-EPPF4F2Y-N74DIiW5.js";import"./index-l8OuHtyp.js";import"./index-D8Z9jh5v.js";import"./useLocalizedStringFormatter-BNdJwMMF.js";import"./chunk-2KFDCN36-BKO1WVY5.js";import"./chunk-YFAKJTDR-BArGUceA.js";import"./proxy-CXbXiZf6.js";import"./resolve-motion-value-0VBr-JcK.js";import"./chunk-6VC6TS2O-D5bsGZi9.js";import"./chunk-QNLCCAKT-BNZIsdLm.js";import"./index-CLbgCbz3.js";import"./useLabel-D_G7Q5gG.js";import"./useLabels-AhDTTNxk.js";import"./index-Sq0XAo_L.js";import"./index-CsNLSLO4.js";import"./chunk-IHO36JMK-DvNuDWOK.js";import"./InformationCircleIcon-ClmEhB4w.js";import"./chunk-YZ6YLE2T-piwEgFni.js";const p={name:"John Doe",email:"john.doe@gmail.com",onAbout:()=>console.log("onAbout"),onLogout:()=>console.log("onLogout")},{expect:a}=__STORYBOOK_MODULE_TEST__,O={component:s,title:"Feedback/Profile/Card",decorators:[i],tags:["autodocs"]},r={...p},e={args:r,parameters:{viewport:{value:"full"}},play:async({canvas:t,userEvent:n})=>{await a(t.getByTestId("profile-card__details")).toHaveTextContent("John Doe"),await a(t.getByTestId("profile-card__details")).toHaveTextContent("john.doe@gmail.com"),n.click(t.getByTestId("profile-card__logout-button"))}},o={args:{...r,name:"",email:""},play:async({canvas:t})=>{await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./),await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./)}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const S=["WithData","Loading"];export{o as Loading,e as WithData,S as __namedExportsOrder,O as default};
