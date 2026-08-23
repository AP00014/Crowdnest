import { useState } from 'react'
import HeroSection from '../components/HeroSection'
import ProjectsShowcase from '../components/ProjectsShowcase'
import DiscoverSection from '../components/DiscoverSection'
import CrowdFeed from '../components/CrowdFeed'
import HowItWorks from '../components/HowItWorks'
import PaymentModal from '../components/PaymentModal'

export default function HomePage() {
  const [payment, setPayment] = useState(null)

  function openPayment({ project, currency }) {
    setPayment({ project, currency })
  }

  return (
    <>
      <HeroSection />
      <ProjectsShowcase onFund={openPayment} />
      <DiscoverSection onFund={openPayment} />
      <CrowdFeed />
      <HowItWorks />
      <PaymentModal
        open={!!payment}
        project={payment?.project ?? ''}
        currency={payment?.currency ?? '$'}
        onClose={() => setPayment(null)}
      />
    </>
  )
}
