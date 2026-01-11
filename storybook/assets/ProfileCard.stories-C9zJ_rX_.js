import{a as i}from"./DocumentationLayout-BDyE8v8w.js";import"./iframe-CUJgGUwl.js";import{P as s}from"./ProfileCard-Bf4WpD1o.js";import"./preload-helper-PPVm8Dsz.js";import"./chunk-YFAKJTDR-BiTQdIj6.js";import"./chunk-EPPF4F2Y-N74DIiW5.js";import"./index-DJxdgZX2.js";import"./index-CRoNW6TX.js";import"./useLocalizedStringFormatter-CZ4Cm07c.js";import"./chunk-2KFDCN36-CKYY4SnA.js";import"./chunk-YFAKJTDR-B9bk3R-t.js";import"./proxy-B__BNl_-.js";import"./is-motion-value-COLMKfLZ.js";import"./chunk-6VC6TS2O-D3Fc84_O.js";import"./global-config-B5DaTUF1.js";import"./chunk-QNLCCAKT-BttbCLow.js";import"./index-CVdUDKGF.js";import"./useLabel-BvzKPJlk.js";import"./useLabels-DlSQl0rN.js";import"./index-z2PJ-Tu-.js";import"./index-CsNLSLO4.js";import"./chunk-IHO36JMK-D9Emueal.js";import"./InformationCircleIcon-o0WLFvoB.js";import"./chunk-YZ6YLE2T-BS-RAdB7.js";const p={name:"John Doe",email:"john.doe@gmail.com",onAbout:()=>console.log("onAbout"),onLogout:()=>console.log("onLogout")},{expect:a}=__STORYBOOK_MODULE_TEST__,S={component:s,title:"Feedback/Profile/Card",decorators:[i],tags:["autodocs"]},r={...p},e={args:r,parameters:{viewport:{value:"full"}},play:async({canvas:t,userEvent:n})=>{await a(t.getByTestId("profile-card__details")).toHaveTextContent("John Doe"),await a(t.getByTestId("profile-card__details")).toHaveTextContent("john.doe@gmail.com"),n.click(t.getByTestId("profile-card__logout-button"))}},o={args:{...r,name:"",email:""},play:async({canvas:t})=>{await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./),await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./)}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
