import { ClosingCta } from './components/ClosingCta'
import { EditorialIntro } from './components/EditorialIntro'
import { EvidenceGrid } from './components/EvidenceGrid'
import { Hero } from './components/Hero'
import { ProductDemo } from './components/ProductDemo'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import { UseCases } from './components/UseCases'
import { Workflow } from './components/Workflow'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content">
        <Hero />
        <EditorialIntro />
        <Workflow />
        <ProductDemo />
        <EvidenceGrid />
        <UseCases />
        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  )
}
