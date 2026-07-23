# CAD Agent Website

Bilingual, multi-page product website for CAD Agent.

## Local development

```bash
npm install
npm run dev
```

The development server uses Vite and prints the local URL after startup.

## Configuration

Set `VITE_WORKSPACE_URL` to point the shared workspace calls to action at an available CAD Agent workspace:

```bash
VITE_WORKSPACE_URL=https://example.com/workspace npm run dev
```

When the variable is not set, workspace actions lead to the local `/product` page.

## Verification

```bash
npm run typecheck
npm test -- --run
npm run build
```

## Static hosting

The site uses client-side routing. Configure the static host to rewrite unknown application paths such as `/product`, `/use-cases`, `/docs`, and `/about` to `index.html`. Static assets should continue to be served normally.
