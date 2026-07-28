import { EvidenceGrid } from '../components/EvidenceGrid'
import { PageHero } from '../components/PageHero'
import { ProductDemo } from '../components/ProductDemo'
import { ProductVideo } from '../components/ProductVideo'
import { workspaceUrl } from '../config'
import { useLanguage } from '../i18n/LanguageContext'

export function ProductPage() {
  const { copy } = useLanguage()
  const hero = copy.product.hero

  return (
    <>
      <PageHero
        label={hero.label}
        primary={{ href: workspaceUrl, label: hero.primary, external: true }}
        secondary={{ href: '/use-cases', label: hero.secondary ?? copy.actions.viewUseCases }}
        support={hero.support}
        title={hero.title}
      />
      <ProductVideo />
      <ProductDemo />
      <EvidenceGrid />
    </>
  )
}
