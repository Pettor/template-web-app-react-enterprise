import{b as i}from"./DocumentationLayout-1rAMPyC8.js";import"./iframe-C2w-mLaN.js";import{P as s}from"./ProfileCard-JBAUCLCT.js";import"./preload-helper-PPVm8Dsz.js";import"./chunk-YFAKJTDR-BQuJm8Ov.js";import"./chunk-EPPF4F2Y-1Nh5Ibwx.js";import"./index-DEYuNRoU.js";import"./index-DvV4yheu.js";import"./useLocalizedStringFormatter-DOq-c6OV.js";import"./chunk-2KFDCN36-AbFUpE89.js";import"./chunk-YFAKJTDR-Hyxer1RJ.js";import"./proxy-Dn8wRnpX.js";import"./resolve-motion-value-qohy-mmk.js";import"./chunk-6VC6TS2O-BYrCQn34.js";import"./chunk-QNLCCAKT-rgiFWZ1R.js";import"./index-BiGbxJE-.js";import"./useLabel-CArOkbIU.js";import"./useLabels-DntHT_zK.js";import"./index-oC3WoWXX.js";import"./index-CsNLSLO4.js";import"./chunk-IHO36JMK-TMk8wbIO.js";import"./InformationCircleIcon-6WPKsN-3.js";import"./chunk-YZ6YLE2T-DoHYqK5c.js";const p={name:"John Doe",email:"john.doe@gmail.com",onAbout:()=>console.log("onAbout"),onLogout:()=>console.log("onLogout")},{expect:a}=__STORYBOOK_MODULE_TEST__,O={component:s,title:"Feedback/Profile/Card",decorators:[i],tags:["autodocs"]},r={...p},e={args:r,parameters:{viewport:{value:"full"}},play:async({canvas:t,userEvent:n})=>{await a(t.getByTestId("profile-card__details")).toHaveTextContent("John Doe"),await a(t.getByTestId("profile-card__details")).toHaveTextContent("john.doe@gmail.com"),n.click(t.getByTestId("profile-card__logout-button"))}},o={args:{...r,name:"",email:""},play:async({canvas:t})=>{await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./),await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./)}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
