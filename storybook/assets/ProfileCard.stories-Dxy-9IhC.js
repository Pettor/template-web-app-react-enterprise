import{a as i}from"./DocumentationLayout-Chdi6f96.js";import"./iframe-D6cD9c3T.js";import{P as s}from"./ProfileCard-zfLHOoQ7.js";import"./preload-helper-PPVm8Dsz.js";import"./chunk-YFAKJTDR-CQt0Wt6c.js";import"./chunk-EPPF4F2Y-N74DIiW5.js";import"./index-DaEZwtAz.js";import"./index-Dn-j773x.js";import"./useLocalizedStringFormatter-DY4QS0Mn.js";import"./chunk-2KFDCN36-DGYaWiaz.js";import"./chunk-YFAKJTDR-CLA94Y_X.js";import"./proxy-C627ThDX.js";import"./is-motion-value-CYPXd9ku.js";import"./chunk-6VC6TS2O-CcSTo25q.js";import"./global-config-B5DaTUF1.js";import"./chunk-QNLCCAKT-nbr9mjJ4.js";import"./index-BYU31SNI.js";import"./useLabel-leRxPV6a.js";import"./useLabels-tcFLhMly.js";import"./index-Deev058_.js";import"./index-CsNLSLO4.js";import"./chunk-IHO36JMK-4J8Yhed_.js";import"./InformationCircleIcon-Bal2veA1.js";import"./chunk-YZ6YLE2T-kdDhcE6v.js";const p={name:"John Doe",email:"john.doe@gmail.com",onAbout:()=>console.log("onAbout"),onLogout:()=>console.log("onLogout")},{expect:a}=__STORYBOOK_MODULE_TEST__,S={component:s,title:"Feedback/Profile/Card",decorators:[i],tags:["autodocs"]},r={...p},e={args:r,parameters:{viewport:{value:"full"}},play:async({canvas:t,userEvent:n})=>{await a(t.getByTestId("profile-card__details")).toHaveTextContent("John Doe"),await a(t.getByTestId("profile-card__details")).toHaveTextContent("john.doe@gmail.com"),n.click(t.getByTestId("profile-card__logout-button"))}},o={args:{...r,name:"",email:""},play:async({canvas:t})=>{await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./),await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./)}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
