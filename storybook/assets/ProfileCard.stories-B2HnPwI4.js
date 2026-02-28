import{b as i}from"./DocumentationLayout-Dx_MQrT-.js";import"./iframe-rb5u8kG-.js";import{P as s}from"./ProfileCard-BQfKxyY_.js";import"./preload-helper-PPVm8Dsz.js";import"./chunk-YFAKJTDR-DKwxRaj9.js";import"./chunk-BGEKJ4Q5-DzVAaTre.js";import"./index-CX-lnvfg.js";import"./index-A0a1QD7y.js";import"./useLocalizedStringFormatter-D8BkpgXj.js";import"./chunk-TRZPE5UW-BdIhqDBY.js";import"./proxy-BtTjdtxL.js";import"./resolve-motion-value-BAmjP_zU.js";import"./useFocusRing-Xo4cRvQI.js";import"./chunk-6VC6TS2O-bSW3gb1N.js";import"./resolve-transition-BRWD_pRL.js";import"./chunk-QNLCCAKT-Dpve5lD2.js";import"./index-DJTH_STx.js";import"./focusSafely-uUZoqiSA.js";import"./useFocusRing-CTo2e8po.js";import"./useLabel-BuKBfsgx.js";import"./useLabels-lAvE5r34.js";import"./index-C5W73c41.js";import"./index-CsNLSLO4.js";import"./chunk-IHO36JMK-D4GiAcC9.js";import"./InformationCircleIcon-D1UyCm3l.js";import"./chunk-YZ6YLE2T-DLqpCQU8.js";const p={name:"John Doe",email:"john.doe@gmail.com",onAbout:()=>console.log("onAbout"),onLogout:()=>console.log("onLogout")},{expect:a}=__STORYBOOK_MODULE_TEST__,k={component:s,title:"Feedback/Profile/Card",decorators:[i],tags:["autodocs"]},r={...p},e={args:r,parameters:{viewport:{value:"full"}},play:async({canvas:t,userEvent:n})=>{await a(t.getByTestId("profile-card__details")).toHaveTextContent("John Doe"),await a(t.getByTestId("profile-card__details")).toHaveTextContent("john.doe@gmail.com"),n.click(t.getByTestId("profile-card__logout-button"))}},o={args:{...r,name:"",email:""},play:async({canvas:t})=>{await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./),await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./)}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
