# GitHub Pages Deployment Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish the reviewed WordsWave site from a public `OwenYWT/wordswave-web` repository to a persistent GitHub Pages URL with working clean routes, bilingual navigation, Logo, and Demo video.

**Architecture:** Preserve the existing root-based local and EdgeOne build, while adding a Pages-specific `/wordswave-web/` base. React Router receives that base as its basename, native public URLs use one shared helper, and a post-build script copies the generated application shell into every known route directory plus `404.html`. A two-job GitHub Actions workflow builds and deploys only the verified `dist` artifact.

**Tech Stack:** React 19, React Router 7, TypeScript 7, Vite 8, Vitest 4, Node.js 22, GitHub CLI, GitHub Actions, GitHub Pages

---

## File Structure

- Modify `src/App.tsx` — configure `BrowserRouter` for the Vite base path.
- Modify `src/config.ts` — provide one base-aware public URL helper and derived Logo, Demo, and workspace URLs.
- Modify `src/components/BrandMark.tsx` — consume the shared Logo URL.
- Modify `src/components/ProductVideo.tsx` — consume the shared Demo URL.
- Modify `src/routes/AppRoutes.tsx` — normalize trailing slashes before resolving document titles.
- Modify `src/App.test.tsx` — cover direct trailing-slash routes and correct titles.
- Create `src/config.test.ts` — cover root and GitHub Pages base-path URL generation.
- Modify `src/components/SiteHeader.test.tsx` — retain the root-build Logo assertion.
- Modify `src/components/ProductVideo.test.tsx` — retain the root-build Demo assertion.
- Modify `package.json` — add Pages build and post-build test commands.
- Create `scripts/prepare-pages.mjs` — generate route entry files from the Vite application shell.
- Create `scripts/prepare-pages.test.mjs` — test route artifact generation with Node's built-in test runner.
- Create `.github/workflows/deploy-pages.yml` — build and deploy GitHub Pages.
- Modify `README.md` — document the Pages URL and Pages-specific build.
- Modify `.gitignore` only where required — ignore all `.env.*` files except `.env.example`, preserve the EdgeOne block, and remove its trailing whitespace.

The brainstorming skill normally creates a dedicated worktree. This repository already contains the exact dirty working state the user reviewed and wants published, so execution remains on `feat/cad-agent-marketing-site`. The plan never stashes, discards, or broadly stages that state.

### Task 1: Secure and commit the reviewed website state

**Files:**
- Verify: all tracked history and current publication candidates
- Modify minimally: `/Users/wentao/CAD_Web/.gitignore`
- Commit explicitly: only the reviewed website paths listed below

- [ ] **Step 1: Confirm location, branch, remotes, and dirty inventory**

Run:

```bash
pwd
git branch --show-current
git remote -v
git status --porcelain=v1
git diff --check
```

Expected:

- directory is `/Users/wentao/CAD_Web`;
- branch is `feat/cad-agent-marketing-site`;
- no GitHub remote exists yet;
- every modified and untracked path is visible;
- `git diff --check` may identify only the known trailing whitespace at the end of `.gitignore`.

- [ ] **Step 2: Make the minimum required `.gitignore` correction**

Use `apply_patch` to preserve the existing content while making the environment section exactly:

```gitignore
# Tencent Cloud EdgeOne
.env
.env.*
!.env.example
.edgeone/*
.tef_dist/*
```

Expected: the existing `.gstack/`, `.superpowers/`, EdgeOne, and build-output rules remain present; the file ends with one newline and no trailing spaces.

- [ ] **Step 3: Verify sensitive local files remain ignored**

Run:

```bash
git check-ignore -q .edgeone/auth.json
git check-ignore -q .env
git check-ignore -q .env.production
test -z "$(git ls-files | rg '(^|/)\.env($|\.)' || true)"
```

Expected: all checks exit successfully and no `.env` path is tracked.

- [ ] **Step 4: Install a history-aware secret scanner if needed**

Run:

```bash
command -v gitleaks || brew install gitleaks
gitleaks version
```

Expected: `gitleaks` is available. If installation or execution fails, stop before any public push.

- [ ] **Step 5: Scan the full Git history and current directory without printing secret values**

Run:

```bash
gitleaks git . --redact --no-banner
gitleaks dir . --redact --no-banner
```

Expected: both commands exit with code 0 and report no findings. Any finding blocks staging until reviewed.

- [ ] **Step 6: Run the full existing verification suite**

Run:

```bash
npm test -- --run
npm run typecheck
npm run build
```

Expected: all 24 current tests pass, TypeScript exits 0, and the root-based Vite build succeeds.

- [ ] **Step 7: Stage only the reviewed current website state**

Run the following explicit allowlist, not `git add -A`:

```bash
git add \
  .gitignore \
  DESIGN.md \
  README.md \
  design-tokens.json \
  index.html \
  package-lock.json \
  package.json \
  public/media/wordswave-logo.jpg \
  public/media/wordswave-product-demo.mp4 \
  src/App.test.tsx \
  src/components/BrandMark.tsx \
  src/components/EvidenceGrid.tsx \
  src/components/ProductDemo.test.tsx \
  src/components/ProductDemo.tsx \
  src/components/ProductVideo.test.tsx \
  src/components/ProductVideo.tsx \
  src/components/SiteFooter.tsx \
  src/components/SiteHeader.test.tsx \
  src/components/SiteHeader.tsx \
  src/i18n/LanguageContext.tsx \
  src/i18n/__snapshots__/content.test.ts.snap \
  src/i18n/content.test.ts \
  src/i18n/content.ts \
  src/pages/ProductPage.tsx \
  src/styles/brandCrop.test.ts \
  src/styles/global.css \
  src/styles/headerBrandOffset.test.ts \
  src/styles/theme.css \
  src/styles/tokens.css \
  src/styles/typographyTokens.test.ts \
  src/test/setup.ts \
  docs/superpowers/plans/2026-07-25-header-brand-offset.md \
  docs/superpowers/plans/2026-07-25-header-brand-video-copy.md \
  docs/superpowers/plans/2026-07-28-edgeone-global-deployment.md
```

Expected: only paths in this allowlist are staged.

- [ ] **Step 8: Review the staged publication diff**

Run:

```bash
git status --short
git diff --cached --check
git diff --cached --stat
git diff --cached --name-status
```

Expected: no whitespace errors; every staged path belongs to the reviewed WordsWave website; no `.edgeone/`, `.env*`, `dist/`, temporary file, or unrelated user file is staged.

- [ ] **Step 9: Commit the reviewed website state**

Run:

```bash
git commit -m "feat: finalize WordsWave product website"
```

Expected: commit succeeds. Any path not in the explicit allowlist remains untouched.

### Task 2: Make routing and public media base-aware

**Files:**
- Modify: `/Users/wentao/CAD_Web/src/App.tsx`
- Modify: `/Users/wentao/CAD_Web/src/config.ts`
- Modify: `/Users/wentao/CAD_Web/src/components/BrandMark.tsx`
- Modify: `/Users/wentao/CAD_Web/src/components/ProductVideo.tsx`
- Modify: `/Users/wentao/CAD_Web/src/routes/AppRoutes.tsx`
- Modify: `/Users/wentao/CAD_Web/src/App.test.tsx`
- Create: `/Users/wentao/CAD_Web/src/config.test.ts`
- Verify: `/Users/wentao/CAD_Web/src/components/SiteHeader.test.tsx`
- Verify: `/Users/wentao/CAD_Web/src/components/ProductVideo.test.tsx`

- [ ] **Step 1: Write failing base-path and trailing-slash tests**

Create `src/config.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { publicUrl } from './config'

describe('publicUrl', () => {
  it('builds root-hosted public URLs', () => {
    expect(publicUrl('/media/wordswave-logo.jpg', '/')).toBe('/media/wordswave-logo.jpg')
  })

  it('builds GitHub Pages project URLs', () => {
    expect(publicUrl('/media/wordswave-logo.jpg', '/wordswave-web/')).toBe(
      '/wordswave-web/media/wordswave-logo.jpg',
    )
    expect(publicUrl('product', '/wordswave-web/')).toBe('/wordswave-web/product')
  })
})
```

Add to `src/App.test.tsx`:

```ts
it('uses the product title for a trailing-slash direct route', () => {
  renderRoute('/product/')
  expect(document.title).toBe('WordsWave — Product')
})
```

Use the exact existing English product title from `src/i18n/content.ts` if it differs.

- [ ] **Step 2: Run the focused tests and verify failure**

Run:

```bash
npm test -- --run src/config.test.ts src/App.test.tsx
```

Expected: FAIL because `publicUrl` does not exist and trailing-slash title normalization is absent.

- [ ] **Step 3: Implement the shared base-aware URL helper**

Replace `src/config.ts` with:

```ts
export function publicUrl(path: string, base = import.meta.env.BASE_URL) {
  const normalizedBase = base.endsWith('/') ? base : `${base}/`
  return `${normalizedBase}${path.replace(/^\/+/, '')}`
}

export const logoUrl = publicUrl('media/wordswave-logo.jpg')
export const productVideoUrl = publicUrl('media/wordswave-product-demo.mp4')
export const workspaceUrl =
  import.meta.env.VITE_WORKSPACE_URL?.trim() || publicUrl('product')
```

- [ ] **Step 4: Connect the helper to Router, Logo, and Demo**

Update `src/App.tsx`:

```tsx
const routerBasename =
  import.meta.env.BASE_URL === '/' ? undefined : import.meta.env.BASE_URL.replace(/\/+$/, '')

<BrowserRouter basename={routerBasename}>
  <AppRoutes />
</BrowserRouter>
```

Update `BrandMark.tsx` to import `logoUrl` and render:

```tsx
<img alt="" src={logoUrl} />
```

Update `ProductVideo.tsx` to import `productVideoUrl` and render:

```tsx
src={productVideoUrl}
```

- [ ] **Step 5: Normalize route titles**

In `src/routes/AppRoutes.tsx`, derive:

```ts
const normalizedPath = pathname === '/' ? pathname : pathname.replace(/\/+$/, '')
```

Use `normalizedPath` for `pageByPath` lookup.

- [ ] **Step 6: Run focused and full tests**

Run:

```bash
npm test -- --run src/config.test.ts src/App.test.tsx src/components/SiteHeader.test.tsx src/components/ProductVideo.test.tsx
npm test -- --run
npm run typecheck
```

Expected: all focused tests and the full suite pass; root-build Logo and Demo assertions remain `/media/...`.

- [ ] **Step 7: Verify the normal root build remains unchanged**

Run:

```bash
npm run build
rg -q 'src="/assets/' dist/index.html
rg -q 'href="/media/wordswave-logo.jpg"' dist/index.html
```

Expected: root build succeeds and remains root-based for EdgeOne/local hosting.

- [ ] **Step 8: Commit the base-path adapter**

Run:

```bash
git add \
  src/App.tsx \
  src/App.test.tsx \
  src/config.ts \
  src/config.test.ts \
  src/components/BrandMark.tsx \
  src/components/ProductVideo.tsx \
  src/routes/AppRoutes.tsx
git diff --cached --check
git commit -m "feat: support subpath hosting"
```

### Task 3: Generate GitHub Pages route artifacts

**Files:**
- Create: `/Users/wentao/CAD_Web/scripts/prepare-pages.mjs`
- Create: `/Users/wentao/CAD_Web/scripts/prepare-pages.test.mjs`
- Modify: `/Users/wentao/CAD_Web/package.json`
- Modify: `/Users/wentao/CAD_Web/package-lock.json`

- [ ] **Step 1: Write the failing post-build test**

Create `scripts/prepare-pages.test.mjs` with Node's built-in test runner. It must:

- create a temporary directory;
- write a sentinel `index.html`;
- call `preparePages(tempDir)`;
- assert identical files at `product/index.html`, `use-cases/index.html`, `docs/index.html`, `about/index.html`, and `404.html`;
- remove the temporary directory in `finally`.

Core assertions:

```js
for (const route of ['product', 'use-cases', 'docs', 'about']) {
  assert.equal(await readFile(join(tempDir, route, 'index.html'), 'utf8'), shell)
}
assert.equal(await readFile(join(tempDir, '404.html'), 'utf8'), shell)
```

- [ ] **Step 2: Run the test and verify failure**

Run:

```bash
node --test scripts/prepare-pages.test.mjs
```

Expected: FAIL because `scripts/prepare-pages.mjs` does not exist.

- [ ] **Step 3: Implement the route artifact generator**

Create `scripts/prepare-pages.mjs` with:

```js
import { copyFile, mkdir } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

export const pageRoutes = ['product', 'use-cases', 'docs', 'about']

export async function preparePages(distDir = resolve('dist')) {
  const shellPath = join(distDir, 'index.html')

  for (const route of pageRoutes) {
    const target = join(distDir, route, 'index.html')
    await mkdir(dirname(target), { recursive: true })
    await copyFile(shellPath, target)
  }

  await copyFile(shellPath, join(distDir, '404.html'))
}

const entryPath = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : ''
if (import.meta.url === entryPath) {
  await preparePages()
}
```

- [ ] **Step 4: Add Pages scripts**

Update `package.json`:

```json
"build:pages": "tsc --noEmit && vite build --base=/wordswave-web/ && node scripts/prepare-pages.mjs",
"test:pages": "node --test scripts/prepare-pages.test.mjs"
```

Run `npm install --package-lock-only` only if npm changes the lockfile for the scripts-only edit; otherwise leave the lockfile unchanged.

- [ ] **Step 5: Run the post-build test and Pages build**

Run:

```bash
npm run test:pages
npm run build:pages
```

Expected: test passes and Pages build succeeds.

- [ ] **Step 6: Inspect the Pages artifact**

Run:

```bash
test -f dist/index.html
test -f dist/product/index.html
test -f dist/use-cases/index.html
test -f dist/docs/index.html
test -f dist/about/index.html
test -f dist/404.html
test -f dist/media/wordswave-logo.jpg
test -f dist/media/wordswave-product-demo.mp4
rg -q '/wordswave-web/assets/' dist/index.html
rg -q '/wordswave-web/media/wordswave-logo.jpg' dist/assets/*.js
rg -q '/wordswave-web/media/wordswave-product-demo.mp4' dist/assets/*.js
cmp dist/index.html dist/product/index.html
cmp dist/index.html dist/404.html
```

Expected: all checks pass.

- [ ] **Step 7: Smoke-test known direct routes under the project base**

Run:

```zsh
pages_smoke_root=$(mktemp -d)
cp -R dist "$pages_smoke_root/wordswave-web"
python3 -m http.server 4173 --directory "$pages_smoke_root"
```

In a second shell, check:

```bash
for route_path in / /product/ /use-cases/ /docs/ /about/; do
  curl --fail --show-error --silent \
    "http://127.0.0.1:4173/wordswave-web$route_path" \
    | rg -q '<div id="root"></div>'
done
```

Expected: every known direct route returns the application shell. Stop the temporary server afterward.

- [ ] **Step 8: Commit the Pages artifact builder**

Run:

```bash
git add package.json package-lock.json scripts/prepare-pages.mjs scripts/prepare-pages.test.mjs
git diff --cached --check
git commit -m "build: prepare GitHub Pages routes"
```

### Task 4: Add the official GitHub Pages workflow and documentation

**Files:**
- Create: `/Users/wentao/CAD_Web/.github/workflows/deploy-pages.yml`
- Modify: `/Users/wentao/CAD_Web/README.md`

- [ ] **Step 1: Create the workflow**

Create `.github/workflows/deploy-pages.yml`:

```yaml
name: Deploy GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v6
      - name: Set up Node
        uses: actions/setup-node@v7
        with:
          node-version: 22
          cache: npm
      - name: Configure Pages
        uses: actions/configure-pages@v6
      - name: Install dependencies
        run: npm ci
      - name: Test
        run: npm test -- --run
      - name: Test Pages artifact builder
        run: npm run test:pages
      - name: Build
        run: npm run build:pages
      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v5
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v5
```

- [ ] **Step 2: Document Pages**

Add to `README.md`:

````markdown
## GitHub Pages

Public preview: <https://owenywt.github.io/wordswave-web/>

Build the Pages artifact locally:

```bash
npm run test:pages
npm run build:pages
```

GitHub Actions deploys the verified `dist` artifact from `main`. The existing
`npm run build` command remains the root-based build for local and EdgeOne hosting.
````

- [ ] **Step 3: Run YAML and full project checks**

Run:

```bash
ruby -e "require 'yaml'; YAML.load_file('.github/workflows/deploy-pages.yml'); puts 'yaml=ok'"
npm test -- --run
npm run test:pages
npm run typecheck
npm run build
npm run build:pages
git diff --check
```

Expected: YAML parses; all tests and both builds pass.

- [ ] **Step 4: Commit workflow and documentation**

Run:

```bash
git add .github/workflows/deploy-pages.yml README.md
git diff --cached --check
git commit -m "ci: deploy site to GitHub Pages"
```

### Task 5: Authenticate GitHub and create the public repository

**Files:**
- No new local files expected.
- Create external repository: `OwenYWT/wordswave-web`
- Add local Git remote: `origin`

- [ ] **Step 1: Authenticate the intended account**

Run:

```bash
gh auth login --hostname github.com --git-protocol https --web
gh auth status
gh api user --jq '.login'
```

Expected: browser authorization completes and the authenticated login is exactly `OwenYWT`. If another account is active, stop.

- [ ] **Step 2: Re-run public-push safety checks**

Run:

```bash
gitleaks git . --redact --no-banner
gitleaks dir . --redact --no-banner
git status --short
git log -1 --oneline
git diff --check
```

Expected: no secret findings, no uncommitted Pages implementation changes, and only intentionally excluded user files remain untracked or modified.

- [ ] **Step 3: Confirm the repository name is available**

Run:

```bash
gh repo view OwenYWT/wordswave-web
```

Expected: command reports that the repository does not exist. If it exists, stop and ask the user before changing or pushing to it.

- [ ] **Step 4: Create the public repository without pushing**

Run:

```bash
gh repo create OwenYWT/wordswave-web \
  --public \
  --source=. \
  --remote=origin \
  --description "Bilingual product website for WordsWave."
```

Expected: repository is created and `origin` points to `OwenYWT/wordswave-web`.

- [ ] **Step 5: Try to enable workflow-based Pages before the first push**

Run:

```bash
gh api \
  --method POST \
  -H "X-GitHub-Api-Version: 2026-03-10" \
  repos/OwenYWT/wordswave-web/pages \
  -f build_type=workflow
```

Expected: HTTP 201. If the empty repository returns 409 or 422, record it and continue to Step 7 after the first push; do not change to legacy branch publishing.

- [ ] **Step 6: Push the verified commit to remote `main`**

Run:

```bash
git push -u origin HEAD:main
```

Expected: push succeeds without renaming the local feature branch.

- [ ] **Step 7: Confirm Pages is configured for workflow publishing**

Run:

```bash
gh api \
  -H "X-GitHub-Api-Version: 2026-03-10" \
  repos/OwenYWT/wordswave-web/pages \
  --jq '{build_type, html_url, status}'
```

If Step 5 was blocked because the repository was empty, run the POST command again now. Expected: `build_type` is `workflow`.

### Task 6: Verify GitHub Actions and the public site

**Files:**
- No local source changes expected.

- [ ] **Step 1: Locate and watch the Pages workflow**

Run:

```bash
gh run list --repo OwenYWT/wordswave-web --workflow deploy-pages.yml --limit 5
gh run watch <run-id> --repo OwenYWT/wordswave-web --exit-status
```

Expected: build and deploy jobs complete successfully. If the first run began before Pages enablement and failed only for that reason, rerun it once with:

```bash
gh run rerun <run-id> --repo OwenYWT/wordswave-web
gh run watch <run-id> --repo OwenYWT/wordswave-web --exit-status
```

Any other failure requires log inspection before a code change.

- [ ] **Step 2: Confirm repository and Pages metadata**

Run:

```bash
gh repo view OwenYWT/wordswave-web --json nameWithOwner,visibility,defaultBranchRef,url
gh api \
  -H "X-GitHub-Api-Version: 2026-03-10" \
  repos/OwenYWT/wordswave-web/pages \
  --jq '{build_type, html_url, status, custom_404}'
```

Expected: repository is public, default branch is `main`, Pages uses `workflow`, and `html_url` is `https://owenywt.github.io/wordswave-web/`.

- [ ] **Step 3: Verify known routes and assets over HTTP**

Run:

```zsh
GITHUB_PAGES_URL='https://owenywt.github.io/wordswave-web'

for route_path in / /product/ /use-cases/ /docs/ /about/; do
  curl --fail --show-error --silent --location \
    "$GITHUB_PAGES_URL$route_path" \
    | rg -q '<div id="root"></div>' \
    || { echo "STOP: route failed: $route_path"; exit 1; }
done

asset_check_dir=$(mktemp -d)
curl --fail --show-error --silent --location \
  --dump-header "$asset_check_dir/logo.headers" \
  --output "$asset_check_dir/logo.jpg" \
  "$GITHUB_PAGES_URL/media/wordswave-logo.jpg"
curl --fail --show-error --silent --location \
  --dump-header "$asset_check_dir/video.headers" \
  --output "$asset_check_dir/demo.mp4" \
  "$GITHUB_PAGES_URL/media/wordswave-product-demo.mp4"
rg -qi '^content-type: image/' "$asset_check_dir/logo.headers"
rg -qi '^content-type: video/' "$asset_check_dir/video.headers"
test -s "$asset_check_dir/logo.jpg"
test -s "$asset_check_dir/demo.mp4"
```

Expected: all known routes return the shell and both media files return correct non-empty content.

- [ ] **Step 4: Verify unknown-route behavior**

Run:

```zsh
unknown_body=$(mktemp)
unknown_status=$(curl --show-error --silent --location \
  --output "$unknown_body" \
  --write-out '%{http_code}' \
  'https://owenywt.github.io/wordswave-web/not-a-real-page')
test "$unknown_status" = '404'
rg -q '<div id="root"></div>' "$unknown_body"
rg -q '/wordswave-web/assets/' "$unknown_body"
```

Expected: HTTP status is 404 but the custom application shell and base-prefixed assets are present.

- [ ] **Step 5: Run browser QA with `@browse`**

Open the production URL and verify:

- desktop homepage at 1280 × 800;
- mobile homepage at 390 × 844;
- fresh direct navigation to every known route, with and without trailing slash;
- correct document title on `/product/`;
- language switching;
- header and footer navigation;
- workspace CTA stays within `/wordswave-web/product`;
- Logo alignment and absence of the old black artifact;
- Demo video loads, is muted, loops, and attempts autoplay unless reduced motion is active;
- unknown direct route renders the existing NotFound page and returns home;
- no blocking console errors.

- [ ] **Step 6: Run final local verification**

Run:

```bash
npm test -- --run
npm run test:pages
npm run typecheck
npm run build
npm run build:pages
git status --short
```

Expected: every check passes and no uncommitted Pages implementation file remains.

- [ ] **Step 7: Report deployment**

Report:

- public repository URL;
- persistent GitHub Pages URL;
- workflow run URL and result;
- tests and route/media/browser checks performed;
- current known limitation: mainland China performance and reachability are not guaranteed;
- any intentionally uncommitted pre-existing files.
