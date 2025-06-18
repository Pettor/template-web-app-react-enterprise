import{a as f}from"./DocumentationLayout-B8C3khKL.js";import"./iframe-AX-ZHRPq.js";import{P as b}from"./ProfileCard-iPqUPMGQ.js";import"./chunk-MW56SEHC-OXtVZdTl.js";import"./chunk-3HKZRFKK-BUq3PZP3.js";import"./index-SOlPy6ph.js";import"./chunk-OEE6MISH-iYYuBCZd.js";import"./chunk-6VC6TS2O-DSZcp7nF.js";import"./proxy-CpOrQZxw.js";import"./chunk-RJKRL3AU-CjtrMR1U.js";import"./chunk-R6AK6OQ4-DMfExj23.js";import"./chunk-GQT3YUX3-FQ1U8E7v.js";import"./index-ejUXTslw.js";import"./useLabel-RkN2cl25.js";import"./useLabels-B3_heUOs.js";import"./index-DD9tcz9C.js";import"./FocusScope-sYJwysp0.js";import"./useControlledState-DceTrbrl.js";import"./chunk-IHO36JMK-BVmgnnO3.js";import"./InformationCircleIcon-DHuA5slM.js";import"./chunk-AWMMSYR4-D7Oz3SW6.js";function t(){var e="/home/runner/work/template-web-app-react-enterprise/template-web-app-react-enterprise/apps/web/src/storybook/data/AppSessionData.ts",s="444615c567e4d0a2dd29b77b84a02240a7ca3917",i=window,p="__coverage__",v={path:"/home/runner/work/template-web-app-react-enterprise/template-web-app-react-enterprise/apps/web/src/storybook/data/AppSessionData.ts",statementMap:{0:{start:{line:1,column:30},end:{line:6,column:1}},1:{start:{line:4,column:17},end:{line:4,column:39}},2:{start:{line:5,column:18},end:{line:5,column:41}}},fnMap:{0:{name:"(anonymous_0)",decl:{start:{line:4,column:11},end:{line:4,column:12}},loc:{start:{line:4,column:17},end:{line:4,column:39}},line:4},1:{name:"(anonymous_1)",decl:{start:{line:5,column:12},end:{line:5,column:13}},loc:{start:{line:5,column:18},end:{line:5,column:41}},line:5}},branchMap:{},s:{0:0,1:0,2:0},f:{0:0,1:0},b:{},inputSourceMap:{version:3,file:null,sources:["/home/runner/work/template-web-app-react-enterprise/template-web-app-react-enterprise/apps/web/src/storybook/data/AppSessionData.ts"],names:[],mappings:"AAEO,aAAM,iBAAqC;AAAA,EAChD,MAAM;AAAA,EACN,OAAO;AAAA,EACP,SAAS,MAAM,QAAQ,IAAI,SAAS;AAAA,EACpC,UAAU,MAAM,QAAQ,IAAI,UAAU;AACxC;"},_coverageSchema:"1a1c01bbd47fc00a2c39e90264f33305004495a9",hash:"444615c567e4d0a2dd29b77b84a02240a7ca3917"},a=i[p]||(i[p]={});(!a[e]||a[e].hash!==s)&&(a[e]=v);var c=a[e];return t=function(){return c},c}t();const w=(t().s[0]++,{name:"John Doe",email:"john.doe@gmail.com",onAbout:()=>(t().f[0]++,t().s[1]++,console.log("onAbout")),onLogout:()=>(t().f[1]++,t().s[2]++,console.log("onLogout"))}),{expect:r}=__STORYBOOK_MODULE_TEST__,V={component:b,title:"Feedback/Profile/Card",decorators:[f],tags:["autodocs"]},_={...w},o={args:_,parameters:{viewport:{defaultViewport:"full"}},play:async({canvas:e,userEvent:s})=>{await r(e.getByTestId("profile-card__name-text")).toHaveTextContent("John Doe"),await r(e.getByTestId("profile-card__email-text")).toHaveTextContent("john.doe@gmail.com"),s.click(e.getByTestId("profile-card__logout-button"))}},n={args:{..._,name:"",email:""},play:async({canvas:e})=>{await r(e.getByTestId("profile-card__name-text")).not.toHaveTextContent(/./),await r(e.getByTestId("profile-card__email-text")).not.toHaveTextContent(/./)}};var l,m,d;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: defaultArgs,
  parameters: {
    viewport: {
      defaultViewport: "full"
    }
  },
  play: async ({
    canvas,
    userEvent
  }) => {
    // No text should be visible during loading
    await expect(canvas.getByTestId("profile-card__name-text")).toHaveTextContent("John Doe");
    await expect(canvas.getByTestId("profile-card__email-text")).toHaveTextContent("john.doe@gmail.com");
    userEvent.click(canvas.getByTestId("profile-card__logout-button"));
  }
}`,...(d=(m=o.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var A,u,g;n.parameters={...n.parameters,docs:{...(A=n.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    name: "",
    email: ""
  },
  play: async ({
    canvas
  }) => {
    // No text should be visible during loading
    await expect(canvas.getByTestId("profile-card__name-text")).not.toHaveTextContent(/./);
    await expect(canvas.getByTestId("profile-card__email-text")).not.toHaveTextContent(/./);
  }
}`,...(g=(u=n.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};const W=["WithData","Loading"];export{n as Loading,o as WithData,W as __namedExportsOrder,V as default};
//# sourceMappingURL=ProfileCard.stories-dVAHKMaN.js.map
