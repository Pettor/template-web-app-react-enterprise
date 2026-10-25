import { chromium } from "@playwright/test";
const b = await chromium.launch();
for (const [w,h] of [[1440,900],[390,844]]) {
const p = await b.newPage({ viewport: { width: w, height: h } });
await p.goto(`http://localhost:9050/iframe.html?id=feedback-settings-modal--sync&viewMode=story`);
await p.waitForSelector(".modal__dialog"); await p.waitForTimeout(800);
await p.getByText("GitHub", { exact: true }).first().click().catch(()=>{}); await p.waitForTimeout(400);
console.log(w, await p.evaluate(() => { const d = document.querySelector(".modal__dialog"); return d.offsetWidth + "x" + d.offsetHeight; }));
await p.screenshot({ path: `${process.env.CLAUDE_JOB_DIR}/tmp/s${w}.png` });
}
await b.close();
