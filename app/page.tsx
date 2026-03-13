import { Header } from '@/components/header'
import { HeroSection } from '@/components/landing/hero-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { TerminalSection } from '@/components/landing/terminal-section'
import { PerformanceSection } from '@/components/landing/performance-section'
import { InstitutionalSection } from '@/components/landing/institutional-section'
import { ChangelogSection } from '@/components/landing/changelog-section'
import { CtaSection } from '@/components/landing/cta-section'
import { Footer } from '@/components/footer'
import { catalogueEntries } from '@/lib/velite-data'

export default function Home() {
  return (
    <main className="min-h-screen bg-background" id="main-content">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <TerminalSection datasets={catalogueEntries.datasets} />
      <PerformanceSection />
      <InstitutionalSection />
      <ChangelogSection />
      <CtaSection />
      <Footer />
    </main>
  )
}
