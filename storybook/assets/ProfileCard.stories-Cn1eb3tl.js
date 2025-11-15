import{c as i}from"./DocumentationLayout-23UleARG.js";import"./iframe-C6AZxKr1.js";import{P as s}from"./ProfileCard-IoVs1UTL.js";import"./preload-helper-PPVm8Dsz.js";import"./chunk-YFAKJTDR-CzZ_8dr-.js";import"./chunk-JGY6VQQQ-BkgGoZtC.js";import"./index-BtuE92fA.js";import"./index-B_W1-M7C.js";import"./useLocalizedStringFormatter-BxPXHGva.js";import"./chunk-ZQGNWTBN-Dy_4uniI.js";import"./chunk-YFAKJTDR-CCqOzW-r.js";import"./proxy-Dz1ebHA1.js";import"./is-motion-value-CykchRGT.js";import"./chunk-6VC6TS2O-CPbXJLEj.js";import"./global-config-B5DaTUF1.js";import"./chunk-O24IAYCG-DVzujteO.js";import"./chunk-D2DWF4OD-DXV6E-l2.js";import"./index-C_8p7YAa.js";import"./useLabel-DmhaZqQu.js";import"./useLabels-CtiM7yf6.js";import"./index-DkDLQ0DL.js";import"./index-CsNLSLO4.js";import"./chunk-IHO36JMK-DYm64mby.js";import"./InformationCircleIcon-WLIMIdFM.js";import"./chunk-AWMMSYR4-C5PSaf7n.js";import"./chunk-SBOMX3YT-Foxv0x7d.js";const p={name:"John Doe",email:"john.doe@gmail.com",onAbout:()=>console.log("onAbout"),onLogout:()=>console.log("onLogout")},{expect:a}=__STORYBOOK_MODULE_TEST__,k={component:s,title:"Feedback/Profile/Card",decorators:[i],tags:["autodocs"]},r={...p},e={args:r,parameters:{viewport:{value:"full"}},play:async({canvas:t,userEvent:n})=>{await a(t.getByTestId("profile-card__details")).toHaveTextContent("John Doe"),await a(t.getByTestId("profile-card__details")).toHaveTextContent("john.doe@gmail.com"),n.click(t.getByTestId("profile-card__logout-button"))}},o={args:{...r,name:"",email:""},play:async({canvas:t})=>{await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./),await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./)}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
