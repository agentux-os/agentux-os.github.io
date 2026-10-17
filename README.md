# agentuxos.org

<p>
  <a href="https://github.com/agentux-os/agentux-os.github.io/actions/workflows/pages.yml"><img alt="Pages build" src="https://img.shields.io/github/actions/workflow/status/agentux-os/agentux-os.github.io/pages.yml?branch=main&label=pages&logo=github&labelColor=0b0d10"></a>
  <a href="https://github.com/agentux-os/agentux-os.github.io/commits/main"><img alt="Last commit" src="https://img.shields.io/github/last-commit/agentux-os/agentux-os.github.io?label=updated&labelColor=0b0d10&color=4f7d0b"></a>
  <a href="https://agentuxos.org"><img alt="Website" src="https://img.shields.io/website?url=https%3A%2F%2Fagentuxos.org&label=live%20site&labelColor=0b0d10&color=c6f36b"></a>
</p>

The source of [agentuxos.org](https://agentuxos.org), the AgentUX website: a static [Astro](https://astro.build) site, deployed to GitHub Pages by [`.github/workflows/pages.yml`](.github/workflows/pages.yml) on every push to `main`. Pull requests run the same build as a check.

The download page reads the published AgentUX release metadata at runtime, so its release, ISO and image links update without editing this README or the site for every new release.

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
