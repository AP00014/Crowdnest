import { Link } from 'react-router-dom'
import { campaignFeatures } from '../data/homeContent'
import '../styles/how-it-works.css'

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="campaign-cta" aria-labelledby="campaign-cta-title">
      <div className="campaign-cta__inner">
        <h2 id="campaign-cta-title">Create your campaign with confidence</h2>

        <div className="campaign-cta__features">
          {campaignFeatures.map((feature) => (
            <article className="campaign-feature" key={feature.title}>
              <div className={`campaign-feature__icon${feature.iconText ? ' campaign-feature__icon--text' : ''}`}>
                {feature.iconText ? feature.iconText : <i className={feature.icon} />}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>

        <Link to="/start-campaign" className="campaign-cta__button">
          Start your campaign
        </Link>
      </div>
    </section>
  )
}
