import{a as m}from"./DocumentationLayout-DbnN6fMk.js";import"./iframe-l-KbKUdD.js";import{P as g}from"./ProfileCard-Bp-eJC95.js";import"./chunk-MW56SEHC-BJ__r44X.js";import"./useHover-DQt0fpzi.js";import"./index-CfTbfnnE.js";import"./chunk-OEE6MISH-CHnETqnH.js";import"./chunk-6VC6TS2O-T1o_L9x_.js";import"./proxy-DYEZCZ3C.js";import"./chunk-RJKRL3AU-CjtrMR1U.js";import"./chunk-R6AK6OQ4-dS-jQ6Pb.js";import"./chunk-GQT3YUX3-FQ1U8E7v.js";import"./index-voa9g86k.js";import"./useControlledState-DIvXEQmI.js";import"./useLabel-CmyMWPZJ.js";import"./useLabels-DeQbWYR4.js";import"./index-DVMxDq5w.js";import"./FocusScope-DBHCH-Lz.js";import"./usePress-Js_s7BlH.js";import"./chunk-IHO36JMK-BPKK0Fdl.js";import"./InformationCircleIcon-BZKaG05u.js";import"./chunk-AWMMSYR4-f-k0E6Jg.js";const u={name:"John Doe",email:"john.doe@gmail.com",onAbout:()=>console.log("onAbout"),onLogout:()=>console.log("onLogout")},{expect:a}=__STORYBOOK_MODULE_TEST__,P={component:g,title:"Feedback/Profile/Card",decorators:[m],tags:["autodocs"]},c={...u},e={args:c,parameters:{viewport:{value:"full"}},play:async({canvas:t,userEvent:d})=>{await a(t.getByTestId("profile-card__details")).toHaveTextContent("John Doe"),await a(t.getByTestId("profile-card__details")).toHaveTextContent("john.doe@gmail.com"),d.click(t.getByTestId("profile-card__logout-button"))}},o={args:{...c,name:"",email:""},play:async({canvas:t})=>{await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./),await a(t.getByTestId("profile-card__details")).not.toHaveTextContent(/./)}};var r,n,i;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
}`,...(l=(p=o.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};const N=["WithData","Loading"];export{o as Loading,e as WithData,N as __namedExportsOrder,P as default};
