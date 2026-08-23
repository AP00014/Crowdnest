import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import PaymentModal from '../components/PaymentModal'
import { categories, getCategory, getCategoryProjects } from '../data/categories'
import '../styles/category.css'

export default function CategoryPage() {
  const { slug } = useParams()
  const category = getCategory(slug)
  const projects = getCategoryProjects(slug)
  const [payment, setPayment] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!category) {
    return <Navigate to="/" replace />
  }

  return (
    <main className="category-page">
      <section
        className="category-hero"
        style={{ backgroundImage: `linear-gradient(100deg, rgba(15, 23, 42, 0.88) 0%, rgba(15, 23, 42, 0.45) 58%, rgba(15, 23, 42, 0.2) 100%), url(${category.image})` }}
      >
        <div className="category-hero__inner">
          <p className="category-hero__eyebrow">
            <i className={category.icon} aria-hidden="true" />
            Explore
          </p>
          <h1>{category.name}</h1>
          <p className="category-hero__tagline">{category.tagline}</p>
          <p className="category-hero__lead">{category.description}</p>

          <div className="category-hero__meta">
            <span>{projects.length} live projects</span>
            <span>0% platform fees</span>
          </div>

          <Link to="/start-campaign" className="category-hero__cta">
            Start a {category.name.toLowerCase()} campaign
          </Link>
        </div>
      </section>

      <section className="category-body">
        <div className="category-pills" aria-label="All categories">
          {categories.map((item) => (
            <Link
              key={item.slug}
              to={`/categories/${item.slug}`}
              className={`category-pill${item.slug === category.slug ? ' category-pill--active' : ''}`}
            >
              <i className={item.icon} aria-hidden="true" />
              {item.name}
            </Link>
          ))}
        </div>

        <div className="category-grid">
          {projects.map((project) => (
            <article className="category-card" key={project.id}>
              <div
                className="category-card__media"
                style={{ backgroundImage: `url(${project.image})` }}
                role="img"
                aria-label={project.title}
              />
              <div className="category-card__body">
                <p className="category-card__brand">{project.brand}</p>
                <h2>{project.title}</h2>
                <p className="category-card__desc">{project.description}</p>
                <div className="category-card__stats">
                  <span><i className="ri-time-line" aria-hidden="true" /> {project.daysLeft}</span>
                  <span>{project.funded}</span>
                </div>
                <div className="category-card__goal">
                  <strong>{project.raised}</strong>
                  <span>{project.goal}</span>
                </div>
                <button
                  type="button"
                  className="category-card__fund"
                  onClick={() => setPayment({ project: project.title, currency: project.currency })}
                >
                  <i className="ri-heart-fill" aria-hidden="true" /> Fund this project
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <PaymentModal
        open={!!payment}
        project={payment?.project ?? ''}
        currency={payment?.currency ?? '$'}
        onClose={() => setPayment(null)}
      />
    </main>
  )
}
