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
  summary: string
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

export const cadExamples: readonly CadExample[] = [
  {
    id: 'mounting-bracket',
    index: '01',
    title: 'Mounting bracket',
    prompt:
      'Create a 120 × 80 mm mounting bracket with a 36 mm rise, four M8 clearance holes, and 4 mm edge fillets.',
    summary: 'A constrained, manufacturable support bracket generated from engineering intent.',
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
    summary: 'A two-part enclosure with controlled wall thickness, clearance, and service access.',
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
    summary: 'A shop-floor fixture that captures datums, access, and operator-facing labels.',
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
]
