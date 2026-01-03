import{a as i}from"./DocumentationLayout-Brs5rNN_.js";import"./iframe-DcPPQ38v.js";import{P as s}from"./ProfileCard-DS0nbS4m.js";import"./preload-helper-PPVm8Dsz.js";import"./chunk-YFAKJTDR-3z9mjsbI.js";import"./chunk-EPPF4F2Y-N74DIiW5.js";import"./index-BBWTL6ob.js";import"./index-CHuGHTnU.js";import"./useLocalizedStringFormatter-Dw6JReuB.js";import"./chunk-2KFDCN36-wMFw96ye.js";import"./chunk-YFAKJTDR-BC-JekcA.js";import"./proxy-D6aSC7tz.js";import"./is-motion-value-CYPXd9ku.js";import"./chunk-6VC6TS2O-BaHIOEi-.js";import"./global-config-B5DaTUF1.js";import"./chunk-QNLCCAKT-BChoLmeI.js";import"./index-C3iF5Pfm.js";import"./useLabel-lIWvMcul.js";import"./useLabels-DQ5t4fQS.js";import"./index-Lv0frlYK.js";import"./index-CsNLSLO4.js";import"./chunk-IHO36JMK-PJdwVr0h.js";import"./InformationCircleIcon-DSylGOFs.js";import"./chunk-YZ6YLE2T-DF4HTOGm.js";const p={name:"John Doe",email:"john.doe@gmail.com",onAbout:()=>console.log("onAbout"),onLogout:()=>console.log("onLogout")},{expect:a}=__STORYBOOK_MODULE_TEST__,S={component:s,title:"Feedback/Profile/Card",decorators:[i],tags:["autodocs"]},r={...p},e={args:r,parameters:{viewport:{value:"full"}},play:async({canvas:t,userEvent:n})=>{await a(t.getByTestId("profile-card__details")).toHaveTextContent("John Doe"),await a(t.getByTestId("profile-card__details")).toHaveTextContent("john.doe@gmail.com"),n.click(t.getByTestId("profile-card__logout-button"))}},o={args:{...r,name:"",email:""},play:async({canvas:t})=>{await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./),await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./)}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
