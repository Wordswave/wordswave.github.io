import { PageHero } from '../components/PageHero'
import { useLanguage } from '../i18n/LanguageContext'

export function NotFoundPage() {
  const { copy } = useLanguage()

  return (
    <PageHero
      primary={{ href: '/', label: copy.actions.backHome }}
      support={copy.notFound.support}
      title={copy.notFound.title}
    />
  )
}
