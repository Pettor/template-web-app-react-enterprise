import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-intl-DgDut_7x.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./button-DFb1jVee.js";import{n as o,t as s}from"./card-BN2zayTP.js";import{n as c,t as l}from"./chip-DZUzv3DH.js";import{n as u,t as d}from"./modal-CRHHSlwc.js";import{n as f,t as p}from"./ConfettiBurst-CRTPKP8b.js";function m(e){return{animationDelay:`${150+e*90}ms`}}function h({emoji:e,title:t,description:n}){return(0,v.jsx)(s,{className:`from-accent/15 to-success/10 border-accent/30 border bg-linear-to-br ${y}`,style:m(0),children:(0,v.jsxs)(s.Content,{className:`flex flex-row items-center gap-4`,children:[(0,v.jsx)(`span`,{"aria-hidden":!0,className:`bg-accent/15 flex size-14 shrink-0 items-center justify-center rounded-2xl text-3xl motion-safe:animate-[bounce_1s_ease-in-out_2]`,children:e}),(0,v.jsxs)(`div`,{className:`flex min-w-0 flex-col gap-1`,children:[(0,v.jsx)(s.Title,{className:`text-base font-semibold`,children:t}),(0,v.jsx)(s.Description,{children:n})]})]})})}function g({emoji:e,title:t,description:n,index:r}){return(0,v.jsxs)(`li`,{className:`group flex gap-3 ${y}`,style:m(r),children:[(0,v.jsx)(`span`,{"aria-hidden":!0,className:`bg-default flex size-10 shrink-0 items-center justify-center rounded-xl text-xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`,children:e}),(0,v.jsxs)(`div`,{className:`flex min-w-0 flex-col`,children:[(0,v.jsx)(`span`,{className:`text-foreground text-sm font-semibold`,children:t}),(0,v.jsx)(`span`,{className:`text-muted text-sm`,children:n})]})]})}function _({isOpen:e,appName:n,releases:r,onClose:i}){let o=t(),[s]=r;return(0,v.jsx)(d,{isOpen:e,onOpenChange:e=>!e&&i(),children:(0,v.jsx)(d.Backdrop,{variant:`blur`,children:(0,v.jsx)(d.Container,{size:`md`,scroll:`inside`,children:(0,v.jsxs)(d.Dialog,{"data-testid":`whats-new`,"aria-label":o.formatMessage({description:`WhatsNewDialog - aria-label for the dialog`,defaultMessage:`What's new`,id:`6Y65zk`}),children:[(0,v.jsx)(d.CloseTrigger,{}),(0,v.jsxs)(d.Header,{className:`from-accent/25 via-warning/15 to-success/20 relative items-center overflow-hidden rounded-3xl bg-linear-to-br px-6 py-8 text-center`,children:[(0,v.jsx)(p,{active:e}),(0,v.jsx)(`span`,{"aria-hidden":!0,className:`text-5xl motion-safe:animate-bounce`,children:`🎉`}),(0,v.jsx)(d.Heading,{className:`text-foreground text-2xl font-bold`,children:o.formatMessage({description:`WhatsNewDialog - heading`,defaultMessage:`What's new in {appName}`,id:`wpUdf0`},{appName:n})}),s&&(0,v.jsx)(`p`,{className:`text-foreground/80 text-sm font-medium`,children:s.tagline}),r.length>1&&(0,v.jsx)(l,{size:`sm`,variant:`soft`,color:`warning`,children:o.formatMessage({description:`WhatsNewDialog - badge when the user skipped several releases`,defaultMessage:`🍿 {count} releases to catch up on`,id:`lUnzgC`},{count:r.length})})]}),(0,v.jsx)(d.Body,{tabIndex:0,className:`focus-visible:ring-accent flex flex-col gap-8 rounded-xl outline-none focus-visible:ring-2`,children:r.map((e,t)=>{let n=t===0,r=n?e.highlights[0]:void 0,i=n?e.highlights.slice(1):e.highlights;return(0,v.jsxs)(`section`,{"data-testid":`whats-new__release-${e.version}`,className:`flex flex-col gap-4`,children:[(0,v.jsxs)(`div`,{className:`flex flex-wrap items-center gap-2`,children:[(0,v.jsx)(l,{size:`sm`,variant:`soft`,color:`accent`,children:o.formatMessage({description:`WhatsNewDialog - version label above a release's notes`,defaultMessage:`Version {version}`,id:`fFBFA3`},{version:e.version})}),n?(0,v.jsx)(l,{size:`sm`,variant:`soft`,color:`success`,children:o.formatMessage({description:`WhatsNewDialog - label marking the newest release`,defaultMessage:`✨ Brand new`,id:`6jgJY/`})}):(0,v.jsx)(`span`,{className:`text-foreground text-sm font-semibold`,children:e.tagline})]}),r&&(0,v.jsx)(h,{...r}),i.length>0&&(0,v.jsx)(`ul`,{className:`flex flex-col gap-4`,children:i.map((e,t)=>(0,v.jsx)(g,{...e,index:t+1},e.title))}),e.fixes.length>0&&(0,v.jsxs)(`div`,{className:`flex flex-col gap-3`,children:[(0,v.jsx)(`h3`,{className:`text-muted text-xs font-medium tracking-wide uppercase`,children:o.formatMessage({description:`WhatsNewDialog - heading above the list of fixed bugs`,defaultMessage:`🐛 Bugs squashed`,id:`KAcMYs`})}),(0,v.jsx)(`ul`,{className:`flex flex-col gap-4`,children:e.fixes.map((e,t)=>(0,v.jsx)(g,{...e,index:i.length+t+1},e.title))})]})]},e.version)})}),(0,v.jsx)(d.Footer,{children:(0,v.jsx)(a,{variant:`primary`,className:`w-full sm:w-auto`,onPress:i,"data-testid":`whats-new__close`,children:o.formatMessage({description:`WhatsNewDialog - button that closes the dialog`,defaultMessage:`Let's go! 🚀`,id:`7G5r47`})})})]})})})})}var v,y;function b(){return(b=e((()=>{i(),o(),c(),u(),n(),f(),v=r(),y=`animate-in fade-in slide-in-from-bottom-3 fill-mode-both duration-500 motion-reduce:animate-none`,_.__docgenInfo={description:``,methods:[],displayName:`WhatsNewDialog`,props:{isOpen:{required:!0,tsType:{name:`boolean`},description:``},appName:{required:!0,tsType:{name:`string`},description:``},releases:{required:!0,tsType:{name:`Array`,elements:[{name:`WhatsNewRelease`}],raw:`WhatsNewRelease[]`},description:`Newest first.`},onClose:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}})))()}var x,S,C,w,T,E,D,O,k,A,j,M;function N(){return(N=e((()=>{b(),{expect:x,fn:S,within:C}=__STORYBOOK_MODULE_TEST__,w={component:_,title:`Feedback/Whats New Dialog`,tags:[`autodocs`],parameters:{layout:`fullscreen`}},T={version:`0.8.0`,tagline:`Everything at your fingertips`,highlights:[{emoji:`⚡`,title:`Ctrl+K superpowers`,description:`Press ⌘K or Ctrl+K anywhere to jump between pages, flip the theme or log out.`},{emoji:`📊`,title:`A dashboard that dazzles`,description:`KPIs, revenue charts, gauges and recent transactions, all on one shiny page.`},{emoji:`🌗`,title:`Light, dark or follow your system`,description:`Pick the mood that suits you. We'll remember it for next time.`}],fixes:[{emoji:`📱`,title:`Comfier on phones`,description:`The menu slides in as a drawer and settings scroll as one list on small screens.`}]},E={version:`0.7.0`,tagline:`Settings, sorted`,highlights:[{emoji:`⚙️`,title:`Settings, all in one place`,description:`Your account, the look of the app and version details now live together in one tidy window.`}],fixes:[]},D={isOpen:!0,appName:`Web App`,releases:[T],onClose:S()},O={args:D,play:async({args:e})=>{let t=C(document.body);await x(await t.findByText(`What's new in Web App`)).toBeInTheDocument(),await x(t.getByText(`Everything at your fingertips`)).toBeInTheDocument(),await x(t.getByText(`Version 0.8.0`)).toBeInTheDocument(),await x(t.getByText(`Ctrl+K superpowers`)).toBeInTheDocument(),await x(t.getByText(/Bugs squashed/)).toBeInTheDocument(),await x(t.queryByText(/releases to catch up on/)).toBeNull(),t.getByRole(`button`,{name:/Let's go/}).click(),await x(e.onClose).toHaveBeenCalled()}},k={args:{...D,releases:[T,E]},play:async()=>{let e=C(document.body);await x(await e.findByText(`Version 0.8.0`)).toBeInTheDocument(),await x(e.getByText(`Version 0.7.0`)).toBeInTheDocument(),await x(e.getByText(`Settings, sorted`)).toBeInTheDocument(),await x(e.getByText(/2 releases to catch up on/)).toBeInTheDocument()}},A={args:{...D,releases:[E]},play:async()=>{let e=C(document.body);await x(await e.findByText(`Settings, all in one place`)).toBeInTheDocument(),await x(e.queryByText(/Bugs squashed/)).toBeNull()}},j={args:{...D,releases:[T,E]},globals:{viewport:{value:`iphonex`}}},M=[`Default`,`SeveralVersions`,`HighlightsOnly`,`Phone`],O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    args
  }) => {
    const body = within(document.body);
    await expect(await body.findByText("What's new in Web App")).toBeInTheDocument();
    await expect(body.getByText("Everything at your fingertips")).toBeInTheDocument();
    await expect(body.getByText("Version 0.8.0")).toBeInTheDocument();
    await expect(body.getByText("Ctrl+K superpowers")).toBeInTheDocument();
    await expect(body.getByText(/Bugs squashed/)).toBeInTheDocument();
    await expect(body.queryByText(/releases to catch up on/)).toBeNull();
    body.getByRole("button", {
      name: /Let's go/
    }).click();
    await expect(args.onClose).toHaveBeenCalled();
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    releases: [latest, previous]
  },
  play: async () => {
    const body = within(document.body);
    await expect(await body.findByText("Version 0.8.0")).toBeInTheDocument();
    await expect(body.getByText("Version 0.7.0")).toBeInTheDocument();
    await expect(body.getByText("Settings, sorted")).toBeInTheDocument();
    await expect(body.getByText(/2 releases to catch up on/)).toBeInTheDocument();
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    releases: [previous]
  },
  play: async () => {
    const body = within(document.body);
    await expect(await body.findByText("Settings, all in one place")).toBeInTheDocument();
    await expect(body.queryByText(/Bugs squashed/)).toBeNull();
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    releases: [latest, previous]
  },
  globals: {
    viewport: {
      value: "iphonex"
    }
  }
}`,...j.parameters?.docs?.source}}}})))()}N();export{O as Default,A as HighlightsOnly,j as Phone,k as SeveralVersions,M as __namedExportsOrder,w as default};