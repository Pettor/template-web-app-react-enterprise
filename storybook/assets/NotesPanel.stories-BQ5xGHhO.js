import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{a as n,i as r,n as i,r as a,t as o}from"./AppData-d0JGw1Pk.js";var s,c,l,u,d,f,p,m,h,g,_;function v(){return(v=e((()=>{n(),i(),s=t(),{expect:c,fn:l}=__STORYBOOK_MODULE_TEST__,u=[a({notes:{N1:o({title:`Plan the launch`},new Date(`2026-10-20T08:00:00Z`),`N1`)}},`N1`,{pinned:!0},new Date(`2026-10-21T08:00:00Z`)).notes.N1,o({title:`Book the venue`,body:`Ask for the big room.
Check parking.`},new Date(`2026-10-21T09:00:00Z`),`N2`)],d={component:r,title:`Input/Notes Panel`,tags:[`autodocs`],decorators:[e=>(0,s.jsx)(`div`,{className:`max-w-xl p-4`,children:(0,s.jsx)(e,{})})]},f={notes:u,onAdd:l(),onTogglePinned:l(),onArchive:l()},p={args:f},m={args:{...f,notes:[]},play:async({canvas:e})=>{await c(e.getByTestId(`notes-panel__empty`)).toBeVisible()}},h={args:{...f,notes:[]},play:async({args:e,canvas:t,userEvent:n})=>{let r=t.getByTestId(`notes-panel__add`);await c(r).toBeDisabled(),await n.type(t.getByTestId(`notes-panel__title`),`Call the printer`),await n.type(t.getByTestId(`notes-panel__body`),`Before Friday`),await n.click(r),await c(e.onAdd).toHaveBeenCalledWith({title:`Call the printer`,body:`Before Friday`}),await c(t.getByTestId(`notes-panel__title`)).toHaveValue(``)}},g={args:f,play:async({args:e,canvas:t,userEvent:n})=>{await n.click(t.getByRole(`button`,{name:`Unpin Plan the launch`})),await c(e.onTogglePinned).toHaveBeenCalledWith(`N1`),await n.click(t.getByRole(`button`,{name:`Archive Book the venue`})),await c(e.onArchive).toHaveBeenCalledWith(`N2`)}},_=[`Default`,`Empty`,`AddsANote`,`PinsAndArchives`],p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    notes: []
  },
  play: async ({
    canvas
  }) => {
    await expect(canvas.getByTestId("notes-panel__empty")).toBeVisible();
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    notes: []
  },
  play: async ({
    args,
    canvas,
    userEvent
  }) => {
    const add = canvas.getByTestId("notes-panel__add");
    await expect(add).toBeDisabled();
    await userEvent.type(canvas.getByTestId("notes-panel__title"), "Call the printer");
    await userEvent.type(canvas.getByTestId("notes-panel__body"), "Before Friday");
    await userEvent.click(add);
    await expect(args.onAdd).toHaveBeenCalledWith({
      title: "Call the printer",
      body: "Before Friday"
    });
    await expect(canvas.getByTestId("notes-panel__title")).toHaveValue("");
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    args,
    canvas,
    userEvent
  }) => {
    await userEvent.click(canvas.getByRole("button", {
      name: "Unpin Plan the launch"
    }));
    await expect(args.onTogglePinned).toHaveBeenCalledWith("N1");
    await userEvent.click(canvas.getByRole("button", {
      name: "Archive Book the venue"
    }));
    await expect(args.onArchive).toHaveBeenCalledWith("N2");
  }
}`,...g.parameters?.docs?.source}}}})))()}v();export{h as AddsANote,p as Default,m as Empty,g as PinsAndArchives,_ as __namedExportsOrder,d as default};