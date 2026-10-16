import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const page = await readFile(resolve(root, 'src/pages/download.astro'), 'utf8');

assert.match(page, /id="live-tab-cosmic"[\s\S]*?COSMIC[\s\S]*?Nightly/, 'download page labels the experimental COSMIC live tab');
assert.match(page, /experimental[^\n]*nightly|nightly[^\n]*experimental/i, 'COSMIC is clearly marked experimental and nightly-only');
assert.match(page, /cosmicLiveFile = \(arch: Arch\) => `agentux-cosmic-live-\$\{arch\}\.iso`/, 'COSMIC uses the published nightly filename for each architecture');
assert.match(page, /\$\{dl\}\/iso\/nightly\/\$\{cosmicLiveFile\(a\.arch\)\}/, 'COSMIC download points to the nightly channel');
assert.match(page, /href=\{`\$\{url\}\.sha256`\}/, 'COSMIC download exposes its SHA-256 sidecar');
assert.doesNotMatch(page, /iso\/stable\/agentux-cosmic-live/, 'COSMIC is not represented as a stable ISO');
assert.match(page, /role="tablist"/, 'live desktop choices are presented as an accessible tab list');
assert.match(page, /id="live-tab-plasma"[^>]*role="tab"[^>]*aria-controls="live-panel-plasma"[^>]*aria-selected="true"/, 'KDE Plasma is the initially selected live tab');
assert.match(page, /id="live-tab-cosmic"[^>]*role="tab"[^>]*aria-controls="live-panel-cosmic"[^>]*aria-selected="false"/, 'COSMIC is selectable from the live tabs');
assert.match(page, /id="live-panel-plasma"[^>]*role="tabpanel"[^>]*aria-labelledby="live-tab-plasma"/, 'KDE downloads belong to the KDE tab panel');
assert.match(page, /id="live-panel-cosmic"[^>]*role="tabpanel"[^>]*aria-labelledby="live-tab-cosmic"[^>]*hidden/, 'COSMIC downloads are initially hidden in their own tab panel');
assert.match(page, /ArrowRight|ArrowLeft/, 'live ISO tabs support keyboard arrow navigation');
