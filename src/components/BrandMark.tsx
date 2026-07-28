interface BrandMarkProps {
  className?: string
}

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <span className={className ? `brand-mark ${className}` : 'brand-mark'}>
      <span className="brand-mark-symbol" aria-hidden="true">
        <img alt="" src="/media/wordswave-logo.jpg" />
      </span>
      <span className="brand-mark-name">WordsWave</span>
    </span>
  )
}
