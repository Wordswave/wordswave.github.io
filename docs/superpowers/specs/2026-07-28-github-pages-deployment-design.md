# GitHub Pages Deployment Design

## Goal

Publish the current WordsWave marketing site as a public GitHub Pages project at:

`https://owenywt.github.io/wordswave-web/`

The deployment must preserve the current bilingual content, visual design, page hierarchy, media, and clean route names. It must not introduce new product claims or change the existing EdgeOne/local build behavior.

## Repository and Visibility

- GitHub owner: `OwenYWT`
- Repository: `wordswave-web`
- Visibility: public
- Deployment source: GitHub Actions
- Default branch: `main`
- Current local feature branch remains unchanged; the verified commit is pushed to the remote `main` branch.

Before the first public push:

- confirm no `.env` file is tracked;
- scan tracked files, untracked publication candidates, and the full reachable Git history with a history-aware secret scanner in redacted mode;
- confirm `.edgeone/`, local credentials, build output, and temporary QA files remain ignored;
- inventory every modified and untracked path, classify whether it belongs in the public website repository, and stage only an explicit allowlist;
- review the complete staged diff before each commit;
- never use `git add -A` or another broad staging command in the dirty worktree;
- stop if a possible secret is found rather than publishing it.

The existing website changes are handled before the Pages adapter:

1. Record the current dirty-worktree inventory.
2. Stage only the verified product-site files that make up the version the user has already reviewed.
3. Leave unrelated or uncertain files uncommitted.
4. Commit the verified site state on the existing feature branch without renaming the branch.
5. Implement and commit the GitHub Pages adapter separately.
6. Push the final feature-branch commit to the new remote `main` ref with `HEAD:main`; the local feature branch name remains unchanged.

This strategy publishes the reviewed working state without stashing, discarding, or silently absorbing unrelated user files.

## Chosen Routing Approach

Use `BrowserRouter` with the GitHub Pages project base path and generate static route entry files during the Pages build.

The Pages build will publish:

- `dist/index.html`
- `dist/product/index.html`
- `dist/use-cases/index.html`
- `dist/docs/index.html`
- `dist/about/index.html`
- `dist/404.html`

Each route entry is a copy of the Vite-generated application shell. GitHub Pages can therefore serve a successful document for every known direct route, while React Router renders the correct page after startup. `404.html` preserves the existing in-app not-found experience for unknown paths.

Because GitHub Pages canonicalizes directory routes to trailing-slash URLs, route metadata code will normalize every non-root pathname by removing trailing slashes before looking up the page title. Tests cover both `/product` and `/product/`.

This approach was selected instead of:

- `HashRouter`, because it would change public URLs to forms such as `#/product`;
- a JavaScript 404 redirect, because it adds a redirect flash and more fragile URL rewriting.

## Base Path and Public Assets

GitHub Pages serves this project below `/wordswave-web/`, while local and EdgeOne deployments serve it below `/`.

The implementation will:

- build Pages with Vite base `/wordswave-web/`;
- pass the normalized `import.meta.env.BASE_URL` to `BrowserRouter`;
- make the workspace fallback URL base-aware;
- make the public Logo and Demo video URLs base-aware;
- keep explicit `VITE_WORKSPACE_URL` overrides unchanged.

React Router `Link` destinations remain expressed as application routes such as `/product`; the router basename adds the deployment prefix. Native asset and workspace links use a shared base-path helper so they resolve correctly in all environments.

## Build and Deployment Flow

Add a dedicated Pages build command without changing the existing production build:

1. Install dependencies with `npm ci`.
2. Run all Vitest tests.
3. Run TypeScript validation.
4. Build with Vite base `/wordswave-web/`.
5. Generate the static route entry files and `404.html`.
6. Upload `dist` as the Pages artifact.
7. Deploy through the official GitHub Pages action.

The existing `npm run build` command remains the EdgeOne/local production build. A separate `npm run build:pages` command owns GitHub-specific output.

The workflow runs on pushes to `main` and supports manual dispatch. It uses the minimum required permissions:

- repository contents: read;
- Pages: write;
- OpenID Connect token: write.

Concurrent Pages runs are grouped so a newer deployment supersedes an older queued run without interrupting an active production publish.

The workflow contract is:

- runtime: Node.js 22;
- checkout: `actions/checkout@v6`;
- Node setup and npm cache: `actions/setup-node@v7`;
- Pages configuration: `actions/configure-pages@v6`;
- artifact upload: `actions/upload-pages-artifact@v5`, with `dist` as the only uploaded path;
- deployment: `actions/deploy-pages@v5`;
- build job first, deploy job second with an explicit `needs: build`;
- deploy job environment: `github-pages`;
- environment URL: the `page_url` output from the deploy step.

Before the first workflow run, set the repository Pages publishing source to **GitHub Actions** through the repository settings or the corresponding GitHub API. Do not rely on branch publishing.

## Files

Expected implementation changes:

- Modify `src/App.tsx` to configure the router basename.
- Modify `src/config.ts` to expose base-aware public paths.
- Modify `src/components/BrandMark.tsx` to use the base-aware Logo URL.
- Modify `src/components/ProductVideo.tsx` to use the base-aware Demo URL.
- Update affected tests without changing their product assertions.
- Modify `package.json` with a Pages-specific build command.
- Add `scripts/prepare-pages.mjs` to generate route entry files.
- Add `.github/workflows/deploy-pages.yml`.
- Update `README.md` with the public URL and deployment command.
- Modify `.gitignore` only if an exact required ignore rule is absent. Preserve every existing user change and do not broadly normalize or rewrite the file.

No page copy, component layout, design token, or visual styling change is in scope.

## Error Handling

- Authentication failure: stop and request browser authorization through `gh auth login`.
- Repository name conflict: stop rather than overwrite or select another repository automatically.
- Possible secret detected: stop before staging or pushing.
- Test, typecheck, or build failure: do not push.
- Pages workflow failure: inspect the GitHub Actions logs before changing code.
- Direct-route or asset failure after deployment: compare the Pages artifact with local `dist` before modifying routing.
- Unknown-route behavior mismatch: verify the deployed `404.html` response, base-prefixed assets, React NotFound page, and home link independently before changing the router.

## Verification

Local verification:

- all existing tests pass;
- TypeScript passes;
- `npm run build` still produces the root-based EdgeOne/local artifact;
- `npm run build:pages` produces base-prefixed asset references;
- every known route entry file and `404.html` exists;
- route-title tests pass for both trailing-slash and non-trailing-slash known paths;
- Logo and Demo are included in the Pages artifact.

GitHub verification:

- repository is public and owned by `OwenYWT`;
- the `main` branch contains the intended commit;
- the Pages workflow completes successfully;
- the Pages production URL is persistent;
- homepage loads at desktop and mobile widths;
- language switching works;
- direct navigation and refresh work for both slash forms of `/product`, `/use-cases`, `/docs`, and `/about`, with correct document titles;
- an unknown direct URL returns HTTP 404 while still loading the application shell, base-prefixed assets, the existing in-app NotFound page, and a working link back to `/wordswave-web/`;
- Logo renders correctly;
- Demo video loads, autoplays muted when allowed, and loops;
- no blocking browser console errors occur.

## Constraints and Risks

- GitHub Pages availability and speed in mainland China are not guaranteed.
- This deployment is a public product preview, not a payment, authentication, or sensitive-data surface.
- GitHub Pages should not be treated as the permanent hosting platform for a commercial SaaS application.
- The 8.8 MB Demo video is acceptable for the current artifact, but repeated playback will dominate bandwidth usage.
- A future custom domain or mainland production host should be planned separately.
