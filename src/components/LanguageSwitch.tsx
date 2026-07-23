import { useLanguage } from '../i18n/LanguageContext'
import type { Language } from '../i18n/content'

const options: readonly { label: string; value: Language }[] = [
  { label: 'EN', value: 'en' },
  { label: '中文', value: 'zh' },
]

export function LanguageSwitch() {
  const { copy, language, setLanguage } = useLanguage()

  return (
    <div aria-label={copy.a11y.language} className="language-switch" role="group">
      {options.map((option) => (
        <button
          aria-pressed={language === option.value}
          key={option.value}
          onClick={() => setLanguage(option.value)}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
