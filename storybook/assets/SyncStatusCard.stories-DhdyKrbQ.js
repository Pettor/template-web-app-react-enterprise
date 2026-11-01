import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./SyncStatusCard-CUjXc9Iy.js";var i,a,o,s,c,l,u,d,f,p,m,h,g,_,v,y;function b(){return(b=e((()=>{n(),i=t(),{expect:a,fn:o}=__STORYBOOK_MODULE_TEST__,s=Date.parse(`2026-10-21T10:00:00Z`),c={component:r,title:`Display/Sync Status Card`,tags:[`autodocs`],decorators:[e=>(0,i.jsx)(`div`,{className:`w-64 p-4`,children:(0,i.jsx)(e,{})})]},l={now:s,status:{state:`synced`,method:`folder`,folderName:`app-data`,lastSyncedAt:`2026-10-21T09:55:00Z`},onPress:o()},u={args:l,play:async({canvas:e})=>{await a(e.getByText(`Synced 5 minutes ago`)).toBeVisible()}},d={args:{...l,status:{state:`synced`,method:`github`,folderName:`you/app-data`,lastSyncedAt:`2026-10-21T09:59:50Z`}}},f={args:{...l,status:{state:`local`,method:`local`}},play:async({canvas:e})=>{await a(e.getByText(`Only on this device`)).toBeVisible()}},p={args:{...l,status:{state:`syncing`,method:`github`,folderName:`you/app-data`}}},m={args:{...l,status:{state:`synced`,method:`github`,folderName:`you/app-data`,lastSyncedAt:`2026-10-21T09:58:00Z`,hasPendingChanges:!0}}},h={args:{...l,status:{state:`needs-permission`,method:`folder`,folderName:`app-data`}}},g={args:{...l,status:{state:`error`,method:`github`,folderName:`you/app-data`,error:`Bad credentials`}},play:async({canvas:e})=>{await a(e.getByText(`Sync problem`)).toBeVisible(),await a(e.getByText(`Bad credentials`)).toBeVisible()}},_={args:{...l,variant:`icon`},play:async({canvas:e})=>{await a(e.getByRole(`button`,{name:`Synced 5 minutes ago. app-data`})).toBeVisible()}},v={args:l,play:async({args:e,canvas:t,userEvent:n})=>{await n.click(t.getByTestId(`sync-status`)),await a(e.onPress).toHaveBeenCalled()}},y=[`Synced`,`SyncedJustNow`,`LocalOnly`,`Syncing`,`PendingChanges`,`NeedsPermission`,`SyncError`,`Icon`,`OpensSettings`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas
  }) => {
    await expect(canvas.getByText("Synced 5 minutes ago")).toBeVisible();
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    status: {
      state: "synced",
      method: "github",
      folderName: "you/app-data",
      lastSyncedAt: "2026-10-21T09:59:50Z"
    }
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    status: {
      state: "local",
      method: "local"
    }
  },
  play: async ({
    canvas
  }) => {
    await expect(canvas.getByText("Only on this device")).toBeVisible();
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    status: {
      state: "syncing",
      method: "github",
      folderName: "you/app-data"
    }
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    status: {
      state: "synced",
      method: "github",
      folderName: "you/app-data",
      lastSyncedAt: "2026-10-21T09:58:00Z",
      hasPendingChanges: true
    }
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    status: {
      state: "needs-permission",
      method: "folder",
      folderName: "app-data"
    }
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    status: {
      state: "error",
      method: "github",
      folderName: "you/app-data",
      error: "Bad credentials"
    }
  },
  play: async ({
    canvas
  }) => {
    await expect(canvas.getByText("Sync problem")).toBeVisible();
    await expect(canvas.getByText("Bad credentials")).toBeVisible();
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    variant: "icon"
  },
  play: async ({
    canvas
  }) => {
    await expect(canvas.getByRole("button", {
      name: "Synced 5 minutes ago. app-data"
    })).toBeVisible();
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    args,
    canvas,
    userEvent
  }) => {
    await userEvent.click(canvas.getByTestId("sync-status"));
    await expect(args.onPress).toHaveBeenCalled();
  }
}`,...v.parameters?.docs?.source}}}})))()}b();export{_ as Icon,f as LocalOnly,h as NeedsPermission,v as OpensSettings,m as PendingChanges,g as SyncError,u as Synced,d as SyncedJustNow,p as Syncing,y as __namedExportsOrder,c as default};