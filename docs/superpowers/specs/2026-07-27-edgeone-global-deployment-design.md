# EdgeOne Global Direct Deployment Design

## Goal

Publish the current WordsWave Vite website to a free, publicly accessible EdgeOne Makers URL without using GitHub or another remote Git provider.

## Selected Approach

Use EdgeOne CLI direct upload in the `Global` region:

1. Build the verified production bundle locally with `npm run build`.
2. Authenticate interactively with `edgeone login` and select `Global`.
3. Confirm the authenticated account with `edgeone whoami`.
4. Upload the prebuilt `dist` directory to a direct-upload project named `wordswave-web`.
5. Verify the generated production URL.

The deployment command is:

```bash
edgeone makers deploy ./dist -n wordswave-web -e production
```

## Why Direct Upload

- It does not require GitHub, GitLab, Gitee, or Coding.
- It publishes the exact local artifact that passed tests and production build verification.
- It avoids differences between the local and hosted Node.js build environments.
- Future releases can repeat the same build and deploy commands.

The direct-upload project will not later be converted to Git integration. If automatic Git deployment is wanted in the future, create a separate EdgeOne project.

## Scope

- Deploy the existing website without changing its content, visual design, routes, or runtime behavior.
- Use EdgeOne's generated free domain for the first release.
- Do not bind a custom domain in this deployment.
- Do not add cloud functions, KV storage, databases, or server-side rendering.
- Do not create or expose an EdgeOne API token. Authentication uses the interactive browser login.
- Keep `VITE_WORKSPACE_URL` unset because no production workspace URL has been confirmed. Workspace calls to action therefore retain their existing `/product` fallback.

## Deployment Inputs

- Project root: `/Users/wentao/CAD_Web`
- EdgeOne project: `wordswave-web`
- Acceleration and account region: `Global`
- Build command: `npm run build`
- Upload directory: `dist`
- Environment: `production`

The built site contains approximately 9.5MB across 13 files. Its largest file is the product demo video at approximately 8.8MB.

## Authentication

EdgeOne CLI is not currently installed.

The deployment workflow will:

1. Install the official `edgeone` CLI globally through npm.
2. Run `edgeone -v` and require version 1.2.0 or newer.
3. Run `edgeone login`.
4. Ask the user to complete the Tencent Cloud browser authorization and select `Global` if the browser flow requires user interaction.
5. Run `edgeone whoami` without printing tokens or credentials.

No credential files will be committed to the project.

## Routing

The site uses React `BrowserRouter` with these routes:

- `/`
- `/product`
- `/use-cases`
- `/docs`
- `/about`

After deployment, direct navigation and refresh must work for every route.

EdgeOne's documented `edgeone.json` rewrites do not support SPA frontend-route fallback, so this deployment will not add an unsupported catch-all rewrite. Deploy the existing artifact first and test every direct route against the production URL.

If any direct route returns the platform 404 instead of the application, stop the deployment workflow and ask the user to choose a follow-up routing strategy. Do not silently change the application. The choices are:

- emit a static `index.html` copy for each known application route during the build;
- change the application to hash-based routes;
- migrate to EdgeOne's React Router framework adapter and source-build workflow.

## Verification

Before upload:

- Confirm neither the shell nor a Vite environment file defines `VITE_WORKSPACE_URL`.
- Run `npm test -- --run`.
- Run `npm run typecheck`.
- Run `npm run build`.
- Confirm the expected media files exist in `dist/media`.

After upload:

- Confirm the generated production URL responds successfully.
- Confirm the URL is the persistent production project URL, not a temporary preview link.
- Check `/`, `/product`, `/use-cases`, `/docs`, and `/about`.
- Check `media/wordswave-logo.jpg` and `media/wordswave-product-demo.mp4`.
- Verify the homepage visually at desktop and mobile viewport widths.
- Confirm a workspace call to action resolves to the expected `/product` fallback.
- Check browser console errors.
- Create `CLAUDE.md` if absent, then record the production URL and HTTP health check under `## Deploy Configuration` only after the URL is known and verified.

## Failure Handling

- If CLI installation fails, stop and report the package manager error.
- If login requires browser interaction, pause and ask the user to complete authorization.
- If the project name is unavailable, stop and ask the user to approve a different name.
- If deployment fails, inspect the CLI output and do not claim success.
- If a nested route fails on refresh, stop and ask the user which documented routing strategy to implement before changing code or deployment artifacts.
- If the deployed media is missing, verify the local `dist/media` contents and redeploy the complete directory.

## Completion Criteria

Deployment is complete only when:

- EdgeOne reports a successful production deployment.
- A public production URL is available.
- All five application routes load.
- Both supplied media files load.
- Desktop and mobile homepage checks pass.
- No blocking console errors are present.
- `CLAUDE.md` contains the verified EdgeOne production URL and health check.
