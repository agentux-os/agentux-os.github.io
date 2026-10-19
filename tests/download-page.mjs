import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const page = await readFile(resolve(root, 'src/pages/download.astro'), 'utf8');

assert.match(page, /const file = \(desktop: Desktop, kind: Kind, arch: Arch\) => `agentux-\$\{desktop\}-\$\{kind\}-\$\{arch\}\.iso`/, 'ISO names follow agentux-<desktop>-<live|installer>-<arch>.iso');
assert.match(page, /desktop: 'plasma'[\s\S]*desktop: 'cosmic'/, 'both desktops are offered, Plasma first');
assert.match(page, /\$\{dl\}\/iso\/stable\/\$\{file\(d\.desktop, k\.kind, a\.arch\)\}/, 'every download points to the stable channel');
assert.doesNotMatch(page, /iso\/nightly\/|experimental/i, 'COSMIC is released, not experimental or nightly-only');
assert.match(page, /href=\{`\$\{url\}\.sha256`\}/, 'every download exposes its SHA-256 sidecar');
assert.match(page, /data-iso=\{`\$\{d\.desktop\}-\$\{k\.kind\}-\$\{a\.arch\}`\}/, 'each download can be matched to its latest.json entry');
assert.match(page, /\(iso\.variant \|\| 'plasma'\) \+ '-' \+ iso\.kind \+ '-' \+ iso\.arch/, 'latest.json entries are matched by desktop, kind and architecture');
assert.match(page, /role="tablist"/, 'desktop choices are presented as an accessible tab list');
assert.match(page, /role="tab"[\s\S]*aria-controls=\{`panel-\$\{d\.desktop\}`\}[\s\S]*aria-selected=\{i === 0 \? 'true' : 'false'\}/, 'the first desktop tab starts selected and controls its panel');
assert.match(page, /role="tabpanel"[\s\S]*aria-labelledby=\{`tab-\$\{d\.desktop\}`\}[\s\S]*hidden=\{i !== 0\}/, 'other desktops start hidden in their own tab panel');
assert.match(page, /ArrowRight|ArrowLeft/, 'desktop tabs support keyboard arrow navigation');
