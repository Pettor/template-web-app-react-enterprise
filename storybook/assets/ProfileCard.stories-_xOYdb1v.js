import{c as i}from"./DocumentationLayout-H-tGD38G.js";import"./iframe-c1YiYtnK.js";import{P as s}from"./ProfileCard-DmqHoya-.js";import"./preload-helper-PPVm8Dsz.js";import"./chunk-YFAKJTDR-Ci6D3OJR.js";import"./chunk-JGY6VQQQ-BkgGoZtC.js";import"./index-Bw1Ctlrm.js";import"./index-DlMNUfEy.js";import"./useLocalizedStringFormatter-QR4BSf1N.js";import"./chunk-ZQGNWTBN-D-x6fJFC.js";import"./chunk-YFAKJTDR-BBykVR1J.js";import"./proxy-B2oItH5d.js";import"./is-motion-value-CykchRGT.js";import"./chunk-6VC6TS2O-B6Pwy_n_.js";import"./global-config-B5DaTUF1.js";import"./chunk-O24IAYCG-BrpeiVJJ.js";import"./chunk-D2DWF4OD-DxXypaKX.js";import"./index-8N3RDKQ6.js";import"./useLabel-jrOLW8Zp.js";import"./useLabels-DWx7vO6i.js";import"./index-CqSydaDh.js";import"./index-CsNLSLO4.js";import"./chunk-IHO36JMK-CwZlUJMz.js";import"./InformationCircleIcon-CMpbdzwK.js";import"./chunk-AWMMSYR4-DiwsRxfM.js";import"./chunk-SBOMX3YT-Foxv0x7d.js";const p={name:"John Doe",email:"john.doe@gmail.com",onAbout:()=>console.log("onAbout"),onLogout:()=>console.log("onLogout")},{expect:a}=__STORYBOOK_MODULE_TEST__,k={component:s,title:"Feedback/Profile/Card",decorators:[i],tags:["autodocs"]},r={...p},e={args:r,parameters:{viewport:{value:"full"}},play:async({canvas:t,userEvent:n})=>{await a(t.getByTestId("profile-card__details")).toHaveTextContent("John Doe"),await a(t.getByTestId("profile-card__details")).toHaveTextContent("john.doe@gmail.com"),n.click(t.getByTestId("profile-card__logout-button"))}},o={args:{...r,name:"",email:""},play:async({canvas:t})=>{await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./),await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./)}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
