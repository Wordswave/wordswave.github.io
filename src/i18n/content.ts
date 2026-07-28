export type Language = 'en' | 'zh'
export type PageKey = 'home' | 'product' | 'useCases' | 'docs' | 'about' | 'notFound'
export type CadModelKind = 'bracket' | 'enclosure' | 'jig'

export interface CadDatum {
  label: string
  value: string
}

export interface CadExample {
  id: string
  index: string
  title: string
  prompt: string
  envelope: string
  model: CadModelKind
  parameters: readonly CadDatum[]
  constraints: number
  validation: {
    title: string
    details: readonly string[]
  }
  operations: readonly string[]
  exports: readonly string[]
}

interface HeroCopy {
  label: string
  title: string
  support: string
  primary: string
  secondary?: string
}

interface ListItem {
  title: string
  description: string
}

interface SiteCopy {
  meta: Record<PageKey, string>
  a11y: {
    skip: string
    home: string
    primaryNav: string
    mobileNav: string
    footerNav: string
    openNav: string
    closeNav: string
    language: string
    selectedExample: string
  }
  nav: {
    home: string
    product: string
    useCases: string
    docs: string
    about: string
  }
  actions: {
    workspace: string
    viewProduct: string
    viewUseCases: string
    readDocs: string
    backHome: string
    backToTop: string
  }
  footer: {
    note: string
  }
  home: {
    hero: {
      lines: readonly [string, string, string]
      support: string
      action: string
      scroll: string
      scrollLabel: string
    }
    values: {
      label: string
      title: string
      support: string
      items: readonly ListItem[]
    }
    workflow: {
      label: string
      title: string
      support: string
      steps: readonly {
        title: string
        input: string
        output: string
      }[]
    }
    closing: {
      label: string
      title: string
      secondary: string
    }
  }
  product: {
    hero: HeroCopy
    video: {
      label: string
      title: string
      ariaLabel: string
      fallback: string
    }
    demo: {
      label: string
      title: string
      support: string
      toolbar: string
      synchronized: string
      requests: string
      requestsLabel: string
      prompt: string
      activeModel: string
      envelope: string
      viewportMode: string
      parameters: string
      constraintState: string
      fullyConstrained: string
      validation: string
      operationHistory: string
      exportManifest: string
      loaded: string
    }
    evidence: {
      label: string
      title: string
      action: string
      items: readonly {
        title: string
        label: string
        description: string
        rows: readonly string[]
      }[]
    }
  }
  useCases: {
    hero: HeroCopy
    label: string
    title: string
    support: string
    items: readonly ListItem[]
  }
  docs: {
    hero: HeroCopy
    label: string
    title: string
    steps: readonly ListItem[]
    disclosure: string
  }
  about: {
    hero: HeroCopy
    label: string
    title: string
    principles: readonly ListItem[]
    disclosure: string
  }
  notFound: {
    label: string
    title: string
    support: string
  }
  cadExamples: readonly CadExample[]
}

const english: SiteCopy = {
  meta: {
    home: 'WordsWave — Natural-language CAD workspace',
    product: 'Product — WordsWave',
    useCases: 'Use cases — WordsWave',
    docs: 'Docs — WordsWave',
    about: 'About — WordsWave',
    notFound: 'Page not found — WordsWave',
  },
  a11y: {
    skip: 'Skip to main content',
    home: 'WordsWave home',
    primaryNav: 'Primary navigation',
    mobileNav: 'Mobile navigation',
    footerNav: 'Footer navigation',
    openNav: 'Open navigation',
    closeNav: 'Close navigation',
    language: 'Language',
    selectedExample: 'Selected example',
  },
  nav: {
    home: 'Home',
    product: 'Product',
    useCases: 'Use cases',
    docs: 'Docs',
    about: 'About',
  },
  actions: {
    workspace: 'Open workspace',
    viewProduct: 'Explore product',
    viewUseCases: 'View use cases',
    readDocs: 'Read docs',
    backHome: 'Back home',
    backToTop: 'Back to top',
  },
  footer: {
    note: 'The interactive model on this website is an illustrative preview of the WordsWave workspace.',
  },
  home: {
    hero: {
      lines: ['Describe the part', 'Create the model', 'Review the result'],
      support:
        'Create or modify CAD designs from an engineering request, then review the model, parameters, engineering checks, history, and downloadable files.',
      action: 'View the workflow',
      scroll: 'Scroll',
      scrollLabel: 'Scroll to the core workflow',
    },
    values: {
      label: 'Core workflow',
      title: 'Complete the core CAD workflow in one workspace.',
      support: 'Create or modify a design, inspect the result, and download the available files.',
      items: [
        {
          title: 'Natural-language CAD',
          description: 'Create or modify a CAD design from a written engineering request.',
        },
        {
          title: 'Model review',
          description: 'Inspect the preview, parameters, operation history, and engineering checks.',
        },
        {
          title: 'File export',
          description: 'Download the formats available for the generated design.',
        },
      ],
    },
    workflow: {
      label: 'Workflow',
      title: 'From engineering request to downloadable CAD output.',
      support: 'Each step keeps the model information available for review and revision.',
      steps: [
        {
          title: 'Describe',
          input: 'Engineering request',
          output: 'Specify the part, dimensions, material, and design constraints.',
        },
        {
          title: 'Create',
          input: 'CAD generation',
          output: 'Generate editable geometry with an ordered operation history.',
        },
        {
          title: 'Review',
          input: 'Engineering checks',
          output: 'Inspect parameters, engineering checks, history, and available export formats.',
        },
      ],
    },
    closing: {
      label: 'Start with a specific engineering request',
      title: 'Create the model, review the output, and continue editing.',
      secondary: 'Explore product capabilities',
    },
  },
  product: {
    hero: {
      label: 'Product',
      title: 'Create, edit, and review CAD in one workspace.',
      support:
        'Use natural language to generate or modify a design, inspect the result, adjust parameters, run available checks, and download files.',
      primary: 'Open workspace',
      secondary: 'View use cases',
    },
    video: {
      label: 'Product demo',
      title: 'See the workspace in use.',
      ariaLabel: 'WordsWave product demo',
      fallback: 'Your browser cannot play this product demo.',
    },
    demo: {
      label: 'Interactive preview',
      title: 'Inspect a complete sample result.',
      support: 'Switch example requests to review the model, parameters, engineering checks, operation history, and export formats.',
      toolbar: 'WordsWave / Interactive preview',
      synchronized: 'Sample model loaded',
      requests: 'Example requests',
      requestsLabel: 'Example engineering requests',
      prompt: 'Engineering request',
      activeModel: 'Sample model',
      envelope: 'Overall size',
      viewportMode: 'Isometric / constraints shown',
      parameters: 'Parameters',
      constraintState: 'Constraint state',
      fullyConstrained: 'Fully constrained',
      validation: 'Engineering checks',
      operationHistory: 'Operation history',
      exportManifest: 'Export formats',
      loaded: 'loaded',
    },
    evidence: {
      label: 'Model review',
      title: 'Review the model information before download.',
      action: 'View use cases',
      items: [
        {
          title: 'Model parameters',
          label: 'Named values',
          description: 'Review named dimensions, material, clearances, and feature values.',
          rows: ['Named dimensions', 'Units', 'Revision values'],
        },
        {
          title: 'Geometry checks',
          label: 'Model checks',
          description: 'Review solid integrity, constraint state, and available interference results.',
          rows: ['Watertight solid', 'Constraint state', 'Interference results'],
        },
        {
          title: 'Manufacturing checks',
          label: 'Available checks',
          description: 'Review available wall thickness, draft, and tool-access results.',
          rows: ['Minimum wall', 'Draft direction', 'Tool access'],
        },
        {
          title: 'Operation history',
          label: 'Build sequence',
          description: 'Follow the ordered steps used to create the model.',
          rows: ['Sketch', 'Feature sequence', 'Change history'],
        },
        {
          title: 'Export formats',
          label: 'Available files',
          description: 'Review the geometry and supporting files available for download.',
          rows: ['STEP / STL', 'SVG / DXF', 'Model information'],
        },
      ],
    },
  },
  useCases: {
    hero: {
      label: 'Use cases',
      title: 'CAD workflows for common mechanical design tasks.',
      support: 'Create editable designs for brackets, fixtures, enclosures, and prototype mechanisms.',
      primary: 'Explore product',
      secondary: 'Read docs',
    },
    label: 'Applications',
    title: 'Common engineering use cases.',
    support: 'Start with an engineering request, then review the resulting model and available checks.',
    items: [
      {
        title: 'Brackets + mounts',
        description: 'Create constrained plates, hole patterns, ribs, and fillets.',
      },
      {
        title: 'Jigs + fixtures',
        description: 'Define datums, locating features, and tool-access clearances.',
      },
      {
        title: 'Product enclosures',
        description: 'Build shells, lids, bosses, vents, and assembly clearances.',
      },
      {
        title: 'Prototype mechanisms',
        description: 'Create editable concept geometry for changing requirements.',
      },
    ],
  },
  docs: {
    hero: {
      label: 'Docs',
      title: 'Understand the core CAD workflow.',
      support: 'Learn how to describe a part, review the generated model, check the result, and download files.',
      primary: 'Explore product',
    },
    label: 'Core workflow',
    title: 'From engineering request to file export.',
    steps: [
      {
        title: 'Describe',
        description: 'Specify the part, dimensions, material, and design constraints.',
      },
      {
        title: 'Review',
        description: 'Inspect the model preview, parameters, and operation history.',
      },
      {
        title: 'Verify',
        description: 'Review the available geometry and manufacturing checks.',
      },
      {
        title: 'Export',
        description: 'Choose an available format for downstream work.',
      },
    ],
    disclosure: 'This website provides an overview of the current product workflow. Detailed guidance will be added as the product documentation develops.',
  },
  about: {
    hero: {
      label: 'About',
      title: 'An AI engineering workspace for CAD creation and review.',
      support: 'WordsWave connects natural-language engineering requests with editable CAD models, engineering checks, history, and file export.',
      primary: 'Explore product',
    },
    label: 'Product approach',
    title: 'Designed for practical engineering work.',
    principles: [
      {
        title: 'Editable models',
        description: 'Generated designs remain available for parameter and feature changes.',
      },
      {
        title: 'Reviewable results',
        description: 'Model parameters, operation history, and available checks are presented for review.',
      },
      {
        title: 'Clear workflow',
        description: 'The engineering request, model review, and available exports are handled in one workspace.',
      },
    ],
    disclosure: 'This website presents the current WordsWave product direction and workflow.',
  },
  notFound: {
    label: '404',
    title: 'Page not found.',
    support: 'The page may have moved or the address may be incorrect.',
  },
  cadExamples: [
    {
      id: 'mounting-bracket',
      index: '01',
      title: 'Mounting bracket',
      prompt:
        'Create a 120 × 80 mm mounting bracket with a 36 mm rise, four M8 clearance holes, and 4 mm edge fillets.',
      envelope: '120 × 80 × 36 mm',
      model: 'bracket',
      parameters: [
        { label: 'Plate', value: '6.0 mm' },
        { label: 'Holes', value: 'Ø 8.5 mm' },
        { label: 'Fillet', value: 'R 4.0 mm' },
        { label: 'Material', value: '6061-T6' },
      ],
      constraints: 8,
      validation: {
        title: 'Ready for review',
        details: ['Watertight solid', 'Minimum wall 6.0 mm', 'Hole spacing verified'],
      },
      operations: ['Sketch', 'Extrude', 'Hole ×4', 'Fillet'],
      exports: ['STEP', 'STL', 'SVG'],
    },
    {
      id: 'electronics-enclosure',
      index: '02',
      title: 'Electronics enclosure',
      prompt:
        'Build a 160 × 96 × 42 mm electronics enclosure with a removable lid, PCB bosses, side vents, and 0.3 mm assembly clearance.',
      envelope: '160 × 96 × 42 mm',
      model: 'enclosure',
      parameters: [
        { label: 'Wall', value: '2.4 mm' },
        { label: 'Clearance', value: '0.3 mm' },
        { label: 'Corner', value: 'R 8.0 mm' },
        { label: 'Draft', value: '1.5°' },
      ],
      constraints: 14,
      validation: {
        title: 'Assembly checks complete',
        details: ['Lid clearance checked', 'Draft check passed', 'Boss spacing constrained'],
      },
      operations: ['Shell', 'Bosses ×4', 'Vent array', 'Lid split'],
      exports: ['STEP', 'STL', 'DXF'],
    },
    {
      id: 'alignment-jig',
      index: '03',
      title: 'Alignment jig',
      prompt:
        'Design a 210 × 70 mm alignment jig with two 6 mm datum pins, a 3 mm locating pocket, and engraved setup labels.',
      envelope: '210 × 70 × 24 mm',
      model: 'jig',
      parameters: [
        { label: 'Datums', value: '96 mm' },
        { label: 'Pins', value: 'Ø 6.0 mm' },
        { label: 'Pocket', value: '3.0 mm' },
        { label: 'Label depth', value: '0.4 mm' },
      ],
      constraints: 11,
      validation: {
        title: 'Fixture checks complete',
        details: ['Datum alignment checked', 'Tool access clear', 'Engraving depth valid'],
      },
      operations: ['Base', 'Pockets ×2', 'Datum pins', 'Labels'],
      exports: ['STEP', 'STL', 'PDF'],
    },
  ],
}

const chinese: SiteCopy = {
  meta: {
    home: 'WordsWave — 自然语言 CAD 工作区',
    product: '产品 — WordsWave',
    useCases: '应用场景 — WordsWave',
    docs: '文档 — WordsWave',
    about: '关于 — WordsWave',
    notFound: '页面未找到 — WordsWave',
  },
  a11y: {
    skip: '跳到主要内容',
    home: 'WordsWave 首页',
    primaryNav: '主导航',
    mobileNav: '移动端导航',
    footerNav: '页脚导航',
    openNav: '打开导航',
    closeNav: '关闭导航',
    language: '语言',
    selectedExample: '已选示例',
  },
  nav: {
    home: '首页',
    product: '产品',
    useCases: '应用场景',
    docs: '文档',
    about: '关于',
  },
  actions: {
    workspace: '打开工作区',
    viewProduct: '查看产品',
    viewUseCases: '查看应用场景',
    readDocs: '阅读文档',
    backHome: '返回首页',
    backToTop: '返回顶部',
  },
  footer: {
    note: '本网站中的交互模型为 WordsWave 工作区的功能示意。',
  },
  home: {
    hero: {
      lines: ['描述零件需求', '生成 CAD 模型', '检查输出结果'],
      support: '根据工程需求创建或修改 CAD 设计，并查看模型、参数、工程检查、历史记录和可下载文件。',
      action: '查看工作流程',
      scroll: '向下',
      scrollLabel: '滚动到核心流程',
    },
    values: {
      label: '核心流程',
      title: '在一个工作区完成 CAD 核心流程。',
      support: '创建或修改设计，检查输出结果，并下载当前可用文件。',
      items: [
        {
          title: '自然语言 CAD',
          description: '通过书面工程需求创建或修改 CAD 设计。',
        },
        {
          title: '模型检查',
          description: '查看模型预览、参数、操作历史和工程检查。',
        },
        {
          title: '文件导出',
          description: '下载当前设计可用的文件格式。',
        },
      ],
    },
    workflow: {
      label: '工作流程',
      title: '从工程需求到可下载的 CAD 输出。',
      support: '各步骤保留模型信息，便于检查和继续修改。',
      steps: [
        {
          title: '描述',
          input: '工程需求',
          output: '说明零件、尺寸、材料和设计约束。',
        },
        {
          title: '创建',
          input: 'CAD 生成',
          output: '生成可编辑几何和有序操作历史。',
        },
        {
          title: '检查',
          input: '工程检查',
          output: '查看参数、工程检查、历史记录和可用导出格式。',
        },
      ],
    },
    closing: {
      label: '从具体工程需求开始',
      title: '创建模型、检查输出并继续编辑。',
      secondary: '查看产品能力',
    },
  },
  product: {
    hero: {
      label: '产品',
      title: '在一个工作区创建、编辑和检查 CAD。',
      support: '使用自然语言生成或修改设计，查看结果、调整参数、运行可用检查并下载文件。',
      primary: '打开工作区',
      secondary: '查看应用场景',
    },
    video: {
      label: '产品演示',
      title: '查看工作区的实际操作。',
      ariaLabel: 'WordsWave 产品演示',
      fallback: '当前浏览器无法播放此产品演示。',
    },
    demo: {
      label: '交互预览',
      title: '查看完整示例结果。',
      support: '切换示例需求，查看模型、参数、工程检查、操作历史和导出格式。',
      toolbar: 'WordsWave / 交互预览',
      synchronized: '示例模型已加载',
      requests: '示例需求',
      requestsLabel: '工程需求示例',
      prompt: '工程需求',
      activeModel: '示例模型',
      envelope: '外形尺寸',
      viewportMode: '等轴测 / 显示约束',
      parameters: '参数',
      constraintState: '约束状态',
      fullyConstrained: '完全约束',
      validation: '工程检查',
      operationHistory: '操作历史',
      exportManifest: '导出格式',
      loaded: '已加载',
    },
    evidence: {
      label: '模型检查',
      title: '下载前检查模型信息。',
      action: '查看应用场景',
      items: [
        {
          title: '模型参数',
          label: '具名数值',
          description: '查看具名尺寸、材料、间隙和特征数值。',
          rows: ['具名尺寸', '单位', '修订数值'],
        },
        {
          title: '几何检查',
          label: '模型检查',
          description: '查看实体完整性、约束状态和可用干涉检查结果。',
          rows: ['封闭实体', '约束状态', '干涉结果'],
        },
        {
          title: '制造检查',
          label: '可用检查',
          description: '查看可用的壁厚、拔模和工具空间检查结果。',
          rows: ['最小壁厚', '拔模方向', '工具空间'],
        },
        {
          title: '操作历史',
          label: '构建顺序',
          description: '按顺序查看模型的创建步骤。',
          rows: ['草图', '特征顺序', '变更历史'],
        },
        {
          title: '导出格式',
          label: '可用文件',
          description: '查看可下载的几何文件和配套信息。',
          rows: ['STEP / STL', 'SVG / DXF', '模型信息'],
        },
      ],
    },
  },
  useCases: {
    hero: {
      label: '应用场景',
      title: '适用于常见机械设计任务的 CAD 工作流程。',
      support: '创建支架、夹具、外壳和原型机构等可编辑设计。',
      primary: '查看产品',
      secondary: '阅读文档',
    },
    label: '应用',
    title: '常见工程应用场景。',
    support: '从工程需求开始，检查生成的模型和当前可用检查。',
    items: [
      {
        title: '支架与安装件',
        description: '创建带约束的板件、孔阵列、加强筋与圆角。',
      },
      {
        title: '工装与夹具',
        description: '定义基准、定位特征和工具空间间隙。',
      },
      {
        title: '产品外壳',
        description: '构建壳体、上盖、支柱、通风口与装配间隙。',
      },
      {
        title: '原型机构',
        description: '为变化中的需求创建可编辑概念几何。',
      },
    ],
  },
  docs: {
    hero: {
      label: '文档',
      title: '了解 CAD 核心工作流程。',
      support: '了解如何描述零件、检查生成模型、查看检查结果并下载文件。',
      primary: '查看产品',
    },
    label: '核心流程',
    title: '从工程需求到文件导出。',
    steps: [
      {
        title: '描述',
        description: '说明零件、尺寸、材料和设计约束。',
      },
      {
        title: '审查',
        description: '查看模型预览、参数和操作历史。',
      },
      {
        title: '验证',
        description: '查看当前可用的几何和制造检查。',
      },
      {
        title: '导出',
        description: '选择可用格式，衔接后续工作。',
      },
    ],
    disclosure: '本网站概述当前产品工作流程。随着产品文档完善，将补充更详细的使用说明。',
  },
  about: {
    hero: {
      label: '关于',
      title: '用于 CAD 创建与检查的 AI 工程工作区。',
      support: 'WordsWave 将自然语言工程需求与可编辑 CAD 模型、工程检查、历史记录和文件导出整合在一个工作区。',
      primary: '查看产品',
    },
    label: '产品方式',
    title: '面向实际工程工作设计。',
    principles: [
      {
        title: '可编辑模型',
        description: '生成的设计支持继续调整参数和特征。',
      },
      {
        title: '可检查结果',
        description: '集中查看模型参数、操作历史和当前可用检查。',
      },
      {
        title: '清晰流程',
        description: '在一个工作区处理工程需求、模型检查和可用导出文件。',
      },
    ],
    disclosure: '本网站展示 WordsWave 当前的产品方向和工作流程。',
  },
  notFound: {
    label: '404',
    title: '页面未找到。',
    support: '页面可能已移动，或地址有误。',
  },
  cadExamples: [
    {
      id: 'mounting-bracket',
      index: '01',
      title: '安装支架',
      prompt: '创建 120 × 80 mm 安装支架，高 36 mm，包含四个 M8 间隙孔与 4 mm 边缘圆角。',
      envelope: '120 × 80 × 36 mm',
      model: 'bracket',
      parameters: [
        { label: '板厚', value: '6.0 mm' },
        { label: '孔径', value: 'Ø 8.5 mm' },
        { label: '圆角', value: 'R 4.0 mm' },
        { label: '材料', value: '6061-T6' },
      ],
      constraints: 8,
      validation: {
        title: '可供审查',
        details: ['封闭实体', '最小壁厚 6.0 mm', '孔距已验证'],
      },
      operations: ['草图', '拉伸', '孔 ×4', '圆角'],
      exports: ['STEP', 'STL', 'SVG'],
    },
    {
      id: 'electronics-enclosure',
      index: '02',
      title: '电子设备外壳',
      prompt: '构建 160 × 96 × 42 mm 电子设备外壳，包含可拆上盖、PCB 支柱、侧面通风口与 0.3 mm 装配间隙。',
      envelope: '160 × 96 × 42 mm',
      model: 'enclosure',
      parameters: [
        { label: '壁厚', value: '2.4 mm' },
        { label: '间隙', value: '0.3 mm' },
        { label: '转角', value: 'R 8.0 mm' },
        { label: '拔模', value: '1.5°' },
      ],
      constraints: 14,
      validation: {
        title: '装配检查完成',
        details: ['上盖间隙已检查', '拔模检查通过', '支柱间距已约束'],
      },
      operations: ['抽壳', '支柱 ×4', '通风阵列', '上盖分割'],
      exports: ['STEP', 'STL', 'DXF'],
    },
    {
      id: 'alignment-jig',
      index: '03',
      title: '对齐夹具',
      prompt: '设计 210 × 70 mm 对齐夹具，包含两个 6 mm 基准销、3 mm 定位槽与雕刻装配标记。',
      envelope: '210 × 70 × 24 mm',
      model: 'jig',
      parameters: [
        { label: '基准距', value: '96 mm' },
        { label: '销径', value: 'Ø 6.0 mm' },
        { label: '槽深', value: '3.0 mm' },
        { label: '刻字深度', value: '0.4 mm' },
      ],
      constraints: 11,
      validation: {
        title: '夹具检查完成',
        details: ['基准对齐已检查', '工具空间充足', '刻字深度有效'],
      },
      operations: ['底座', '凹槽 ×2', '基准销', '标记'],
      exports: ['STEP', 'STL', 'PDF'],
    },
  ],
}

export const content: Record<Language, SiteCopy> = {
  en: english,
  zh: chinese,
}
