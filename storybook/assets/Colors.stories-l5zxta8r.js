import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-DCluhXK3.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{a as r,n as i,r as a,t as o}from"./card-DOnfDHQ8.js";import{n as s,o as c,t as l}from"./src-jqeclvhF.js";function u(e){let t=getComputedStyle(e).backgroundColor,n=document.createElement(`canvas`);n.width=1,n.height=1;let r=n.getContext(`2d`);if(!r)return`black`;r.fillStyle=getComputedStyle(document.documentElement).getPropertyValue(`--background`).trim()||`#ffffff`,r.fillRect(0,0,1,1),r.fillStyle=t,r.fillRect(0,0,1,1);let{data:i}=r.getImageData(0,0,1,1),a=i[0]??0,o=i[1]??0,s=i[2]??0;return(.2126*a+.7152*o+.0722*s)/255>.5?`black`:`white`}function d({title:e,children:t}){return(0,h.jsxs)(`div`,{children:[(0,h.jsx)(`p`,{className:`text-xl font-medium`,children:e}),(0,h.jsx)(`div`,{className:`h-2`}),(0,h.jsx)(`div`,{className:`flex h-full w-full flex-row flex-wrap items-center justify-start px-4 py-1`,children:t})]})}function f({text:e,bgColor:t}){let n=(0,m.useRef)(null),[r,i]=(0,m.useState)(`black`);return(0,m.useEffect)(()=>{function e(){n.current&&i(u(n.current))}e();let t=new MutationObserver(e);return t.observe(document.documentElement,{attributes:!0,attributeFilter:[`class`,`data-theme`]}),()=>t.disconnect()},[t]),(0,h.jsx)(o,{variant:`secondary`,ref:n,className:`m-2 h-15 w-35 ${t}`,children:(0,h.jsx)(a,{className:`items-center justify-center truncate text-xs`,style:{color:r},children:e})})}function p(){return(0,h.jsxs)(s,{label:`Colors`,children:[(0,h.jsx)(`div`,{className:`h-8`}),(0,h.jsxs)(`div`,{className:`flex flex-col gap-4`,children:[(0,h.jsxs)(d,{title:`Base Colors`,children:[(0,h.jsx)(f,{text:`--white`,bgColor:`bg-[var(--white)]`}),(0,h.jsx)(f,{text:`--black`,bgColor:`bg-[var(--black)]`}),(0,h.jsx)(f,{text:`--snow`,bgColor:`bg-[var(--snow)]`}),(0,h.jsx)(f,{text:`--eclipse`,bgColor:`bg-[var(--eclipse)]`})]}),(0,h.jsxs)(d,{title:`Background & Surface`,children:[(0,h.jsx)(f,{text:`--background`,bgColor:`bg-background`}),(0,h.jsx)(f,{text:`--foreground`,bgColor:`bg-foreground`}),(0,h.jsx)(f,{text:`--surface`,bgColor:`bg-surface`}),(0,h.jsx)(f,{text:`--surface-foreground`,bgColor:`bg-surface-foreground`}),(0,h.jsx)(f,{text:`--overlay`,bgColor:`bg-overlay`}),(0,h.jsx)(f,{text:`--overlay-foreground`,bgColor:`bg-overlay-foreground`})]}),(0,h.jsxs)(d,{title:`Primary Colors`,children:[(0,h.jsx)(f,{text:`--accent`,bgColor:`bg-accent`}),(0,h.jsx)(f,{text:`--accent-foreground`,bgColor:`bg-accent-foreground`}),(0,h.jsx)(f,{text:`--accent-soft`,bgColor:`bg-accent-soft`}),(0,h.jsx)(f,{text:`--accent-soft-foreground`,bgColor:`bg-accent-soft-foreground`})]}),(0,h.jsxs)(d,{title:`Status Colors`,children:[(0,h.jsx)(f,{text:`--success`,bgColor:`bg-success`}),(0,h.jsx)(f,{text:`--success-foreground`,bgColor:`bg-success-foreground`}),(0,h.jsx)(f,{text:`--warning`,bgColor:`bg-warning`}),(0,h.jsx)(f,{text:`--warning-foreground`,bgColor:`bg-warning-foreground`}),(0,h.jsx)(f,{text:`--danger`,bgColor:`bg-danger`}),(0,h.jsx)(f,{text:`--danger-foreground`,bgColor:`bg-danger-foreground`})]}),(0,h.jsxs)(d,{title:`Form Field Colors`,children:[(0,h.jsx)(f,{text:`--field-background`,bgColor:`bg-field`}),(0,h.jsx)(f,{text:`--field-foreground`,bgColor:`bg-field-foreground`}),(0,h.jsx)(f,{text:`--field-placeholder`,bgColor:`bg-field-placeholder`}),(0,h.jsx)(f,{text:`--field-border`,bgColor:`bg-field-border`})]}),(0,h.jsxs)(d,{title:`Other Colors`,children:[(0,h.jsx)(f,{text:`--default`,bgColor:`bg-default`}),(0,h.jsx)(f,{text:`--default-foreground`,bgColor:`bg-default-foreground`}),(0,h.jsx)(f,{text:`--muted`,bgColor:`bg-muted`}),(0,h.jsx)(f,{text:`--border`,bgColor:`bg-border`}),(0,h.jsx)(f,{text:`--focus`,bgColor:`bg-focus`}),(0,h.jsx)(f,{text:`--link`,bgColor:`bg-link`}),(0,h.jsx)(f,{text:`--backdrop`,bgColor:`bg-[var(--backdrop)]`}),(0,h.jsx)(f,{text:`--scrollbar`,bgColor:`bg-[var(--scrollbar)]`})]})]})]})}var m,h,g,_;function v(){return(v=e((()=>{m=t(),i(),r(),l(),h=n(),g={title:`Design System/Colors`,tags:[`no-tests`],decorators:[c],parameters:{a11y:{test:`off`},layout:`fullscreen`}},p.__docgenInfo={description:``,methods:[],displayName:`Colors`},_=[`Colors`],p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`function Colors(): ReactElement {
  return <DocumentationLayout label="Colors">
      <div className="h-8" />
      <div className="flex flex-col gap-4">
        <ColorSection title="Base Colors">
          <ColorItem text="--white" bgColor="bg-[var(--white)]" />
          <ColorItem text="--black" bgColor="bg-[var(--black)]" />
          <ColorItem text="--snow" bgColor="bg-[var(--snow)]" />
          <ColorItem text="--eclipse" bgColor="bg-[var(--eclipse)]" />
        </ColorSection>
        <ColorSection title="Background & Surface">
          <ColorItem text="--background" bgColor="bg-background" />
          <ColorItem text="--foreground" bgColor="bg-foreground" />
          <ColorItem text="--surface" bgColor="bg-surface" />
          <ColorItem text="--surface-foreground" bgColor="bg-surface-foreground" />
          <ColorItem text="--overlay" bgColor="bg-overlay" />
          <ColorItem text="--overlay-foreground" bgColor="bg-overlay-foreground" />
        </ColorSection>
        <ColorSection title="Primary Colors">
          <ColorItem text="--accent" bgColor="bg-accent" />
          <ColorItem text="--accent-foreground" bgColor="bg-accent-foreground" />
          <ColorItem text="--accent-soft" bgColor="bg-accent-soft" />
          <ColorItem text="--accent-soft-foreground" bgColor="bg-accent-soft-foreground" />
        </ColorSection>
        <ColorSection title="Status Colors">
          <ColorItem text="--success" bgColor="bg-success" />
          <ColorItem text="--success-foreground" bgColor="bg-success-foreground" />
          <ColorItem text="--warning" bgColor="bg-warning" />
          <ColorItem text="--warning-foreground" bgColor="bg-warning-foreground" />
          <ColorItem text="--danger" bgColor="bg-danger" />
          <ColorItem text="--danger-foreground" bgColor="bg-danger-foreground" />
        </ColorSection>
        <ColorSection title="Form Field Colors">
          <ColorItem text="--field-background" bgColor="bg-field" />
          <ColorItem text="--field-foreground" bgColor="bg-field-foreground" />
          <ColorItem text="--field-placeholder" bgColor="bg-field-placeholder" />
          <ColorItem text="--field-border" bgColor="bg-field-border" />
        </ColorSection>
        <ColorSection title="Other Colors">
          <ColorItem text="--default" bgColor="bg-default" />
          <ColorItem text="--default-foreground" bgColor="bg-default-foreground" />
          <ColorItem text="--muted" bgColor="bg-muted" />
          <ColorItem text="--border" bgColor="bg-border" />
          <ColorItem text="--focus" bgColor="bg-focus" />
          <ColorItem text="--link" bgColor="bg-link" />
          <ColorItem text="--backdrop" bgColor="bg-[var(--backdrop)]" />
          <ColorItem text="--scrollbar" bgColor="bg-[var(--scrollbar)]" />
        </ColorSection>
      </div>
    </DocumentationLayout>;
}`,...p.parameters?.docs?.source}}}})))()}v();export{p as Colors,_ as __namedExportsOrder,g as default};