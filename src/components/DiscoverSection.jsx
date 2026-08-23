import { discoverItems } from '../data/homeContent'
import '../styles/payment-modal.css'
import '../styles/discover.css'

function DiscoverCard({ item, onFund, featured }) {
  const cardClass = featured ? 'discover-item discover-item--featured' : 'discover-item'

  return (
    <article className={cardClass}>
      <div className={`discover-item__media ${item.mediaClass}`}>
        <span className="discover-item__badge">{item.badge}</span>
      </div>
      <h3 className="discover-item__title"><span>{item.title}</span></h3>
      <div
        className="discover-item__bar"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={item.progress}
      >
        <span className="discover-item__fill" style={{ width: `${item.progress}%` }} />
      </div>
      <p className="discover-item__raised">{item.raised}</p>
      <div className="discover-item__expand">
        <p className="discover-item__desc">{item.description}</p>
        <div className="discover-item__goal-stats">
          <span><i className="ri-user-heart-line" /> {item.donors}</span>
          <span>{item.goal}</span>
        </div>
        <div className="payment-mock">
          <button
            type="button"
            className="donate-btn donate-btn--payment"
            onClick={() => onFund({ project: item.title, currency: item.currency })}
          >
            <i className="ri-heart-fill" /> Donate Now
          </button>
        </div>
      </div>
    </article>
  )
}

export default function DiscoverSection({ onFund }) {
  const [featured, ...rest] = discoverItems

  return (
    <section className="discover" aria-labelledby="discover-heading">
      <h2 id="discover-heading" className="discover-title">
        Discover fundraisers inspired by what you care about
      </h2>
      <div className="discover-row">
        <DiscoverCard item={featured} onFund={onFund} featured />
        <div className="discover-grid">
          {rest.map((item) => (
            <DiscoverCard key={item.id} item={item} onFund={onFund} />
          ))}
        </div>
      </div>
    </section>
  )
}
