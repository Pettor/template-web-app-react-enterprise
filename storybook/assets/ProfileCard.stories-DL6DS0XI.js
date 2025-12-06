import{a as i}from"./DocumentationLayout-BL8Umjgv.js";import"./iframe-CAxEJG-u.js";import{P as s}from"./ProfileCard-BkaUMWwz.js";import"./preload-helper-PPVm8Dsz.js";import"./chunk-YFAKJTDR-Dk9SSuiu.js";import"./chunk-JGY6VQQQ-tAznf3WQ.js";import"./index-7tZZOvsK.js";import"./index-BqdibKMT.js";import"./useLocalizedStringFormatter-B59HoBoj.js";import"./chunk-ZQGNWTBN-CVShAdbp.js";import"./chunk-YFAKJTDR-HL083fPa.js";import"./proxy-iLrMgQvU.js";import"./is-motion-value-gRKpgmBu.js";import"./chunk-6VC6TS2O-CddIr9ZB.js";import"./global-config-B5DaTUF1.js";import"./chunk-O24IAYCG-BL_RkUmx.js";import"./chunk-D2DWF4OD-DKMSA14k.js";import"./index-QX0JLmSj.js";import"./useLabel-GH6kirb1.js";import"./useLabels-Byj9JTJs.js";import"./index-BRu6ZilQ.js";import"./index-CsNLSLO4.js";import"./chunk-IHO36JMK-BJrybYk9.js";import"./InformationCircleIcon-B0TeH_HV.js";import"./chunk-AWMMSYR4-C9PVPxY8.js";import"./chunk-SBOMX3YT-V_B2H_Yq.js";const p={name:"John Doe",email:"john.doe@gmail.com",onAbout:()=>console.log("onAbout"),onLogout:()=>console.log("onLogout")},{expect:a}=__STORYBOOK_MODULE_TEST__,k={component:s,title:"Feedback/Profile/Card",decorators:[i],tags:["autodocs"]},r={...p},e={args:r,parameters:{viewport:{value:"full"}},play:async({canvas:t,userEvent:n})=>{await a(t.getByTestId("profile-card__details")).toHaveTextContent("John Doe"),await a(t.getByTestId("profile-card__details")).toHaveTextContent("john.doe@gmail.com"),n.click(t.getByTestId("profile-card__logout-button"))}},o={args:{...r,name:"",email:""},play:async({canvas:t})=>{await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./),await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./)}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
