import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useHashScroll } from '../hooks/useHashScroll'

export default function MainLayout() {
  useHashScroll()

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
