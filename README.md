# agentuxos.org

The source of [agentuxos.org](https://agentuxos.org), the AgentUX website: a static [Astro](https://astro.build) site, deployed to GitHub Pages by [`.github/workflows/pages.yml`](.github/workflows/pages.yml) on every push to `main`. Pull requests run the same build as a check.

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
```

- `src/pages/index.astro` is the home page, `src/pages/download.astro` the download page.
- The download page links the fixed release names in `https://download.agentuxos.org/iso/stable/` and, when it can, refines them from [`latest.json`](https://download.agentuxos.org/latest.json) in the browser (needs the bucket's CORS rule for `https://agentuxos.org`).
- `public/brand/` and `public/screenshots/` are copies of `brand/` and `docs/screenshots/` in [agentux](https://github.com/agentux-os/agentux); update them from there, don't edit them here.
- `public/CNAME` sets the custom domain.

## License

[Apache 2.0](LICENSE)
