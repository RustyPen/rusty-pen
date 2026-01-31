import './AboutPanel.css'
import { useI18n } from '../contexts/I18nContext'

const AboutPanel = () => {
  const { t } = useI18n()

  return (
    <div className="about-panel">
      <div className="about-panel-content">
        <div className="about-logo">
          <span className="about-logo-icon">🖋</span>
          <h3 className="about-logo-text">Rusty Pen</h3>
        </div>
        <p className="about-slogan">{t('sidebar.slogan')}</p>
        <p className="about-description">{t('sidebar.about_description')}</p>
        <div className="about-info">
          <div className="info-item">
            <span className="info-label">Version</span>
            <span className="info-value">1.0.0</span>
          </div>
          <div className="info-item">
            <span className="info-label">Year</span>
            <span className="info-value">2025</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPanel
