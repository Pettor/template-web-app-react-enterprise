import{b as i}from"./DocumentationLayout-DESLflwa.js";import"./iframe-YtoMSC9b.js";import{P as s}from"./ProfileCard-Dvnziti_.js";import"./preload-helper-PPVm8Dsz.js";import"./chunk-YFAKJTDR-8nLJQi6g.js";import"./chunk-BGEKJ4Q5-DzVAaTre.js";import"./index-j9ILsqx0.js";import"./index-C0IDy0rf.js";import"./useLocalizedStringFormatter-DoyP1OMw.js";import"./chunk-TRZPE5UW-DYqKtY72.js";import"./chunk-YFAKJTDR-DSW9XQbZ.js";import"./proxy-CmgMLf2W.js";import"./resolve-motion-value-DYFQeTuo.js";import"./chunk-6VC6TS2O-laIAtYmh.js";import"./resolve-transition-BRWD_pRL.js";import"./chunk-QNLCCAKT-3a28CFLe.js";import"./index-BS9YWX_h.js";import"./useLabel-BrsUh4iB.js";import"./useLabels-DeNRhtDv.js";import"./index-CeF1__m9.js";import"./index-CsNLSLO4.js";import"./chunk-IHO36JMK-BpMhDCZ8.js";import"./InformationCircleIcon-CEhdqXns.js";import"./chunk-YZ6YLE2T-C7Xqje9w.js";const p={name:"John Doe",email:"john.doe@gmail.com",onAbout:()=>console.log("onAbout"),onLogout:()=>console.log("onLogout")},{expect:a}=__STORYBOOK_MODULE_TEST__,S={component:s,title:"Feedback/Profile/Card",decorators:[i],tags:["autodocs"]},r={...p},e={args:r,parameters:{viewport:{value:"full"}},play:async({canvas:t,userEvent:n})=>{await a(t.getByTestId("profile-card__details")).toHaveTextContent("John Doe"),await a(t.getByTestId("profile-card__details")).toHaveTextContent("john.doe@gmail.com"),n.click(t.getByTestId("profile-card__logout-button"))}},o={args:{...r,name:"",email:""},play:async({canvas:t})=>{await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./),await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./)}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const j=["WithData","Loading"];export{o as Loading,e as WithData,j as __namedExportsOrder,S as default};
