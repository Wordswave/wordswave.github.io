interface SectionLabelProps {
  index: string
  children: string
  className?: string
}

export function SectionLabel({ index, children, className = '' }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="eyebrow">{index}</span>
      <span aria-hidden="true" className="h-px min-w-8 flex-1 bg-rule" />
      <span className="eyebrow">{children}</span>
    </div>
  )
}
