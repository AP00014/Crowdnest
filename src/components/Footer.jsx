import { trustedPartners } from '../data/homeContent'
import '../styles/footer.css'

function TrustpilotStars() {
  return (
    <span className="site-footer__trust-stars" aria-hidden="true">
      <i className="ri-star-fill" />
      <i className="ri-star-fill" />
      <i className="ri-star-fill" />
      <i className="ri-star-fill" />
      <i className="ri-star-half-fill" />
    </span>
  )
}

export default function Footer() {
  return (
    <footer className="site-footer" aria-labelledby="site-footer-brand">
      <div className="site-footer__top">
        <div className="site-footer__brand">
          <h2 id="site-footer-brand">CROWDNEST</h2>
          <p>The Future of Creativity</p>

          <div className="site-footer__social">
            <a href="#explore" aria-label="Facebook"><i className="ri-facebook-circle-fill" /></a>
            <a href="#explore" aria-label="X"><i className="ri-twitter-x-line" /></a>
            <a href="#explore" aria-label="YouTube"><i className="ri-youtube-fill" /></a>
            <a href="#explore" aria-label="Instagram"><i className="ri-instagram-line" /></a>
            <a href="#explore" aria-label="LinkedIn"><i className="ri-linkedin-box-fill" /></a>
          </div>

          <label htmlFor="platform-language" className="site-footer__language-label">
            Platform language
          </label>
          <div className="site-footer__select-wrap">
            <select id="platform-language" name="platform-language" defaultValue="English (default)">
              <option>English (default)</option>
              <option>French</option>
              <option>German</option>
            </select>
            <i className="ri-arrow-down-s-line" />
          </div>

          <p className="site-footer__note">
            Platform translation (beta) was provided by AI. Help us improve.
          </p>
        </div>

        <div className="site-footer__links">
          <div className="site-footer__column">
            <h3>PLATFORM</h3>
            <span>Contact</span>
            <span>Crowdfunding Guide</span>
          </div>
          <div className="site-footer__column">
            <h3>CREATORS</h3>
            <span>Fees</span>
            <span>Marketing services</span>
            <span>Become a creator</span>
            <span>Blog</span>
            <span>Help</span>
          </div>
        </div>
      </div>

      <div className="site-footer__trust">
        <p className="site-footer__trust-kicker">
          <i className="ri-verified-badge-fill" aria-hidden="true" />
          Trusted by 50,000+ backers worldwide
        </p>
        <ul className="site-footer__trust-list" aria-label="Trusted partners">
          {trustedPartners.map((partner) => (
            <li
              key={partner.id}
              className={`site-footer__trust-item site-footer__trust-item--${partner.id}`}
            >
              {partner.id === 'trustpilot' ? (
                <TrustpilotStars />
              ) : partner.icon ? (
                <i className={`${partner.icon} site-footer__trust-icon`} aria-hidden="true" />
              ) : null}
              <span className="site-footer__trust-copy">
                <strong>{partner.name}</strong>
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

      <div className="site-footer__bottom">
        <div className="site-footer__policies">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Privacy Settings</span>
          <span>We do not sell your data</span>
        </div>

        <div className="site-footer__payments" aria-label="Accepted payment methods">
          <span><img src="https://cdn.static.indiegogo.com/content/20260325.3-13/images/payments/card-icon-visa.svg" alt="" /></span>
          <span><img src="https://cdn.static.indiegogo.com/content/20260325.3-13/images/payments/card-icon-mastercard.svg" alt="" /></span>
          <span><img src="https://cdn.static.indiegogo.com/content/20260325.3-13/images/payments/card-icon-jcb.svg" alt="" /></span>
          <span><img src="https://cdn.static.indiegogo.com/content/20260325.3-13/images/payments/card-icon-discover.svg" alt="" /></span>
        </div>
      </div>

      <p className="site-footer__legal">
        This site is protected by reCAPTCHA and standard privacy terms apply.
      </p>
    </footer>
  )
}
