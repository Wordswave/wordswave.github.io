import { PageHero } from '../components/PageHero'
import { UseCases } from '../components/UseCases'
import { useLanguage } from '../i18n/LanguageContext'

export function UseCasesPage() {
  const { copy } = useLanguage()
  const hero = copy.useCases.hero

  return (
    <>
      <PageHero
        primary={{ href: '/product', label: hero.primary }}
        secondary={{ href: '/docs', label: hero.secondary ?? copy.actions.readDocs }}
        support={hero.support}
        title={hero.title}
      />
      <UseCases />
    </>
  )
}
