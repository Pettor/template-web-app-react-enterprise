import{n as e}from"./chunk-zsgVPwQN.js";import{n as t,r as n,t as r}from"./iframe-DoxRYFdJ.js";import{j as i,n as a,t as o}from"./dist-BZx8yPnd.js";import{r as s,s as c,t as l}from"./src-Bp5RcZhR.js";function u(e,t,n,r){return{title:e.formatMessage({description:`PwaUpdateDialog - Update available description`,defaultMessage:`A new version of {appName} is available`,id:`Dbak+i`},{appName:t}),color:`secondary`,endContent:(0,d.jsx)(i,{color:`primary`,size:`sm`,onPress:r,children:e.formatMessage({description:`PwaUpdateDialog - Update button`,defaultMessage:`Update`,id:`Blpjtp`})}),onClose:n}}var d,f=e((()=>{o(),d=n()})),p,m,h,g;e((()=>{o(),l(),r(),f(),p=n(),m={title:`Feedback/Progressive Web App`,decorators:[c,s]},h={render:()=>{let e=t();return(0,p.jsx)(i,{onPress:()=>a(u(e,`App`,()=>console.log(`onClose`),()=>console.log(`onUpdate`))),children:`Show Toast`})}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => {
    const intl = useIntl();
    return <Button onPress={() => addToast(PwaUpdateDialogProps(intl, "App", () => console.log("onClose"), () => console.log("onUpdate")))}>
        Show Toast
      </Button>;
  }
}`,...h.parameters?.docs?.source}}},g=[`UpdateDialog`]}))();export{h as UpdateDialog,g as __namedExportsOrder,m as default};