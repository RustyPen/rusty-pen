import { useState, useEffect } from 'react'
import './GlobalThemeSelector.css'
import { getGlobalThemes, applyGlobalTheme } from '../utils/themeUtils'
import { playButtonSound } from '../utils/soundUtils'
import { useI18n } from '../contexts/I18nContext'

function GlobalThemeSelector({ currentTheme, onThemeChange }) {
  const [selectedTheme, setSelectedTheme] = useState(currentTheme || 'light')
  const themes = getGlobalThemes()
  const { t } = useI18n()

  useEffect(() => {
    applyGlobalTheme(selectedTheme)
  }, [selectedTheme])

  const handleThemeChange = (themeId) => {
    playButtonSound()
    setSelectedTheme(themeId)
    onThemeChange(themeId)
  }

  return (
    <div className="global-theme-selector">
      <label className="global-theme-label">{t('controls.global_theme')}</label>
      <div className="global-theme-buttons">
        {themes.map((theme) => (
          <button
            key={theme.id}
            className={`global-theme-button ${selectedTheme === theme.id ? 'active' : ''}`}
            onClick={() => handleThemeChange(theme.id)}
            title={t(`themes.${theme.id}`)}
          >
            <span className="global-theme-icon">{theme.icon}</span>
            <span className="global-theme-name">{t(`themes.${theme.id}`)}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default GlobalThemeSelector
