import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { campaignCategories, campaignDurations } from '../data/homeContent'
import '../styles/how-it-works.css'
import '../styles/start-campaign.css'

export default function StartCampaignPage() {
  const [saved, setSaved] = useState(false)
  const successRef = useRef(null)

  function handleSubmit(e) {
    e.preventDefault()
    const form = e.target
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }
    setSaved(true)
    successRef.current?.focus()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="start-campaign-page" id="main">
      <section className="start-campaign-hero" aria-labelledby="start-campaign-title">
        <div className="start-campaign-hero__inner">
          <p className="start-campaign-hero__eyebrow">For creators</p>
          <h1 id="start-campaign-title">Start your campaign</h1>
          <p className="start-campaign-hero__lead">
            Tell us about your project in a few minutes. You can refine your page,
            rewards, and story before you go live.
          </p>
          <ul className="start-campaign-hero__steps" aria-label="What happens next">
            <li><i className="ri-edit-line" aria-hidden="true" /> Draft your page</li>
            <li><i className="ri-gift-line" aria-hidden="true" /> Add rewards</li>
            <li><i className="ri-rocket-line" aria-hidden="true" /> Launch when you are ready</li>
          </ul>
        </div>
      </section>

      <section className="start-campaign-panel" aria-labelledby="start-campaign-form-title">
        <div className="start-campaign-panel__inner">
          <h2 id="start-campaign-form-title" className="visually-hidden">Campaign details</h2>

          {saved ? (
            <div className="start-campaign-success" tabIndex={-1} ref={successRef}>
              <div className="start-campaign-success__icon" aria-hidden="true">
                <i className="ri-checkbox-circle-fill" />
              </div>
              <h3>Thanks — your draft is saved</h3>
              <p>
                In a full launch, you would continue to the editor to add media, rewards,
                and payment details. This demo only collects your basics.
              </p>
              <Link to="/" className="campaign-cta__button">Back to home</Link>
            </div>
          ) : (
            <form className="start-campaign-form" noValidate onSubmit={handleSubmit}>
              <div className="start-campaign-form__row">
                <label className="start-campaign-form__field">
                  <span className="start-campaign-form__label">Campaign title</span>
                  <input
                    type="text"
                    name="title"
                    required
                    maxLength={120}
                    placeholder="What are you raising funds for?"
                    autoComplete="off"
                  />
                </label>
              </div>

              <div className="start-campaign-form__row start-campaign-form__row--split">
                <label className="start-campaign-form__field">
                  <span className="start-campaign-form__label">Category</span>
                  <select name="category" required defaultValue="">
                    <option value="">Choose a category</option>
                    {campaignCategories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </label>
                <label className="start-campaign-form__field">
                  <span className="start-campaign-form__label">Funding goal (USD)</span>
                  <input
                    type="number"
                    name="goal"
                    required
                    min={1}
                    step={1}
                    placeholder="5000"
                  />
                </label>
              </div>

              <div className="start-campaign-form__row start-campaign-form__row--split">
                <label className="start-campaign-form__field">
                  <span className="start-campaign-form__label">Campaign length</span>
                  <select name="duration" required defaultValue="">
                    <option value="">Select duration</option>
                    {campaignDurations.map((d) => (
                      <option key={d.value} value={d.value}>{d.label}</option>
                    ))}
                  </select>
                </label>
                <label className="start-campaign-form__field">
                  <span className="start-campaign-form__label">Contact email</span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </label>
              </div>

              <div className="start-campaign-form__row">
                <label className="start-campaign-form__field">
                  <span className="start-campaign-form__label">Short description</span>
                  <textarea
                    name="blurb"
                    required
                    rows={5}
                    maxLength={2000}
                    placeholder="Explain your project and why backers should care."
                  />
                </label>
              </div>

              <p className="start-campaign-form__note">
                By continuing you agree to our community guidelines. Fees and payout
                schedules are summarized before you publish.
              </p>

              <div className="start-campaign-form__actions">
                <button type="submit" className="campaign-cta__button">Save &amp; continue</button>
                <Link to="/" className="start-campaign-form__cancel">Cancel</Link>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
