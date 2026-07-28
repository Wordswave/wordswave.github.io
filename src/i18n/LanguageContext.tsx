import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { content, type Language } from './content'

const STORAGE_KEY = 'wordswave.language'

interface LanguageContextValue {
  language: Language
  copy: (typeof content)[Language]
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function detectLanguage(): Language {
  const stored = window.localStorage.getItem(STORAGE_KEY)

  if (stored === 'en' || stored === 'zh') {
    return stored
  }

  const locales = navigator.languages.length > 0 ? navigator.languages : [navigator.language]
  return locales.some((locale) => locale.toLowerCase().startsWith('zh-')) ? 'zh' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(detectLanguage)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language)
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
  }, [language])

  const value = useMemo(
    () => ({
      language,
      copy: content[language],
      setLanguage,
    }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }

  return context
}

export { STORAGE_KEY }
