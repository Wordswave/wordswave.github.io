# EdgeOne Global Direct Deployment Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish the current WordsWave production build to a persistent EdgeOne Makers Global URL without using Git.

**Architecture:** Build and verify the static Vite bundle locally, then use EdgeOne CLI interactive Global authentication and direct upload of `dist` to a production project named `wordswave-web`. Verify every application route and media asset against the persistent production URL, then save the verified deployment settings for future releases.

**Tech Stack:** React 19, Vite 8, TypeScript, Vitest, EdgeOne CLI 1.2+, EdgeOne Makers Direct Upload

---

## File Structure

- Verify: `package.json` — existing build, test, typecheck, and preview commands.
- Verify: `src/config.ts` — confirms the `/product` workspace fallback when no production workspace URL is set.
- Verify: `dist/` — locally generated deployment artifact.
- Create or modify after successful deployment: `CLAUDE.md` — persistent EdgeOne production URL, deploy command, and HTTP health check.
- Do not modify application source, routing, copy, media, or design files during this deployment.

### Task 1: Confirm the deployment input

**Files:**
- Verify: `/Users/wentao/CAD_Web/package.json`
- Verify: `/Users/wentao/CAD_Web/src/config.ts`
- Verify: `/Users/wentao/CAD_Web/.env*` if present

- [ ] **Step 1: Confirm the deployment location and branch**

Run:

```bash
pwd
git branch --show-current
git status --short
```

Expected:

- Working directory is `/Users/wentao/CAD_Web`.
- Branch is `feat/cad-agent-marketing-site`.
- Existing dirty worktree changes are preserved; deployment does not stage, discard, or rewrite them.

- [ ] **Step 2: Confirm no production workspace URL is injected**

Run:

```zsh
if env | cut -d= -f1 | rg -qx 'VITE_WORKSPACE_URL'; then
  echo 'STOP: VITE_WORKSPACE_URL is defined in the shell'
  exit 1
fi

vite_env_files=(.env*(N.))
if (( ${#vite_env_files[@]} > 0 )); then
  matching_env_files=$(rg -l '^VITE_WORKSPACE_URL=' -- "${vite_env_files[@]}" || true)
  if [[ -n "$matching_env_files" ]]; then
    echo 'STOP: VITE_WORKSPACE_URL is defined in:'
    print -r -- "$matching_env_files"
    exit 1
  fi
fi
```

Expected: no environment-variable values are printed, and the check exits successfully. If the key exists in the shell or any root `.env*` file, stop before building.

Read `src/config.ts` and confirm the fallback remains:

```ts
export const workspaceUrl = import.meta.env.VITE_WORKSPACE_URL?.trim() || '/product'
```

### Task 2: Rebuild and verify the production artifact

**Files:**
- Regenerate: `/Users/wentao/CAD_Web/dist/`
- Verify: `/Users/wentao/CAD_Web/dist/index.html`
- Verify: `/Users/wentao/CAD_Web/dist/media/wordswave-logo.jpg`
- Verify: `/Users/wentao/CAD_Web/dist/media/wordswave-product-demo.mp4`

- [ ] **Step 1: Run all automated checks**

Run:

```bash
npm test -- --run
npm run typecheck
npm run build
```

Expected:

- All Vitest files and tests pass.
- TypeScript exits with code 0.
- Vite production build exits with code 0.

- [ ] **Step 2: Verify the artifact contents**

Run:

```bash
test -f dist/index.html
test -f dist/media/wordswave-logo.jpg
test -f dist/media/wordswave-product-demo.mp4
du -sh dist
oversized_files=$(find dist -type f -size +25M -print)
test -z "$oversized_files"
file_count=$(find dist -type f | wc -l | tr -d ' ')
test "$file_count" -lt 20000
find dist -maxdepth 2 -type f | sort
```

Expected:

- All three required files exist.
- No individual file exceeds EdgeOne's 25MB direct-upload limit.
- Total file count is below EdgeOne's 20,000-file direct-upload limit.

### Task 3: Install and authenticate EdgeOne CLI

**Files:**
- No project files modified.
- User-level EdgeOne CLI installation and authentication state only.

- [ ] **Step 1: Install the official CLI**

Run:

```bash
npm install -g edgeone
```

Expected: npm exits with code 0 and the `edgeone` command is available.

- [ ] **Step 2: Verify CLI version and Makers capability**

Run:

```bash
edgeone -v
edgeone makers --help
```

Expected: EdgeOne CLI version is 1.2.0 or newer and the CLI exposes the `makers` command namespace. If either check fails, stop and update the CLI.

- [ ] **Step 3: Authenticate in the Global region**

Run:

```bash
edgeone login
```

Select `Global`. If the CLI opens a browser or displays an authorization URL, pause and ask the user to complete the Tencent Cloud authorization. Do not request, print, or store an API token.

If project acceleration-region selection appears during login or deployment, choose **Global availability zone (excluding Chinese mainland)** so users outside mainland China can access the default project domain without an ICP filing.

- [ ] **Step 4: Verify the authenticated account**

Run:

```bash
edgeone whoami
```

Expected: the CLI reports an authenticated Global account without exposing a credential.

### Task 4: Deploy the verified artifact

**Files:**
- Upload: `/Users/wentao/CAD_Web/dist/`
- No project source files modified.

- [ ] **Step 1: Create or update the production deployment**

Run:

```bash
edgeone makers deploy ./dist -n wordswave-web -e production
```

Expected:

- EdgeOne creates or updates the direct-upload project `wordswave-web`.
- The project uses **Global availability zone (excluding Chinese mainland)**.
- Deployment completes successfully.
- CLI prints the deployment and project URLs.

If `wordswave-web` is unavailable or owned by another account, stop and ask the user to approve another name.

- [ ] **Step 2: Record and classify every returned URL**

Capture every URL shown by the CLI and classify it:

- Fixed project domain: stable project domain serving the latest production deployment.
- Deployment domain: immutable URL for one deployment version.
- Temporary preview URL: short-lived validation link that can expire after three hours.

Do not write any URL into `CLAUDE.md` yet.

- [ ] **Step 3: Confirm the fixed project domain in the EdgeOne console**

Open EdgeOne Pages/Makers Console → `wordswave-web` → **Domain Management**. Confirm which default project domain is marked as the stable domain for the latest production deployment, then save that exact value locally as `EDGEONE_PRODUCTION_URL` for verification.

Expected: `EDGEONE_PRODUCTION_URL` is the fixed project domain, not a deployment-specific domain or three-hour preview link.

### Task 5: Verify the public deployment

**Files:**
- No project source files modified.

- [ ] **Step 1: Verify HTTP routes**

Run:

```zsh
EDGEONE_PRODUCTION_URL='<verified fixed project domain>'

for attempt_number in {1..10}; do
  if curl --fail --show-error --silent --location "$EDGEONE_PRODUCTION_URL/" \
    | rg -q '<div id="root"></div>'; then
    break
  fi

  if [[ "$attempt_number" -eq 10 ]]; then
    echo 'STOP: production URL did not become healthy'
    exit 1
  fi

  sleep 3
done

for route_path in / /product /use-cases /docs /about; do
  curl --fail --show-error --silent --location \
    "$EDGEONE_PRODUCTION_URL$route_path" \
    | rg -q '<div id="root"></div>' \
    || { echo "STOP: route failed: $route_path"; exit 1; }
done
```

Expected: the fixed project domain becomes healthy within 30 seconds, and every direct route returns a successful response containing the application shell.

If any nested route returns the EdgeOne platform 404, stop and ask the user which approved routing strategy to implement. Do not add an unsupported `edgeone.json` SPA rewrite or silently change the URL format.

- [ ] **Step 2: Verify static media**

Run:

```zsh
edgeone_check_dir=$(mktemp -d)

curl --fail --show-error --silent --location \
  --dump-header "$edgeone_check_dir/logo.headers" \
  --output "$edgeone_check_dir/logo.jpg" \
  "$EDGEONE_PRODUCTION_URL/media/wordswave-logo.jpg"

curl --fail --show-error --silent --location \
  --dump-header "$edgeone_check_dir/video.headers" \
  --output "$edgeone_check_dir/demo.mp4" \
  "$EDGEONE_PRODUCTION_URL/media/wordswave-product-demo.mp4"

rg -qi '^content-type: image/' "$edgeone_check_dir/logo.headers"
rg -qi '^content-type: video/' "$edgeone_check_dir/video.headers"
test -s "$edgeone_check_dir/logo.jpg"
test -s "$edgeone_check_dir/demo.mp4"
```

Expected: both assets download successfully, have non-empty bodies, and return appropriate image/video content types.

- [ ] **Step 3: Run browser checks**

Using `@browse`, open the production URL and verify:

- desktop homepage at 1280px width;
- mobile homepage at 390px width;
- fresh direct browser navigation to `/product`, `/use-cases`, `/docs`, and `/about`, without relying on client-side navigation from the homepage;
- workspace CTA resolves to `/product`;
- no blocking browser console errors.

### Task 6: Save and verify deployment configuration

**Files:**
- Create or modify: `/Users/wentao/CAD_Web/CLAUDE.md`

- [ ] **Step 1: Run `@setup-deploy` with the verified deployment**

Confirm this configuration before writing:

```markdown
## Deploy Configuration (configured by /setup-deploy)
- Platform: EdgeOne Makers Direct Upload
- Production URL: <verified persistent production URL>
- Deploy workflow: manual local direct upload
- Deploy status command: HTTP health check
- Merge method: none required for direct upload
- Project type: static web app
- Post-deploy health check: <verified persistent production URL>

### Custom deploy hooks
- Pre-merge: npm test -- --run && npm run typecheck && npm run build
- Deploy trigger: edgeone makers deploy ./dist -n wordswave-web -e production
- Deploy status: poll production URL
- Health check: <verified persistent production URL>
```

- [ ] **Step 2: Verify the saved health check**

Request the configured production URL.

Expected: HTTP 200.

- [ ] **Step 3: Leave deployment files uncommitted**

Do not create an implementation commit that could mix `CLAUDE.md` with the existing dirty worktree. Report the verified production URL, deployment project, checks performed, and the exact files changed.
