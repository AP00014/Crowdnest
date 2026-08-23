import { useState } from 'react'
import { crowdFeedPanels } from '../data/homeContent'
import '../styles/crowdfeed.css'

function CrowdCard({ card }) {
  return (
    <article className="crowd-card">
      <div className={`crowd-card__image ${card.imageClass}`} />
      <div className="crowd-card__meta">
        <span><i className="ri-heart-fill" /> {card.likes}</span>
        <span><i className="ri-user-fill" /> {card.backers}</span>
      </div>
      <div className="crowd-card__body">
        <p className="crowd-card__tag">
          <i className={card.tagIcon} /> {card.tag} <span>{card.daysLeft}</span>
        </p>
        <h3><span>{card.title}</span></h3>
        <p className="crowd-card__brand">{card.brand}</p>
      </div>
      <div className="crowd-card__footer">
        <strong>{card.amount}</strong>
        <p>{card.note}</p>
      </div>
    </article>
  )
}

const tabs = [
  { id: 'trending', label: 'Trending', panel: 'panel-trending' },
  { id: 'mostFunded', label: 'Most funded', panel: 'panel-most-funded' },
]

export default function CrowdFeed() {
  const [activeTab, setActiveTab] = useState('trending')

  return (
    <section className="crowdfeed" aria-labelledby="crowdfeed-title">
      <div className="crowdfeed__top">
        <h2 id="crowdfeed-title">Crowdfunding</h2>
        <div className="crowdfeed__tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`crowdfeed__tab${activeTab === tab.id ? ' crowdfeed__tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div
        className={`crowdfeed__cards crowdfeed__panel${activeTab === 'trending' ? ' active' : ''}`}
        id="panel-trending"
      >
        {crowdFeedPanels.trending.map((card) => (
          <CrowdCard key={card.title} card={card} />
        ))}
      </div>

      <div
        className={`crowdfeed__cards crowdfeed__panel${activeTab === 'mostFunded' ? ' active' : ''}`}
        id="panel-most-funded"
      >
        {crowdFeedPanels.mostFunded.map((card) => (
          <CrowdCard key={card.title} card={card} />
        ))}
      </div>
    </section>
  )
}
