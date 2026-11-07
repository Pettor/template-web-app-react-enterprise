import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-intl-DgDut_7x.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./button-DFb1jVee.js";import{f as o,i as s,p as c,t as l,u}from"./src-8qpjjsx2.js";function d(e,t,n,r){return[e.formatMessage({description:`SyncOutdatedDialog: toast - a newer version of the app has synced, so this one paused syncing`,defaultMessage:`Sync paused: update {appName} to keep syncing`,id:`uhG3jP`},{appName:t}),{variant:`warning`,timeout:0,onClose:n,description:e.formatMessage({description:`SyncOutdatedDialog: toast - explains why syncing stopped and what Update does`,defaultMessage:`Another device synced with a newer version. Update to keep syncing; your changes stay here until then.`,id:`uZ8KMn`}),actionProps:{children:e.formatMessage({description:`SyncOutdatedDialog: button - load the newest version of the app`,defaultMessage:`Update`,id:`tv/aHl`}),onPress:r}}]}var f,p,m,h,g,_;function v(){return(v=e((()=>{i(),o(),l(),n(),f=r(),{expect:p,within:m}=__STORYBOOK_MODULE_TEST__,h={title:`Feedback/Sync Outdated`,tags:[`autodocs`],decorators:[u,s]},g={render:()=>{let e=t();return(0,f.jsx)(a,{onPress:()=>{let[t,n]=d(e,`App`,()=>console.log(`onClose`),()=>console.log(`onUpdate`));c(t,n)},children:`Show Toast`})},play:async({canvas:e,userEvent:t})=>{await t.click(e.getByRole(`button`,{name:`Show Toast`}));let n=m(document.body);await p(await n.findByText(/Sync paused: update App to keep syncing/i)).toBeInTheDocument(),await p(await n.findByRole(`button`,{name:/update/i})).toBeInTheDocument()}},_=[`OutdatedDialog`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const intl = useIntl();
    return <Button onPress={() => {
      const [msg, opts] = SyncOutdatedDialogProps(intl, "App", () => console.log("onClose"), () => console.log("onUpdate"));
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
    await expect(await body.findByText(/Sync paused: update App to keep syncing/i)).toBeInTheDocument();
    await expect(await body.findByRole("button", {
      name: /update/i
    })).toBeInTheDocument();
  }
}`,...g.parameters?.docs?.source}}}})))()}v();export{g as OutdatedDialog,_ as __namedExportsOrder,h as default};