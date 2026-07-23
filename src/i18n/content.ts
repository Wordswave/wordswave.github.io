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
    home: 'CAD Agent — Intent to engineering evidence',
    product: 'Product — CAD Agent',
    useCases: 'Use cases — CAD Agent',
    docs: 'Docs — CAD Agent',
    about: 'About — CAD Agent',
    notFound: 'Page not found — CAD Agent',
  },
  a11y: {
    skip: 'Skip to main content',
    home: 'CAD Agent home',
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
    workspace: 'Explore workspace',
    viewProduct: 'View product',
    viewUseCases: 'View use cases',
    readDocs: 'Read docs',
    backHome: 'Back home',
    backToTop: 'Back to top',
  },
  footer: {
    note: 'The interactive model is an illustrative product preview.',
  },
  home: {
    hero: {
      lines: ['Describe it', 'Shape it', 'Prove it'],
      support: 'Turn engineering intent into editable geometry, visible constraints, and reviewable evidence.',
      action: 'See the workflow',
      scroll: 'Scroll',
      scrollLabel: 'Scroll to product value',
    },
    values: {
      label: 'Core value',
      title: 'CAD you can inspect.',
      support: 'Geometry, decisions, and evidence stay connected.',
      items: [
        {
          title: 'Editable geometry',
          description: 'Keep dimensions, parameters, and features open to change.',
        },
        {
          title: 'Visible evidence',
          description: 'Review constraints and manufacturing checks beside the model.',
        },
        {
          title: 'Reliable handoff',
          description: 'Export the formats your downstream work expects.',
        },
      ],
    },
    workflow: {
      label: 'Workflow',
      title: 'From request to review.',
      support: 'Each step leaves a clear engineering record.',
      steps: [
        {
          title: 'Describe',
          input: 'Engineering intent',
          output: 'Define the part, dimensions, material, and constraints.',
        },
        {
          title: 'Build',
          input: 'Parametric operations',
          output: 'Generate editable geometry and readable features.',
        },
        {
          title: 'Verify',
          input: 'Geometry + DFM checks',
          output: 'Review checks, history, and export options.',
        },
      ],
    },
    closing: {
      label: 'Ready when the model matters',
      title: 'Build with evidence.',
      secondary: 'See product details',
    },
  },
  product: {
    hero: {
      label: 'Product',
      title: 'Model, parameters, evidence.',
      support: 'One workspace for geometry, constraints, checks, history, and export.',
      primary: 'Explore workspace',
      secondary: 'See use cases',
    },
    demo: {
      label: 'Interactive preview',
      title: 'See every decision.',
      support: 'Switch requests to inspect the model, parameters, checks, history, and export package.',
      toolbar: 'CAD Agent / Interactive preview',
      synchronized: 'Model synchronized',
      requests: 'Example requests',
      requestsLabel: 'Example engineering requests',
      prompt: 'Prompt',
      activeModel: 'Active model',
      envelope: 'Envelope',
      viewportMode: 'Isometric / constraints visible',
      parameters: 'Parameters',
      constraintState: 'Constraint state',
      fullyConstrained: 'Fully constrained',
      validation: 'Validation',
      operationHistory: 'Operation history',
      exportManifest: 'Export manifest',
      loaded: 'loaded',
    },
    evidence: {
      label: 'Engineering evidence',
      title: 'Evidence stays with the geometry.',
      action: 'See use cases',
      items: [
        {
          title: 'Parameter record',
          label: 'Editable',
          description: 'Keep dimensions, materials, clearances, and features named.',
          rows: ['Named dimensions', 'Units preserved', 'Revision-safe values'],
        },
        {
          title: 'Geometry checks',
          label: 'Verified',
          description: 'Review solid integrity and constraint state beside the model.',
          rows: ['Watertight body', 'Constraint state', 'Interference review'],
        },
        {
          title: 'Manufacturing review',
          label: 'Practical',
          description: 'Keep wall, draft, access, and process checks visible.',
          rows: ['Minimum wall', 'Draft direction', 'Tool access'],
        },
        {
          title: 'Operation history',
          label: 'Traceable',
          description: 'Follow the sequence from sketch to feature.',
          rows: ['Sketch intent', 'Feature sequence', 'Change history'],
        },
        {
          title: 'Export manifest',
          label: 'Ready',
          description: 'Package geometry and supporting evidence for downstream work.',
          rows: ['STEP / STL', 'SVG / DXF', 'Evidence summary'],
        },
      ],
    },
  },
  useCases: {
    hero: {
      label: 'Use cases',
      title: 'CAD for real parts.',
      support: 'Start with common mechanical tasks and keep the result editable.',
      primary: 'View product',
      secondary: 'Read docs',
    },
    label: 'Common work',
    title: 'Built for parts beyond the screen.',
    support: 'Dimensions, operations, and manufacturability remain part of the result.',
    items: [
      {
        title: 'Brackets + mounts',
        description: 'Create constrained plates, hole patterns, ribs, and fillets.',
      },
      {
        title: 'Jigs + fixtures',
        description: 'Define datums, locating features, and tool access.',
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
      title: 'A clear path to export.',
      support: 'Follow the core workflow from engineering intent to reviewable output.',
      primary: 'View product',
    },
    label: 'First workflow',
    title: 'Four steps. One record.',
    steps: [
      {
        title: 'Describe',
        description: 'State the part, dimensions, material, and constraints.',
      },
      {
        title: 'Review',
        description: 'Inspect editable geometry, parameters, and operation history.',
      },
      {
        title: 'Verify',
        description: 'Review geometry and manufacturing checks beside the model.',
      },
      {
        title: 'Export',
        description: 'Choose an available format for downstream work.',
      },
    ],
    disclosure: 'This site presents the product workflow at a conceptual level.',
  },
  about: {
    hero: {
      label: 'About',
      title: 'Engineering intent, made editable.',
      support: 'CAD Agent connects natural-language requests to inspectable CAD workflows.',
      primary: 'View product',
    },
    label: 'Principles',
    title: 'Clear by design.',
    principles: [
      {
        title: 'Editable',
        description: 'The result stays open to parameter and feature changes.',
      },
      {
        title: 'Inspectible',
        description: 'Constraints, operations, and checks remain visible.',
      },
      {
        title: 'Connected',
        description: 'The request, model, evidence, and export stay in one flow.',
      },
    ],
    disclosure: 'CAD Agent is presented here as a product preview.',
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
        title: 'Assembly verified',
        details: ['Lid clearance verified', 'Draft check passed', 'Boss spacing constrained'],
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
        title: 'Fixture verified',
        details: ['Datum alignment verified', 'Tool access clear', 'Engraving depth valid'],
      },
      operations: ['Base', 'Pockets ×2', 'Datum pins', 'Labels'],
      exports: ['STEP', 'STL', 'PDF'],
    },
  ],
}

const chinese: SiteCopy = {
  meta: {
    home: 'CAD Agent — 从工程意图到可验证结果',
    product: '产品能力 — CAD Agent',
    useCases: '使用场景 — CAD Agent',
    docs: '文档 — CAD Agent',
    about: '关于 — CAD Agent',
    notFound: '页面未找到 — CAD Agent',
  },
  a11y: {
    skip: '跳到主要内容',
    home: 'CAD Agent 首页',
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
    product: '产品能力',
    useCases: '使用场景',
    docs: '文档',
    about: '关于',
  },
  actions: {
    workspace: '进入工作台',
    viewProduct: '查看产品',
    viewUseCases: '查看场景',
    readDocs: '阅读文档',
    backHome: '返回首页',
    backToTop: '返回顶部',
  },
  footer: {
    note: '交互模型为产品功能示意。',
  },
  home: {
    hero: {
      lines: ['描述需求', '生成模型', '验证结果'],
      support: '将工程意图转化为可编辑几何、明确约束与可审查证据。',
      action: '查看流程',
      scroll: '向下',
      scrollLabel: '滚动到产品价值',
    },
    values: {
      label: '核心价值',
      title: '可审查的 CAD。',
      support: '让几何、决策与证据始终相连。',
      items: [
        {
          title: '可编辑几何',
          description: '尺寸、参数与特征始终可以继续调整。',
        },
        {
          title: '可见证据',
          description: '在模型旁查看约束与制造检查。',
        },
        {
          title: '可靠交付',
          description: '按后续工作需要导出可用格式。',
        },
      ],
    },
    workflow: {
      label: '工作流程',
      title: '从需求到审查。',
      support: '每一步都留下清晰的工程记录。',
      steps: [
        {
          title: '描述',
          input: '工程意图',
          output: '定义零件、尺寸、材料与约束。',
        },
        {
          title: '构建',
          input: '参数化操作',
          output: '生成可编辑几何与清晰特征。',
        },
        {
          title: '验证',
          input: '几何与 DFM 检查',
          output: '查看检查、历史与导出选项。',
        },
      ],
    },
    closing: {
      label: '当模型真正重要',
      title: '让模型带上证据。',
      secondary: '查看产品详情',
    },
  },
  product: {
    hero: {
      label: '产品能力',
      title: '模型、参数与证据。',
      support: '在一个工作区连接几何、约束、检查、历史与导出。',
      primary: '进入工作台',
      secondary: '查看使用场景',
    },
    demo: {
      label: '交互预览',
      title: '看清每个决策。',
      support: '切换需求，检查模型、参数、验证、历史与导出内容。',
      toolbar: 'CAD Agent / 交互预览',
      synchronized: '模型已同步',
      requests: '示例需求',
      requestsLabel: '工程需求示例',
      prompt: '需求',
      activeModel: '当前模型',
      envelope: '外形尺寸',
      viewportMode: '等轴测 / 约束可见',
      parameters: '参数',
      constraintState: '约束状态',
      fullyConstrained: '完全约束',
      validation: '验证',
      operationHistory: '操作历史',
      exportManifest: '导出清单',
      loaded: '已加载',
    },
    evidence: {
      label: '工程证据',
      title: '证据始终与几何相连。',
      action: '查看使用场景',
      items: [
        {
          title: '参数记录',
          label: '可编辑',
          description: '保留具名的尺寸、材料、间隙与特征。',
          rows: ['具名尺寸', '保留单位', '安全修订'],
        },
        {
          title: '几何检查',
          label: '已验证',
          description: '在模型旁查看实体完整性与约束状态。',
          rows: ['封闭实体', '约束状态', '干涉检查'],
        },
        {
          title: '制造审查',
          label: '可落地',
          description: '持续显示壁厚、拔模、空间与工艺检查。',
          rows: ['最小壁厚', '拔模方向', '工具空间'],
        },
        {
          title: '操作历史',
          label: '可追溯',
          description: '沿草图到特征查看完整构建顺序。',
          rows: ['草图意图', '特征顺序', '变更历史'],
        },
        {
          title: '导出清单',
          label: '可交付',
          description: '为后续工作打包几何与配套证据。',
          rows: ['STEP / STL', 'SVG / DXF', '证据摘要'],
        },
      ],
    },
  },
  useCases: {
    hero: {
      label: '使用场景',
      title: '面向真实零件的 CAD。',
      support: '从常见机械任务开始，始终保持结果可编辑。',
      primary: '查看产品',
      secondary: '阅读文档',
    },
    label: '常见工作',
    title: '为屏幕之外的零件而生。',
    support: '尺寸、操作与可制造性始终属于结果的一部分。',
    items: [
      {
        title: '支架与安装件',
        description: '创建带约束的板件、孔阵列、加强筋与圆角。',
      },
      {
        title: '工装与夹具',
        description: '定义基准、定位特征与工具空间。',
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
      title: '从需求到导出的清晰路径。',
      support: '沿核心流程，将工程意图转化为可审查结果。',
      primary: '查看产品',
    },
    label: '首次使用',
    title: '四个步骤，一份记录。',
    steps: [
      {
        title: '描述',
        description: '说明零件、尺寸、材料与约束。',
      },
      {
        title: '审查',
        description: '检查可编辑几何、参数与操作历史。',
      },
      {
        title: '验证',
        description: '在模型旁查看几何与制造检查。',
      },
      {
        title: '导出',
        description: '选择可用格式，衔接后续工作。',
      },
    ],
    disclosure: '本网站以概念层级展示产品工作流程。',
  },
  about: {
    hero: {
      label: '关于',
      title: '让工程意图保持可编辑。',
      support: 'CAD Agent 将自然语言需求连接到可审查的 CAD 工作流。',
      primary: '查看产品',
    },
    label: '产品原则',
    title: '清晰，贯穿始终。',
    principles: [
      {
        title: '可编辑',
        description: '结果始终可以调整参数与特征。',
      },
      {
        title: '可审查',
        description: '约束、操作与检查保持可见。',
      },
      {
        title: '相连接',
        description: '需求、模型、证据与导出处于同一流程。',
      },
    ],
    disclosure: 'CAD Agent 在此以产品预览形式呈现。',
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
        title: '装配已验证',
        details: ['上盖间隙已验证', '拔模检查通过', '支柱间距已约束'],
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
        title: '夹具已验证',
        details: ['基准对齐已验证', '工具空间充足', '刻字深度有效'],
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
