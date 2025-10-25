import{a as i}from"./DocumentationLayout-Yu5PtoWW.js";import"./iframe-Ck-zY7hp.js";import{P as s}from"./ProfileCard-DznAXjaU.js";import"./preload-helper-PPVm8Dsz.js";import"./chunk-YFAKJTDR-CyP0vD2l.js";import"./chunk-JGY6VQQQ-tAznf3WQ.js";import"./index-wIFCU2xE.js";import"./index-DJUCz45Y.js";import"./useLocalizedStringFormatter-0PbleTvW.js";import"./chunk-ZQGNWTBN-9KIc47vs.js";import"./chunk-YFAKJTDR-ln9AFF-F.js";import"./proxy-Cnfh7O7K.js";import"./is-motion-value-gRKpgmBu.js";import"./chunk-6VC6TS2O-DXgTRzZq.js";import"./global-config-B5DaTUF1.js";import"./chunk-O24IAYCG-AQitN_eb.js";import"./chunk-D2DWF4OD-DF51XI7Z.js";import"./index-CXvQj_Ur.js";import"./useLabel-ceuQpQ0t.js";import"./useLabels-DBNmFB9Y.js";import"./index-DE1LZIDO.js";import"./index-CsNLSLO4.js";import"./chunk-IHO36JMK-BHP8idz0.js";import"./InformationCircleIcon-Co96faKl.js";import"./chunk-AWMMSYR4-DyqsbhuK.js";import"./chunk-SBOMX3YT-V_B2H_Yq.js";const p={name:"John Doe",email:"john.doe@gmail.com",onAbout:()=>console.log("onAbout"),onLogout:()=>console.log("onLogout")},{expect:a}=__STORYBOOK_MODULE_TEST__,k={component:s,title:"Feedback/Profile/Card",decorators:[i],tags:["autodocs"]},r={...p},e={args:r,parameters:{viewport:{value:"full"}},play:async({canvas:t,userEvent:n})=>{await a(t.getByTestId("profile-card__details")).toHaveTextContent("John Doe"),await a(t.getByTestId("profile-card__details")).toHaveTextContent("john.doe@gmail.com"),n.click(t.getByTestId("profile-card__logout-button"))}},o={args:{...r,name:"",email:""},play:async({canvas:t})=>{await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./),await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./)}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
