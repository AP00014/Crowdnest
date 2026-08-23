import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useNavMenu } from '../hooks/useNavMenu'
import { scrollToId } from '../hooks/useHashScroll'
import '../styles/header.css'

const navLinks = [
  { label: 'Home', to: '/#home', hash: 'home' },
  { label: 'Explore projects', to: '/#explore', hash: 'explore' },
  { label: 'How it works', to: '/#how-it-works', hash: 'how-it-works' },
]

export default function Header() {
  const { navRef, open, setOpen, toggle } = useNavMenu()
  const { user, logout } = useAuth()
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef(null)

  useEffect(() => {
    function onPointerDown(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false)
      }
    }

    function onKeyDown(event) {
      if (event.key === 'Escape') setProfileOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  function handleLogout() {
    setProfileOpen(false)
    setOpen(false)
    logout()
  }

  return (
    <header className="site-header">
      <nav
        ref={navRef}
        className={`site-nav${open ? ' site-nav--open' : ''}`}
        id="site-nav"
        aria-label="Primary"
      >
        <div
          className="nav-backdrop"
          hidden={!open}
          onClick={() => setOpen(false)}
        />

        <div className="left-links">
          <button
            type="button"
            className="nav-menu-toggle"
            aria-expanded={open}
            aria-controls="nav-mobile-drawer"
            onClick={toggle}
          >
            <span className="visually-hidden">Menu</span>
            <i className="ri-menu-line nav-menu-toggle__icon nav-menu-toggle__icon--menu" aria-hidden="true" />
            <i className="ri-close-line nav-menu-toggle__icon nav-menu-toggle__icon--close" aria-hidden="true" />
          </button>

          <div className="logo">
            <Link to="/#home" onClick={() => scrollToId('home')}>CrowdNest</Link>
          </div>

          <ul className="nav-desktop-list">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} onClick={() => scrollToId(link.hash)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="middle">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search for projects..."
          />
          <button type="button" className="search_btn" aria-label="Search">
            <i className="ri-search-line" />
          </button>
        </div>

        <div className="right-links">
          {user ? (
            <>
              <Link to="/start-campaign" className="nav-auth nav-auth--ghost">
                Start a campaign
              </Link>
              <div className="nav-profile" ref={profileRef}>
                <button
                  type="button"
                  className={`nav-user${profileOpen ? ' nav-user--open' : ''}`}
                  aria-expanded={profileOpen}
                  aria-haspopup="menu"
                  aria-controls="nav-profile-menu"
                  onClick={() => setProfileOpen((value) => !value)}
                >
                  <span className="nav-user__avatar" aria-hidden="true">
                    {user.firstname.slice(0, 1).toUpperCase()}
                  </span>
                  <span className="nav-user__name">{user.firstname}</span>
                  <i className="ri-arrow-down-s-line nav-user__caret" aria-hidden="true" />
                </button>

                {profileOpen ? (
                  <div className="nav-profile__menu" id="nav-profile-menu" role="menu">
                    <div className="nav-profile__meta">
                      <strong>{user.firstname} {user.lastname}</strong>
                      <span>{user.email}</span>
                    </div>
                    <Link
                      to="/start-campaign"
                      role="menuitem"
                      className="nav-profile__item"
                      onClick={() => setProfileOpen(false)}
                    >
                      Start a campaign
                    </Link>
                    <button
                      type="button"
                      role="menuitem"
                      className="nav-profile__item nav-profile__item--danger"
                      onClick={handleLogout}
                    >
                      <i className="ri-logout-box-r-line" aria-hidden="true" />
                      Log out
                    </button>
                  </div>
                ) : null}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-auth">Log in</Link>
              <Link to="/signup" className="nav-auth nav-auth--primary">Sign up</Link>
            </>
          )}
        </div>

        <div
          id="nav-mobile-drawer"
          className={`nav-mobile-drawer${open ? ' nav-mobile-drawer--open' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          aria-hidden={!open}
        >
          <ul className="nav-mobile-drawer__list">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  onClick={() => {
                    setOpen(false)
                    scrollToId(link.hash)
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {user ? (
              <>
                <li>
                  <Link to="/start-campaign" onClick={() => setOpen(false)}>
                    Start a campaign
                  </Link>
                </li>
                <li>
                  <button type="button" onClick={handleLogout}>
                    Log out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" onClick={() => setOpen(false)}>Log in</Link>
                </li>
                <li>
                  <Link to="/signup" onClick={() => setOpen(false)}>Sign up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  )
}
