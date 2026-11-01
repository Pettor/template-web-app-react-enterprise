import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-intl-DgDut_7x.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{a as i,i as a,n as o,t as s}from"./AppData-d0JGw1Pk.js";import{n as c,t as l}from"./SyncStatusCard-CUjXc9Iy.js";import{n as u,t as d}from"./NavbarLayoutDecorator-B6qEgF_M.js";function f({notes:e,syncStatus:n}){let r=t();return(0,p.jsxs)(`div`,{className:`mx-auto flex w-full max-w-3xl flex-col gap-6 py-6`,children:[(0,p.jsxs)(`div`,{className:`flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end`,children:[(0,p.jsxs)(`div`,{className:`flex flex-col gap-1`,children:[(0,p.jsx)(`h1`,{className:`from-accent to-danger bg-gradient-to-r bg-clip-text text-2xl font-bold tracking-tight text-transparent md:text-3xl`,children:r.formatMessage({description:`NotesView: heading - page title`,defaultMessage:`Notes`,id:`Twat7D`})}),(0,p.jsx)(`p`,{className:`text-default-500 text-sm`,children:r.formatMessage({description:`NotesView: body - page subtitle`,defaultMessage:`A small example of local-first data you can sync to a folder or GitHub.`,id:`hW4Vbr`})})]}),(0,p.jsx)(`div`,{className:`w-full sm:w-64`,children:(0,p.jsx)(l,{...n})})]}),(0,p.jsx)(a,{...e})]})}var p;function m(){return(m=e((()=>{n(),c(),i(),p=r(),f.__docgenInfo={description:``,methods:[],displayName:`NotesView`,props:{notes:{required:!0,tsType:{name:`NotesPanelProps`},description:``},syncStatus:{required:!0,tsType:{name:`SyncStatusCardProps`},description:``}}}})))()}var h,g,_,v,y,b,x,S,C;function w(){return(w=e((()=>{m(),o(),u(),{expect:h,fn:g}=__STORYBOOK_MODULE_TEST__,_=Date.parse(`2026-10-21T10:00:00Z`),v={component:f,title:`Views/Notes`,tags:[`autodocs`],decorators:[d()],parameters:{layout:`fullscreen`}},y={notes:{notes:[s({title:`Plan the launch`,body:`Draft the announcement.`},new Date(_),`N1`),s({title:`Book the venue`},new Date(_-36e5),`N2`)],onAdd:g(),onTogglePinned:g(),onArchive:g()},syncStatus:{now:_,status:{state:`synced`,method:`github`,folderName:`you/app-data`,lastSyncedAt:`2026-10-21T09:58:00Z`},onPress:g()}},b={args:y,play:async({args:e,canvas:t,userEvent:n})=>{await n.click(t.getByTestId(`sync-status`)),await h(e.syncStatus.onPress).toHaveBeenCalled()}},x={args:{...y,notes:{...y.notes,notes:[]},syncStatus:{...y.syncStatus,status:{state:`local`,method:`local`}}}},S={args:y,globals:{viewport:{value:`iphonex`}}},C=[`Default`,`LocalOnly`,`Phone`],b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    args,
    canvas,
    userEvent
  }) => {
    await userEvent.click(canvas.getByTestId("sync-status"));
    await expect(args.syncStatus.onPress).toHaveBeenCalled();
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    notes: {
      ...defaultArgs.notes,
      notes: []
    },
    syncStatus: {
      ...defaultArgs.syncStatus,
      status: {
        state: "local",
        method: "local"
      }
    }
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  globals: {
    viewport: {
      value: "iphonex"
    }
  }
}`,...S.parameters?.docs?.source}}}})))()}w();export{b as Default,x as LocalOnly,S as Phone,C as __namedExportsOrder,v as default};