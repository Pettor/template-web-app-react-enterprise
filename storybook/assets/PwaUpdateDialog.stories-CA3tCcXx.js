import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-intl-DgDut_7x.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./button-DFb1jVee.js";import{f as o,i as s,p as c,t as l,u}from"./src-8qpjjsx2.js";function d(e,t,n,r){return[e.formatMessage({description:`PwaUpdateDialog: toast - update available`,defaultMessage:`A new version of {appName} is available`,id:`WMIsMz`},{appName:t}),{onClose:n,actionProps:{children:e.formatMessage({description:`PwaUpdateDialog: button - update`,defaultMessage:`Update`,id:`kaheVZ`}),onPress:r}}]}var f,p,m,h,g,_;function v(){return(v=e((()=>{i(),o(),l(),n(),f=r(),{expect:p,within:m}=__STORYBOOK_MODULE_TEST__,h={title:`Feedback/PWA Update`,decorators:[u,s]},g={render:()=>{let e=t();return(0,f.jsx)(a,{onPress:()=>{let[t,n]=d(e,`App`,()=>console.log(`onClose`),()=>console.log(`onUpdate`));c(t,n)},children:`Show Toast`})},play:async({canvas:e,userEvent:t})=>{await t.click(e.getByRole(`button`,{name:`Show Toast`}));let n=m(document.body);await p(await n.findByText(/A new version of App is available/i)).toBeInTheDocument(),await p(await n.findByRole(`button`,{name:/update/i})).toBeInTheDocument()}},_=[`UpdateDialog`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const intl = useIntl();
    return <Button onPress={() => {
      const [msg, opts] = PwaUpdateDialogProps(intl, "App", () => console.log("onClose"), () => console.log("onUpdate"));
      toast(msg, opts);
    }}>
        Show Toast
      </Button>;
  },
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.click(canvas.getByRole("button", {
      name: "Show Toast"
    }));
    const body = within(document.body);
    await expect(await body.findByText(/A new version of App is available/i)).toBeInTheDocument();
    await expect(await body.findByRole("button", {
      name: /update/i
    })).toBeInTheDocument();
  }
}`,...g.parameters?.docs?.source}}}})))()}v();export{g as UpdateDialog,_ as __namedExportsOrder,h as default};