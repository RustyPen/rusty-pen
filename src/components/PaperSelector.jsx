import './PaperSelector.css'
import { playButtonSound } from '../utils/soundUtils'
import { useI18n } from '../contexts/I18nContext'

const themes = [
  { id: 'vintage', icon: '📜' },
  { id: 'parchment', icon: '📄' },
  { id: 'manuscript', icon: '📝' },
  { id: 'telegram', icon: '📨' }
]

function PaperSelector({ currentTheme, onThemeChange }) {
  const { t } = useI18n()

  const handleThemeChange = (themeId) => {
    playButtonSound()
    onThemeChange(themeId)
  }

  return (
    <div className="paper-selector">
      <div className="paper-buttons">
        {themes.map((theme) => (
          <button
            key={theme.id}
            className={`control-button ${currentTheme === theme.id ? 'active' : ''}`}
            onClick={() => handleThemeChange(theme.id)}
            title={t(`themes.${theme.id}_paper`)}
          >
            <span className="control-icon">{theme.icon}</span>
            <span className="control-text">{t(`themes.${theme.id}_paper`)}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default PaperSelector
