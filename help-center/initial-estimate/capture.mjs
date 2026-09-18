/**
 * Screenshot helper for the Initial Estimate help article draft.
 *
 * Uses a PERSISTENT Chromium profile, so you log in once by hand and every later
 * run reuses that session. No credentials are ever handled by the script.
 *
 *   node capture.mjs login                 open a window, wait for you to log in
 *   node capture.mjs url                   print the current page URL of the open session
 *   node capture.mjs shot <name> [url]     capture the full page (or the given url)
 *   node capture.mjs clip <name> <sel>     capture one element by CSS selector
 */
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const PROFILE = path.join(here, '.pw-profile');
const SHOTS = path.join(here, 'screenshots');
const START = 'https://sandbox.docusketch.com/portal-cc/projects';

const [, , mode, a, b] = process.argv;

const ctx = await chromium.launchPersistentContext(PROFILE, {
  headless: false,
  viewport: {
    width: Number(process.env.VW ?? 1440),
    height: Number(process.env.VH ?? 900),
  },
  deviceScaleFactor: 2,
  args: [`--window-size=${Number(process.env.VW ?? 1440) + 20},1000`],
});
const page = ctx.pages()[0] ?? (await ctx.newPage());

async function settle(ms = 1200) {
  await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(ms);
}

if (mode === 'login') {
  await page.goto(START, { waitUntil: 'domcontentloaded' });
  console.log('Window open. Log in, then leave it on any portal page.');

  // A single URL check is not enough: the portal briefly shows /projects before it
  // redirects to sign-in. Require the authenticated state to HOLD for several polls,
  // and require that no password field is on screen.
  const deadline = Date.now() + 600000;
  let stable = 0;
  while (Date.now() < deadline) {
    await page.waitForTimeout(2000);
    let ok = false;
    try {
      const url = page.url();
      const onPortal = /\/portal-cc\//.test(url) && !/sign-?in|log-?in|auth|callback/i.test(url);
      const hasPassword = await page.locator('input[type=password]').count().catch(() => 1);
      ok = onPortal && hasPassword === 0;
    } catch {
      ok = false;
    }
    stable = ok ? stable + 1 : 0;
    if (stable >= 4) break; // ~8 seconds of a steady authenticated page
  }

  if (stable >= 4) {
    await settle();
    console.log('Session stored. Current URL:', page.url());
  } else {
    console.log('Gave up waiting for login. Current URL:', page.url());
  }
  await ctx.close();
  process.exit(0);
}

if (mode === 'url') {
  console.log(page.url());
  await ctx.close();
  process.exit(0);
}

if (mode === 'eval') {
  if (b) await page.goto(b, { waitUntil: 'domcontentloaded' });
  await settle();
  const result = await page.evaluate(a);
  console.log(typeof result === 'string' ? result : JSON.stringify(result, null, 1));
  console.log('__URL__', page.url());
  await ctx.close();
  process.exit(0);
}

if (mode === 'run') {
  // Step runner: node capture.mjs run steps.json
  // Steps: {goto}, {click}, {clickText}, {wait}, {waitFor}, {shot}, {clip:{name,sel}}, {eval}, {scrollTo}
  const fs = await import('node:fs/promises');
  const steps = JSON.parse(await fs.readFile(a, 'utf8'));
  for (const [i, st] of steps.entries()) {
    const label = `${i + 1}/${steps.length} ${Object.keys(st)[0]}`;
    try {
      if (st.goto) { await page.goto(st.goto, { waitUntil: 'domcontentloaded' }); await settle(st.settle ?? 1500); }
      if (st.click) { await page.locator(st.click).first().click({ timeout: 15000 }); await settle(st.settle ?? 900); }
      if (st.clickText) { await page.getByText(st.clickText, { exact: false }).first().click({ timeout: 15000 }); await settle(st.settle ?? 900); }
      if (st.waitFor) { await page.locator(st.waitFor).first().waitFor({ state: 'visible', timeout: 20000 }); }
      if (st.wait) { await page.waitForTimeout(st.wait); }
      if (st.scrollTo) { await page.locator(st.scrollTo).first().scrollIntoViewIfNeeded(); await page.waitForTimeout(400); }
      if (st.eval) { console.log('   eval:', JSON.stringify(await page.evaluate(st.eval)).slice(0, 600)); }
      if (st.shot) { await page.screenshot({ path: path.join(SHOTS, `${st.shot}.png`), fullPage: !!st.fullPage }); }
      if (st.clip) { const el = page.locator(st.clip.sel).first(); await el.waitFor({ state: 'visible', timeout: 15000 }); await el.screenshot({ path: path.join(SHOTS, `${st.clip.name}.png`) }); }
      console.log('ok  ', label, st.shot || (st.clip && st.clip.name) || '');
    } catch (err) {
      console.log('FAIL', label, String(err).split('\n')[0].slice(0, 180));
      if (st.required !== false) { console.log('   url:', page.url()); }
    }
  }
  console.log('done. final url:', page.url());
  await ctx.close();
  process.exit(0);
}

if (mode === 'shot' || mode === 'clip') {
  const name = a;
  if (!name) throw new Error('name required');
  const target = mode === 'shot' ? b : null;
  if (target) {
    await page.goto(target, { waitUntil: 'domcontentloaded' });
  }
  await settle();
  const out = path.join(SHOTS, `${name}.png`);
  if (mode === 'clip') {
    const el = page.locator(b).first();
    await el.waitFor({ state: 'visible', timeout: 15000 });
    await el.screenshot({ path: out });
  } else {
    await page.screenshot({ path: out });
  }
  console.log('saved', out, '| url:', page.url());
  await ctx.close();
  process.exit(0);
}

console.log('Unknown mode. Use: login | url | shot <name> [url] | clip <name> <selector>');
await ctx.close();
