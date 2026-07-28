# WordsWave Website

Bilingual, multi-page product website for WordsWave.

## Local development

```bash
npm install
npm run dev
```

The development server uses Vite and prints the local URL after startup.

## Configuration

Set `VITE_WORKSPACE_URL` to point the shared workspace calls to action at an available WordsWave workspace:

```bash
VITE_WORKSPACE_URL=https://example.com/workspace npm run dev
```

When the variable is not set, workspace actions lead to the local `/product` page.

## Product media

- `public/media/wordswave-logo.jpg` is the supplied source logo. Shared brand lockups crop it non-destructively with CSS.
- `public/media/wordswave-product-demo.mp4` is the supplied Product-page demo. It autoplays muted, loops, plays inline, and retains native controls.
- The demo does not autoplay when the visitor requests reduced motion.

## Verification

```bash
npm run typecheck
npm test -- --run
npm run build
```

## Static hosting

The site uses client-side routing. Configure the static host to rewrite unknown application paths such as `/product`, `/use-cases`, `/docs`, and `/about` to `index.html`. Static assets should continue to be served normally.

## GitHub Pages

Public preview: <https://owenywt.github.io/wordswave-web/>

Build the Pages artifact locally:

```bash
npm run test:pages
npm run build:pages
```

GitHub Actions deploys the verified `dist` artifact from `main`. The existing
`npm run build` command remains the root-based build for local and EdgeOne hosting.
