import './AboutModal.css'
import { useI18n } from '../contexts/I18nContext'
import { playButtonSound } from '../utils/soundUtils'
import { open } from '@tauri-apps/plugin-shell'

function AboutModal({ isOpen, onClose }) {
  const { t } = useI18n()

  const handleGitHubClick = () => {
    playButtonSound()
    open('https://github.com/RustyPen/rusty-pen')
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content about-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{t('sidebar.about')}</h2>
          <button className="modal-close" onClick={() => {
            playButtonSound()
            onClose()
          }}>✕</button>
        </div>
        <div className="modal-body">
          <div className="about-logo">
            <span className="about-logo-icon">🖋</span>
            <h3 className="about-logo-text">Rusty Pen</h3>
          </div>
          <p className="about-slogan">{t('sidebar.slogan')}</p>
          <p className="about-description">{t('sidebar.about_description')}</p>
          <div className="about-github">
            <button className="github-link" onClick={handleGitHubClick}>
              <span className="github-icon">📦</span>
              <span className="github-text">GitHub</span>
            </button>
          </div>
          <div className="about-url">
            <span className="url-label">https://github.com/RustyPen/rusty-pen</span>
          </div>
          <div className="about-email">
            <div className="email-label">Contact</div>
            <div className="email-value">z502545@icloud.com</div>
          </div>
          <div className="about-info">
            <div className="info-item">
              <span className="info-label">Version</span>
              <span className="info-value">1.0.0</span>
            </div>
            <div className="info-item">
              <span className="info-label">Year</span>
              <span className="info-value">2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutModal
