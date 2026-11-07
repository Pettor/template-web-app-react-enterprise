import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-intl-DgDut_7x.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./button-DFb1jVee.js";import{f as o,i as s,p as c,t as l,u}from"./src-8qpjjsx2.js";function d(e,t){return[e.formatMessage({description:`PwaOfflineDialog: toast - ready to work offline`,defaultMessage:`Ready to work offline`,id:`Q9Hkx1`}),{onClose:t}]}var f,p,m,h,g,_;function v(){return(v=e((()=>{o(),i(),l(),n(),f=r(),{expect:p,within:m}=__STORYBOOK_MODULE_TEST__,h={title:`Feedback/PWA Offline`,decorators:[u,s]},g={render:()=>{let e=t();return(0,f.jsx)(a,{onPress:()=>{let[t,n]=d(e,()=>console.log(`onClose`));c(t,n)},children:`Show Toast`})},play:async({canvas:e,userEvent:t})=>{await t.click(e.getByRole(`button`,{name:`Show Toast`}));let n=m(document.body);await p(await n.findByText(/ready to work offline/i)).toBeInTheDocument()}},_=[`OfflineDialog`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const intl = useIntl();
    return <Button onPress={() => {
      const [msg, opts] = PwaOfflineDialogProps(intl, () => console.log("onClose"));
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
    await expect(await body.findByText(/ready to work offline/i)).toBeInTheDocument();
  }
}`,...g.parameters?.docs?.source}}}})))()}v();export{g as OfflineDialog,_ as __namedExportsOrder,h as default};