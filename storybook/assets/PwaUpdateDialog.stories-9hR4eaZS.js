import{j as t,u as p}from"./iframe-oH_DC80A.js";import{C as i,T as d,c as l}from"./DocumentationLayout-DAgG1-ZX.js";import{b as a}from"./chunk-WBUKVQRU-D8fPY8qX.js";import"./chunk-3HKZRFKK-CI1EtVuS.js";import"./index-CQujp2HH.js";import"./index-gFDqmumT.js";import"./chunk-GQT3YUX3-DlgZpYdS.js";import"./chunk-BDGLNRCW-kbLzW4Gq.js";import"./index-BQ3rQu0T.js";import"./chunk-RJKRL3AU-CzlZidxD.js";import"./proxy-Saq8bX4Y.js";import"./chunk-O24IAYCG-CgsVN_sE.js";import"./chunk-6VC6TS2O-D8_K1fXx.js";function m(o,r,s,n){return{title:o.formatMessage({description:"PwaUpdateDialog - Update available description",defaultMessage:"A new version of {appName} is available",id:"Dbak+i"},{appName:r}),color:"secondary",endContent:t.jsx(a,{color:"primary",size:"sm",onPress:n,children:o.formatMessage({description:"PwaUpdateDialog - Update button",defaultMessage:"Update",id:"Blpjtp"})}),onClose:s}}const h={title:"Feedback/Progressive Web App",decorators:[i,d]},e={render:()=>{const o=p();return t.jsx(a,{onPress:()=>l(m(o,"App",()=>console.log("onClose"),()=>console.log("onUpdate"))),children:"Show Toast"})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: () => {
    const intl = useIntl();
    return <Button onPress={() => addToast(PwaUpdateDialogProps(intl, "App", () => console.log("onClose"), () => console.log("onUpdate")))}>
        Show Toast
      </Button>;
  }
}`,...e.parameters?.docs?.source}}};const v=["UpdateDialog"];export{e as UpdateDialog,v as __namedExportsOrder,h as default};
