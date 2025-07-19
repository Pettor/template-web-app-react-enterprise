import{b as m}from"./DocumentationLayout-DNW0LLpC.js";import"./iframe-CP07UXYA.js";import{P as g}from"./ProfileCard-DSPiQvXO.js";import"./chunk-3HKZRFKK-D9HcyUdp.js";import"./index-PutobBQ8.js";import"./index-CLQTGGdB.js";import"./chunk-GQT3YUX3-Ypbj_P3N.js";import"./chunk-BDGLNRCW-B_RP-iNZ.js";import"./index-B0fZTFEe.js";import"./chunk-RJKRL3AU-CjtrMR1U.js";import"./proxy-DCpZ5o1A.js";import"./chunk-O24IAYCG-BTAMXfHQ.js";import"./chunk-6VC6TS2O-Ih3LBMgq.js";import"./chunk-S574QCAN-BHgXj3M6.js";import"./index-D5R_uiWV.js";import"./useLabel-DIBLPa-w.js";import"./useLabels-Dml9cxib.js";import"./index-CKk5TJbL.js";import"./FocusScope-PCsy0zZE.js";import"./useControlledState-iAtmbbWX.js";import"./chunk-IHO36JMK-BAgKxrP0.js";import"./InformationCircleIcon-DbQydC52.js";import"./chunk-AWMMSYR4-46igYdaX.js";const u={name:"John Doe",email:"john.doe@gmail.com",onAbout:()=>console.log("onAbout"),onLogout:()=>console.log("onLogout")},{expect:a}=__STORYBOOK_MODULE_TEST__,N={component:g,title:"Feedback/Profile/Card",decorators:[m],tags:["autodocs"]},c={...u},e={args:c,parameters:{viewport:{value:"full"}},play:async({canvas:t,userEvent:d})=>{await a(t.getByTestId("profile-card__details")).toHaveTextContent("John Doe"),await a(t.getByTestId("profile-card__details")).toHaveTextContent("john.doe@gmail.com"),d.click(t.getByTestId("profile-card__logout-button"))}},o={args:{...c,name:"",email:""},play:async({canvas:t})=>{await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./),await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./)}};var r,n,i;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
}`,...(i=(n=e.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};var s,p,l;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`{
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
}`,...(l=(p=o.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};const W=["WithData","Loading"];export{o as Loading,e as WithData,W as __namedExportsOrder,N as default};
