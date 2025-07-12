import{b as m}from"./DocumentationLayout-m7qcJ0CK.js";import"./iframe-Cj451IFH.js";import{P as g}from"./ProfileCard-Bumsn4oJ.js";import"./chunk-JGY6VQQQ-CYi9Dj_J.js";import"./index-Y3gkNNaS.js";import"./index-C20t4iya.js";import"./chunk-GQT3YUX3-CKqljVT0.js";import"./chunk-BDGLNRCW-DWt2PDLm.js";import"./index-B-lMoGX-.js";import"./chunk-RJKRL3AU-CjtrMR1U.js";import"./proxy-D7qYYB_i.js";import"./chunk-O24IAYCG-4tKg9AWo.js";import"./chunk-6VC6TS2O-DP38dvAN.js";import"./chunk-S574QCAN-CKMfooDI.js";import"./index-DDR2dLiz.js";import"./useLabel-Cfdy64vw.js";import"./useLabels-l74sfIZ-.js";import"./index-Bot_f27w.js";import"./FocusScope-C3zRj5zy.js";import"./useControlledState-BsRy6MkK.js";import"./chunk-IHO36JMK-BkUzqfzX.js";import"./InformationCircleIcon-_h-G6r1G.js";import"./chunk-AWMMSYR4-Dzbntfm7.js";const u={name:"John Doe",email:"john.doe@gmail.com",onAbout:()=>console.log("onAbout"),onLogout:()=>console.log("onLogout")},{expect:a}=__STORYBOOK_MODULE_TEST__,N={component:g,title:"Feedback/Profile/Card",decorators:[m],tags:["autodocs"]},c={...u},e={args:c,parameters:{viewport:{value:"full"}},play:async({canvas:t,userEvent:d})=>{await a(t.getByTestId("profile-card__details")).toHaveTextContent("John Doe"),await a(t.getByTestId("profile-card__details")).toHaveTextContent("john.doe@gmail.com"),d.click(t.getByTestId("profile-card__logout-button"))}},o={args:{...c,name:"",email:""},play:async({canvas:t})=>{await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./),await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./)}};var r,n,i;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
