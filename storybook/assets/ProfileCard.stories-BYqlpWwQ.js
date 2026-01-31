import{b as i}from"./DocumentationLayout-DwHr5F6m.js";import"./iframe-CnCK37SH.js";import{P as s}from"./ProfileCard-BiBQCZ3g.js";import"./preload-helper-PPVm8Dsz.js";import"./chunk-YFAKJTDR-RHHAD3T1.js";import"./chunk-BGEKJ4Q5-DzVAaTre.js";import"./index-Chq0pB1g.js";import"./index-CVb7lC0m.js";import"./useLocalizedStringFormatter-CAOMdgbu.js";import"./chunk-TRZPE5UW-OEw6EtHv.js";import"./chunk-YFAKJTDR-CnybrVn-.js";import"./proxy-DEW424Wg.js";import"./resolve-motion-value-qohy-mmk.js";import"./chunk-6VC6TS2O-Dkz43mP9.js";import"./chunk-QNLCCAKT-BzgxEJFD.js";import"./index-Cu36_eSG.js";import"./useLabel-CMNBQ5Eu.js";import"./useLabels-BwsKugO_.js";import"./index-lWqefWSW.js";import"./index-CsNLSLO4.js";import"./chunk-IHO36JMK-DqennI62.js";import"./InformationCircleIcon-CEdhZC6D.js";import"./chunk-YZ6YLE2T-DmzaCbiG.js";const p={name:"John Doe",email:"john.doe@gmail.com",onAbout:()=>console.log("onAbout"),onLogout:()=>console.log("onLogout")},{expect:a}=__STORYBOOK_MODULE_TEST__,O={component:s,title:"Feedback/Profile/Card",decorators:[i],tags:["autodocs"]},r={...p},e={args:r,parameters:{viewport:{value:"full"}},play:async({canvas:t,userEvent:n})=>{await a(t.getByTestId("profile-card__details")).toHaveTextContent("John Doe"),await a(t.getByTestId("profile-card__details")).toHaveTextContent("john.doe@gmail.com"),n.click(t.getByTestId("profile-card__logout-button"))}},o={args:{...r,name:"",email:""},play:async({canvas:t})=>{await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./),await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./)}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
