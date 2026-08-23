import { Link } from 'react-router-dom'

export default function AuthNav({ prompt, actionLabel, actionTo }) {
  return (
    <nav className="auth-nav">
      <div className="logo">
        <Link to="/">CrowdNest</Link>
      </div>
      <div className="nav-links">
        <span>{prompt}</span>
        <Link to={actionTo} className="nav-btn">{actionLabel}</Link>
      </div>
    </nav>
  )
}
