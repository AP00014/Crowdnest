import { Link } from 'react-router-dom'
import { categories } from '../data/categories'
import { heroSlides, trustedPartners } from '../data/homeContent'
import { useHeroSlider } from '../hooks/useHeroSlider'
import '../styles/hero.css'

function TrustpilotStars() {
  return (
    <span className="hero-trust__stars" aria-hidden="true">
      <i className="ri-star-fill" />
      <i className="ri-star-fill" />
      <i className="ri-star-fill" />
      <i className="ri-star-fill" />
      <i className="ri-star-half-fill" />
    </span>
  )
}

export default function HeroSection() {
  const { activeIndex } = useHeroSlider(heroSlides.length)

  return (
    <section className="hero" id="home">
      <div className="hero__main">
        <aside className="side-cate-bar">
          <ul className="categories">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link to={`/categories/${category.slug}`}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </aside>

        <div className="hero-slider">
          {heroSlides.map((slide, i) => (
            <div
              key={slide.title}
              className={`slide${i === activeIndex ? ' active-slide' : ''}`}
            >
              <img src={slide.image} alt={slide.alt} className="cover-image" />
              <div className="slider-content">
                <div className="slider-content__inner">
                  <h2 className="slider-content__title">{slide.title}</h2>
                  <p className="slider-content__desc">{slide.description}</p>
                  <Link to={slide.cta.to} className="slider-content__cta">
                    {slide.cta.label}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-trust">
        <p className="hero-trust__kicker">
          <i className="ri-verified-badge-fill" aria-hidden="true" />
          Trusted by 50,000+ backers worldwide
        </p>
        <ul className="hero-trust__list" aria-label="Trusted partners">
          {trustedPartners.map((partner) => (
            <li
              key={partner.id}
              className={`hero-trust__item hero-trust__item--${partner.id}`}
            >
              {partner.id === 'trustpilot' ? (
                <TrustpilotStars />
              ) : partner.icon ? (
                <i className={`${partner.icon} hero-trust__icon`} aria-hidden="true" />
              ) : null}
              <span className="hero-trust__copy">
                <strong className="hero-trust__name">{partner.name}</strong>
                <span>
                  {partner.id === 'trustpilot'
                    ? `${partner.caption} · ${partner.rating}`
                    : partner.caption}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
