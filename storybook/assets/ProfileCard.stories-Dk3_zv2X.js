import{a as i}from"./DocumentationLayout-DPXqq37H.js";import"./iframe-CVh_g5GF.js";import{P as s}from"./ProfileCard-3t1VHOHm.js";import"./preload-helper-D9Z9MdNV.js";import"./chunk-YFAKJTDR-DlAwBfa8.js";import"./chunk-JGY6VQQQ-BkFehgb2.js";import"./index-Cs2DC1HH.js";import"./index-CXMfSR4R.js";import"./useLocalizedStringFormatter-Ck1EGdb_.js";import"./chunk-ZQGNWTBN-DGdDUK-u.js";import"./chunk-YFAKJTDR-D9NT3Wer.js";import"./proxy-3wtZ51YI.js";import"./is-motion-value-gRKpgmBu.js";import"./chunk-6VC6TS2O-Bm5cKJL1.js";import"./global-config-B5DaTUF1.js";import"./chunk-O24IAYCG-tYdgHnQJ.js";import"./chunk-D2DWF4OD-DjxxGiQZ.js";import"./index-XIFOz5bU.js";import"./useLabel-CoRkl_sc.js";import"./useLabels-D3unFxLh.js";import"./index-D2s6Gnab.js";import"./index-CsNLSLO4.js";import"./chunk-IHO36JMK-CAa-tpwc.js";import"./InformationCircleIcon-DbOyBgsk.js";import"./chunk-AWMMSYR4-B7KeM-19.js";import"./chunk-SBOMX3YT-DU9FHKf2.js";const p={name:"John Doe",email:"john.doe@gmail.com",onAbout:()=>console.log("onAbout"),onLogout:()=>console.log("onLogout")},{expect:a}=__STORYBOOK_MODULE_TEST__,k={component:s,title:"Feedback/Profile/Card",decorators:[i],tags:["autodocs"]},r={...p},e={args:r,parameters:{viewport:{value:"full"}},play:async({canvas:t,userEvent:n})=>{await a(t.getByTestId("profile-card__details")).toHaveTextContent("John Doe"),await a(t.getByTestId("profile-card__details")).toHaveTextContent("john.doe@gmail.com"),n.click(t.getByTestId("profile-card__logout-button"))}},o={args:{...r,name:"",email:""},play:async({canvas:t})=>{await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./),await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./)}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
