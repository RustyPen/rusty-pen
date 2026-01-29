import './ThemeSelector.css'
import { playButtonSound } from '../utils/soundUtils'
import { useI18n } from '../contexts/I18nContext'

const themes = [
  { id: 'vintage', icon: '📜' },
  { id: 'parchment', icon: '📄' },
  { id: 'manuscript', icon: '📝' },
  { id: 'telegram', icon: '📨' }
]

function ThemeSelector({ currentTheme, onThemeChange }) {
  const { t } = useI18n()

  const handleThemeChange = (themeId) => {
    playButtonSound()
    onThemeChange(themeId)
  }

  return (
    <div className="theme-selector">
      <label className="theme-label">{t('controls.paper_theme')}</label>
      <div className="theme-buttons">
        {themes.map((theme) => (
          <button
            key={theme.id}
            className={`theme-button ${currentTheme === theme.id ? 'active' : ''}`}
            onClick={() => handleThemeChange(theme.id)}
            title={t(`themes.${theme.id}_paper`)}
          >
            <span className="theme-icon">{theme.icon}</span>
            <span className="theme-name">{t(`themes.${theme.id}_paper`)}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ThemeSelector
