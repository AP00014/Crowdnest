import { featuredProject, recommendedProjects } from '../data/homeContent'
import '../styles/payment-modal.css'
import '../styles/projects.css'

function FundButton({ project, currency, onFund, label = 'Fund this Project' }) {
  return (
    <div className="payment-mock">
      <button
        type="button"
        className="fund-btn fund-btn--payment"
        onClick={() => onFund({ project, currency })}
      >
        <i className="ri-heart-fill" /> {label}
      </button>
    </div>
  )
}

export default function ProjectsShowcase({ onFund }) {
  return (
    <section id="explore" className="projects-showcase" aria-labelledby="featured-projects-title">
      <div className="projects-showcase__head">
        <h2 id="featured-projects-title">Bring a creative project to life.</h2>
      </div>

      <div className="projects-showcase__layout">
        <article className="featured-project">
          <p className="projects-label">FEATURED PROJECT</p>
          <div className="project-media project-media--featured" />
          <div className="project-info">
            <h3><span>{featuredProject.title}</span></h3>
            <p>{featuredProject.description}</p>
            <div className="project-stats">
              <span><i className="ri-time-line" /> {featuredProject.daysLeft}</span>
              <span>{featuredProject.funded}</span>
            </div>
            <FundButton
              project={featuredProject.title}
              currency={featuredProject.currency}
              onFund={onFund}
              label="Fund this project"
            />
          </div>
        </article>

        <div className="recommended-block">
          <p className="projects-label">RECOMMENDED FOR YOU</p>
          <div className="recommended-grid">
            {recommendedProjects.map((project) => (
              <article className="mini-project" key={project.id}>
                <div className={`project-media ${project.mediaClass}`} />
                <div className="mini-project__info">
                  <div className="project_info_head">
                    <div className="project_avatar">
                      <img src={project.avatar} alt={project.avatarAlt} />
                    </div>
                    <h3><span>{project.title}</span></h3>
                  </div>
                  <div className="brand_name"><h2>{project.brand}</h2></div>
                  <div className="project-stats">
                    <span><i className="ri-time-line" /> {project.daysLeft}</span>
                    <span>{project.funded}</span>
                  </div>
                  <div className="mini-project__expand">
                    <p className="mini-project__desc">{project.description}</p>
                    <div className="mini-project__progress-bar">
                      <div className="mini-project__progress-fill" style={{ width: '100%' }} />
                    </div>
                    <div className="mini-project__goal-stats">
                      <span><i className="ri-funds-line" /> {project.raised}</span>
                      <span>{project.goal}</span>
                    </div>
                    <FundButton
                      project={project.title}
                      currency={project.currency}
                      onFund={onFund}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
