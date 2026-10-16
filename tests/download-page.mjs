import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const page = await readFile(resolve(root, 'src/pages/download.astro'), 'utf8');

assert.match(page, /COSMIC Live ISO/i, 'download page labels the experimental COSMIC live image');
assert.match(page, /experimental[^\n]*nightly|nightly[^\n]*experimental/i, 'COSMIC is clearly marked experimental and nightly-only');
assert.match(page, /cosmicLiveFile = \(arch: Arch\) => `agentux-cosmic-live-\$\{arch\}\.iso`/, 'COSMIC uses the published nightly filename for each architecture');
assert.match(page, /\$\{dl\}\/iso\/nightly\/\$\{cosmicLiveFile\(a\.arch\)\}/, 'COSMIC download points to the nightly channel');
assert.match(page, /href=\{`\$\{url\}\.sha256`\}/, 'COSMIC download exposes its SHA-256 sidecar');
assert.doesNotMatch(page, /iso\/stable\/agentux-cosmic-live/, 'COSMIC is not represented as a stable ISO');
