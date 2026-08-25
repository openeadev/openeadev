# OpenEA.dev website

Static marketing site for **https://openea.dev**. It is intentionally built with plain HTML, CSS, and JavaScript so it can be hosted directly on GitHub Pages with no framework, package manager, or build step.

## Repository structure

```text
/
├── index.html
├── 404.html
├── CNAME
├── .nojekyll
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   └── img/
│       ├── favicon.svg
│       ├── openea-social.png
│       └── screenshots/
├── docs/
├── download/
├── releases/
└── community/
```

The future-path pages intentionally use `noindex` until they contain real content.

## Before publishing

### 1. Add the public GitHub and Try OpenEA URLs

Edit `assets/js/main.js`:

```js
const githubUrl = '#';
const tryUrl = '#try';
```

Replace `githubUrl` with the final public OpenEA repository URL. When a public demo, download, or preferred getting-started destination exists, replace `tryUrl` with that URL as well.

### 2. Add final OpenEA logo

The site currently uses a temporary blue `O` mark and `assets/img/favicon.svg`. Replace these after the final OpenEA identity is complete.

### 3. Add actual product screenshots

See `assets/img/screenshots/README.md`. The homepage currently displays intentional placeholders instead of fabricated product screenshots.

## GitHub Pages deployment

The simplest deployment is **Deploy from a branch**:

1. Create a repository for the website, such as `openea.dev` or `openea-site`.
2. Commit these files to the default branch.
3. Open **Repository Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose the default branch and `/ (root)`.
6. Save.
7. Under **Custom domain**, configure `openea.dev`.
8. Enable **Enforce HTTPS** once GitHub makes the option available.

`.nojekyll` is included so GitHub Pages serves the static files directly without Jekyll processing.

## DNS for openea.dev

For the apex domain, GitHub currently documents these IPv4 `A` records:

```text
@  A  185.199.108.153
@  A  185.199.109.153
@  A  185.199.110.153
@  A  185.199.111.153
```

GitHub also recommends configuring `www` when using an apex domain. After you know the GitHub user or organization that owns the Pages repository, configure:

```text
www  CNAME  USERNAME.github.io
```

or the corresponding organization Pages hostname.

Do not copy DNS values blindly if GitHub changes its Pages documentation later; verify against GitHub's current custom-domain documentation at deployment time.

## Local preview

From the repository root:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

Do not open `index.html` directly from the filesystem because root-relative asset paths such as `/assets/css/styles.css` are intended to be served over HTTP.

## Content direction

The homepage is designed around these OpenEA messages:

- Open-source enterprise architecture management.
- Repository-first architecture.
- Business context around technology.
- Deterministic, explainable analytics.
- Architecture findings, confidence/evidence, and Blast Radius.
- Self-hosted operation without a mandatory SaaS dependency.
- A modern alternative to commercial EA platforms.

The software license is mentioned farther down the page rather than in the hero, as intended.

## GitHub Pages repository paths

This site uses relative local asset and page links so it works in both GitHub Pages modes:

- User site: `https://openeadev.github.io/` from a repository named `openeadev.github.io`
- Project site: `https://openeadev.github.io/openeadev/` from a repository named `openeadev`
- Custom domain: `https://openea.dev/`

This avoids broken CSS/JavaScript when previewing the project site before the custom domain is active.
