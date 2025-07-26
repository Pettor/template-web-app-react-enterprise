import{b as i}from"./DocumentationLayout-DAgG1-ZX.js";import"./iframe-oH_DC80A.js";import{P as s}from"./ProfileCard-iyKX_07i.js";import"./chunk-3HKZRFKK-CI1EtVuS.js";import"./index-CQujp2HH.js";import"./index-gFDqmumT.js";import"./chunk-GQT3YUX3-DlgZpYdS.js";import"./chunk-BDGLNRCW-kbLzW4Gq.js";import"./index-BQ3rQu0T.js";import"./chunk-RJKRL3AU-CzlZidxD.js";import"./proxy-Saq8bX4Y.js";import"./chunk-O24IAYCG-CgsVN_sE.js";import"./chunk-6VC6TS2O-D8_K1fXx.js";import"./chunk-S574QCAN-oED5SgeT.js";import"./index-B6pczB3M.js";import"./useLabel-Bpy1T8Tv.js";import"./useLabels-DOf7al2g.js";import"./index-B6F8FKAz.js";import"./FocusScope-BYg8OLd_.js";import"./useControlledState-Bs-o5zaq.js";import"./chunk-IHO36JMK-Doz2O8AG.js";import"./InformationCircleIcon-D_PaRkOV.js";import"./chunk-AWMMSYR4-BvRM6c9T.js";const p={name:"John Doe",email:"john.doe@gmail.com",onAbout:()=>console.log("onAbout"),onLogout:()=>console.log("onLogout")},{expect:a}=__STORYBOOK_MODULE_TEST__,O={component:s,title:"Feedback/Profile/Card",decorators:[i],tags:["autodocs"]},r={...p},e={args:r,parameters:{viewport:{value:"full"}},play:async({canvas:t,userEvent:n})=>{await a(t.getByTestId("profile-card__details")).toHaveTextContent("John Doe"),await a(t.getByTestId("profile-card__details")).toHaveTextContent("john.doe@gmail.com"),n.click(t.getByTestId("profile-card__logout-button"))}},o={args:{...r,name:"",email:""},play:async({canvas:t})=>{await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./),await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./)}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const S=["WithData","Loading"];export{o as Loading,e as WithData,S as __namedExportsOrder,O as default};
