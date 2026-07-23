# WordsWave Typography, Brand, Copy, and Media Design

**Status:** Approved for implementation by the user on 2026-07-23.

## Objective

Improve the existing bilingual multi-page website without changing its routes, page structure, product facts, interactive CAD behavior, or editorial visual direction.

The implementation must:

1. replace ad hoc typography declarations with one responsive typography system;
2. rewrite all English and Chinese website copy in direct, professional B2B product language;
3. replace the CAD / AGENT brand treatment with the supplied WordsWave logo;
4. add the supplied product demo video to the Product page;
5. preserve the existing visual system, navigation, page hierarchy, and functionality.

## Verified product facts

Copy may use only capabilities confirmed by `/Users/wentao/CAD-Agent/README.md` and current website behavior:

- users can create or modify CadQuery and DXF designs from natural-language requests;
- the workspace displays task progress, 3D or 2D previews, parameters, engineering checks, history, and downloadable files;
- available outputs can include STEP, STL, DXF, SVG, and PNG, depending on the generated result;
- the website's interactive model is an illustrative product preview;
- unconfigured external runtimes must not be presented as available.

Do not add customer claims, performance claims, business metrics, pricing, production-readiness claims, or capabilities not supported by the repository.

## Existing information hierarchy

| Page or area | Primary information | Secondary information | Supporting information |
|---|---|---|---|
| Shared header | Brand, route navigation, workspace action | Language selector | Active-route state |
| Home | Three-line product position | Core capabilities, workflow | Card descriptions, labels, closing action |
| Product | Product capability H1 | Video demo, interactive product preview, engineering checks | Toolbar labels, parameters, sample validation and export details |
| Use cases | Mechanical CAD task positioning | Four use-case titles | One concrete sentence per task |
| Docs | Core workflow explanation | Four workflow steps | Preview disclosure |
| About | Product definition | Three operating principles | Preview disclosure |
| Shared footer | Brand and page routes | Preview disclosure, language selector | Back-to-top action |

The current site overuses four widely separated title sizes, uses 11px for too many required interface labels, and repeats local font-size, line-height, weight, and tracking declarations across components. Several 70–103px titles dominate their sections while card and product-interface labels fall below a comfortable reading hierarchy.

## Approved typography direction

The user selected the **Balanced Editorial** direction.

### Primitive type values

| Primitive | Desktop | Tablet | Mobile |
|---|---:|---:|---:|
| Display | 82px | 68px | 48px |
| Page title | 68px | 56px | 44px |
| Section title | 52px | 44px | 36px |
| Module title | 30px | 28px | 26px |
| Lead body | 17px | 17px | 17px |
| Body | 16px | 16px | 16px |
| Supporting body | 14px | 14px | 14px |
| Navigation and text link | 14px | 14px | 14px |
| Button and metadata label | 12px | 12px | 12px |

### Semantic type roles

| Role | Weight | Line height | Tracking | Measure |
|---|---:|---:|---:|---:|
| Display | 400 | 0.92 | -0.012em English, 0 Chinese | 15ch maximum |
| Page title | 400 | 0.94 | -0.01em English, 0 Chinese | 18ch maximum |
| Section title | 400 | 1 | -0.008em English, 0 Chinese | 20ch maximum |
| Module title | 400 | 1.08 | -0.006em English, 0 Chinese | 24ch maximum |
| Lead body | 400 | 1.45 | 0 | 42ch maximum |
| Body | 400 | 1.5 | 0 | 62ch maximum |
| Supporting body | 400 | 1.45 | 0 | 62ch maximum |
| Navigation | 500 | 1.3 | 0 | none |
| Button | 600 | 1 | 0.04em | none |
| Metadata label | 600 | 1.35 | 0.05em | none |

### Token architecture

Typography follows the existing three layers:

```text
Primitive font values
  → semantic typography roles
    → component typography tokens
```

Required runtime tokens include:

- `--semantic-type-display-*`
- `--semantic-type-page-title-*`
- `--semantic-type-section-title-*`
- `--semantic-type-module-title-*`
- `--semantic-type-lead-*`
- `--semantic-type-body-*`
- `--semantic-type-supporting-*`
- `--semantic-type-navigation-*`
- `--semantic-type-label-*`
- `--component-button-font-*`
- `--component-nav-font-*`
- `--component-card-title-*`

Update `design-tokens.json`, `src/styles/tokens.css`, and `DESIGN.md` together. Components and page selectors must consume semantic or component tokens rather than primitive font-size values. Responsive type values change at the existing 900px and 767px breakpoints.

## Brand integration

Source asset:

`/Users/wentao/Desktop/Owen/wordswave_logo.jpg`

The supplied 1267×1280 vertical lockup replaces CAD / AGENT everywhere:

- header wordmark;
- footer wordmark;
- home-link accessible name;
- product-preview toolbar brand;
- document titles and meta description;
- favicon reference.

The original file is copied without image editing to `public/media/wordswave-logo.jpg`.

Because the source is a vertical lockup, the shared header and footer use a `BrandMark` component:

- a square, overflow-hidden wrapper shows the supplied symbol through CSS positioning;
- visible text reads `WordsWave` beside the symbol for legibility at navigation size;
- the supplied image remains the visual source;
- no new logo artwork or invented brand variant is created.

Product capability references may describe the CAD workspace, but visible CAD / AGENT brand labels are removed.

## Product demo video

Source asset:

`/Users/wentao/Downloads/简单demo.mp4`

Verified media properties:

- H.264 (`avc1`);
- 2416×1440;
- 32.07 seconds;
- approximately 8.8 MB.

Copy the unchanged video to `public/media/wordswave-product-demo.mp4`.

Add a ruled, square-cornered media section to `/product` between the page hero and the existing interactive product preview. This is the only structural addition.

The video must use:

```html
<video autoplay muted loop playsinline controls preload="metadata">
```

Behavior:

- autoplay silently when browser policy permits;
- loop continuously;
- remain inline on mobile;
- retain controls so users can pause, seek, or enable audio;
- use the source aspect ratio rather than forcing 16:9;
- use `object-fit: contain`;
- show no shadow or large radius;
- expose a localized accessible label;
- disable autoplay when `prefers-reduced-motion: reduce` is active.

Visible section copy:

| Language | Label | Title | Support |
|---|---|---|---|
| English | Product demo | See the workspace in use. | Watch the current CAD creation and review workflow. |
| Chinese | 产品演示 | 查看工作区实际操作。 | 了解当前 CAD 创建与检查流程。 |

## Copy system

### Terminology

Use these terms consistently:

| Concept | English | Chinese |
|---|---|---|
| User input | engineering request | 工程需求 |
| Result | CAD model | CAD 模型 |
| Editable values | parameters | 参数 |
| Ordered build steps | operation history | 操作历史 |
| Geometry and DFM results | engineering checks | 工程检查 |
| Output files | downloadable files / export formats | 可下载文件 / 导出格式 |
| Product surface | workspace | 工作区 |
| On-site simulation | interactive preview | 交互预览 |

Avoid `evidence`, `proof`, `decisions`, `connected`, `made editable`, `beyond the screen`, and similar abstract marketing language unless the sentence names a concrete record or result.

### Shared copy

| Area | English | Chinese |
|---|---|---|
| Workspace action | Open workspace | 打开工作区 |
| Product action | Explore product | 查看产品 |
| Use cases action | View use cases | 查看应用场景 |
| Docs action | Read docs | 阅读文档 |
| Footer disclosure | The interactive model on this website is an illustrative preview of the WordsWave workspace. | 本网站中的交互模型为 WordsWave 工作区的功能示意。 |

Navigation remains Home / Product / Use cases / Docs / About and 首页 / 产品 / 应用场景 / 文档 / 关于.

### Home

| Element | English | Chinese |
|---|---|---|
| Hero line 1 | Describe the part | 描述零件需求 |
| Hero line 2 | Create the model | 生成 CAD 模型 |
| Hero line 3 | Review the result | 检查输出结果 |
| Hero support | Create or modify CAD designs from an engineering request, then review the model, parameters, engineering checks, history, and downloadable files. | 根据工程需求创建或修改 CAD 设计，并查看模型、参数、工程检查、历史记录和可下载文件。 |
| Core label | Core workflow | 核心流程 |
| Core title | Complete the core CAD workflow in one workspace. | 在一个工作区完成 CAD 核心流程。 |
| Core support | Create or modify a design, inspect the result, and download the available files. | 创建或修改设计，检查输出结果，并下载可用文件。 |
| Capability 1 | Natural-language CAD | 自然语言 CAD |
| Capability 1 body | Create or modify a CAD design from a written engineering request. | 通过书面工程需求创建或修改 CAD 设计。 |
| Capability 2 | Model review | 模型检查 |
| Capability 2 body | Inspect the preview, parameters, operation history, and engineering checks. | 查看模型预览、参数、操作历史和工程检查。 |
| Capability 3 | File export | 文件导出 |
| Capability 3 body | Download the formats available for the generated design. | 下载当前设计可用的文件格式。 |
| Workflow title | From engineering request to downloadable CAD output. | 从工程需求到可下载的 CAD 输出。 |
| Workflow support | Each step keeps the model information available for review and revision. | 每一步都保留检查和修改模型所需的信息。 |
| Closing label | Start with a specific engineering request | 从明确的工程需求开始 |
| Closing title | Create the model, review the output, and continue editing. | 创建模型，检查结果，并继续修改。 |

Workflow steps:

1. Describe / 描述: specify the part, dimensions, material, and design constraints.
2. Create / 创建: generate editable geometry with an ordered operation history.
3. Review / 检查: inspect parameters, engineering checks, history, and available export formats.

### Product

| Element | English | Chinese |
|---|---|---|
| Page title | Create, edit, and review CAD in one workspace. | 在一个工作区创建、修改和检查 CAD。 |
| Support | Use natural language to generate or modify a design, inspect the result, adjust parameters, run available checks, and download files. | 使用自然语言生成或修改设计，查看结果、调整参数、运行可用检查并下载文件。 |
| Interactive label | Interactive preview | 交互预览 |
| Interactive title | Inspect a complete sample result. | 查看完整示例结果。 |
| Interactive support | Switch between sample requests to review the model, parameters, engineering checks, operation history, and export formats. | 切换示例需求，查看模型、参数、工程检查、操作历史和导出格式。 |
| Toolbar | WordsWave / Interactive preview | WordsWave / 交互预览 |
| Status | Sample model loaded | 示例模型已加载 |
| Evidence title | Review the model information before download. | 下载前检查模型信息。 |

Evidence cards:

1. Model parameters / 模型参数: review named dimensions, material, clearances, and feature values.
2. Geometry checks / 几何检查: review solid integrity, constraint state, and available interference results.
3. Manufacturing checks / 制造检查: review available wall thickness, draft, and tool-access results.
4. Operation history / 操作历史: follow the ordered steps used to create the model.
5. Export formats / 导出格式: review the geometry and supporting files available for download.

Sample prompts, dimensions, material names, operation names, and export-format values remain factual and do not change meaning. Their UI labels and validation wording use the approved terminology.

### Use cases

| Element | English | Chinese |
|---|---|---|
| Page title | CAD workflows for common mechanical design tasks. | 面向常见机械设计任务的 CAD 工作流。 |
| Support | Create editable models for parts where dimensions, features, and manufacturing constraints matter. | 为需要明确尺寸、特征和制造约束的零件创建可编辑模型。 |
| Section title | Common engineering use cases. | 常见工程应用场景。 |
| Section support | Apply the same request, modeling, review, and export workflow across these part types. | 在这些零件类型中使用一致的需求、建模、检查和导出流程。 |

The four existing use-case facts remain:

- brackets and mounts;
- jigs and fixtures;
- product enclosures;
- prototype mechanisms.

Descriptions name the concrete geometry already present in the current copy and avoid fabrication-readiness claims.

### Docs

| Element | English | Chinese |
|---|---|---|
| Page title | Understand the core CAD workflow. | 了解 CAD 核心工作流程。 |
| Support | Follow the steps used to define a request, review the model, check available results, and export files. | 按步骤定义需求、查看模型、检查可用结果并导出文件。 |
| Section title | From engineering request to export. | 从工程需求到文件导出。 |
| Disclosure | This documentation describes the workflow shown in the current product preview. | 本文档说明当前产品预览中展示的工作流程。 |

Keep the existing Describe, Review, Verify, and Export structure. Rewrite each description with the approved terminology and no extra operational claims.

### About

| Element | English | Chinese |
|---|---|---|
| Page title | An AI engineering workspace for CAD creation and review. | 用于 CAD 创建与检查的 AI 工程工作区。 |
| Support | WordsWave uses natural-language requests to generate or modify CAD designs and returns previews, parameters, engineering checks, history, and downloadable files. | WordsWave 根据自然语言需求生成或修改 CAD 设计，并提供预览、参数、工程检查、历史记录和可下载文件。 |
| Section title | Designed for clear, reviewable CAD work. | 面向清晰、可检查的 CAD 工作流程。 |
| Principle 1 | Editable output | 可编辑输出 |
| Principle 1 body | Keep parameters and features available for revision. | 保留可继续修改的参数和特征。 |
| Principle 2 | Visible model information | 清晰的模型信息 |
| Principle 2 body | Review parameters, operation history, engineering checks, and available files beside the result. | 在结果旁查看参数、操作历史、工程检查和可用文件。 |
| Principle 3 | Explicit workflow status | 明确的流程状态 |
| Principle 3 body | Show task progress and report unavailable dependencies instead of presenting them as ready. | 显示任务进度；依赖不可用时明确说明，而不是显示为可用。 |
| Disclosure | This website currently shows an illustrative product preview. | 本网站当前展示的是产品功能示意。 |

### Not found and interface labels

Use short, literal labels. Keep the 404 explanation, navigation labels, language labels, model axes, parameter values, formats, and keyboard labels. Replace abstract status phrases with observable states such as `Sample model loaded`, `Ready for review`, and their direct Chinese equivalents.

## Files and components

Expected additions:

- `public/media/wordswave-logo.jpg`
- `public/media/wordswave-product-demo.mp4`
- `src/components/BrandMark.tsx`
- `src/components/ProductVideo.tsx`

Expected modifications:

- `design-tokens.json`
- `src/styles/tokens.css`
- `DESIGN.md`
- `index.html`
- `src/i18n/content.ts`
- shared header and footer;
- page and component typography selectors in `src/styles/global.css`;
- Product page composition;
- route, localization, header, and product tests;
- README media and branding note if needed.

## Testing and acceptance

### Automated

- English and Chinese content render from the same typed content schema.
- The language selection remains persistent.
- All routes retain a single H1 and valid heading order.
- Brand links expose WordsWave home labels.
- The video has autoplay, muted, loop, playsInline, and controls.
- Reduced-motion preference disables video autoplay.
- Existing CAD sample switching and engineering values remain unchanged.
- Old abstract slogans and CAD / AGENT brand labels are absent from runtime source.
- Typecheck, tests, and production build pass.

### Browser verification

Check `/`, `/product`, `/use-cases`, `/docs`, `/about`, and an invalid route at:

- 1440×900;
- 1024×768;
- 768×1024;
- 375×812.

Verify:

- no heading dominates or collapses its section;
- matching roles use matching sizes;
- Chinese titles do not inherit negative tracking;
- body and supporting text remain readable;
- navigation and buttons fit at each breakpoint;
- text measures avoid long or cramped lines;
- WordsWave branding is legible in header and footer;
- the video loads, autoplays muted, loops, remains inline, exposes controls, and preserves aspect ratio;
- the interactive CAD preview still works;
- no horizontal overflow, broken media requests, or console errors occur.
