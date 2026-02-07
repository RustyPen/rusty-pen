import { useState, useEffect } from 'react'
import './ThemeSelector.css'
import { getThemes, applyTheme } from '../utils/themeUtils'
import { playButtonSound } from '../utils/soundUtils'
import { useI18n } from '../contexts/I18nContext'

function ThemeSelector({ currentTheme, onThemeChange }) {
  const [selectedTheme, setSelectedTheme] = useState(currentTheme || 'light')
  const themes = getThemes()
  const { t } = useI18n()

  useEffect(() => {
    applyTheme(selectedTheme)
  }, [selectedTheme])

  const handleThemeChange = (themeId) => {
    playButtonSound()
    setSelectedTheme(themeId)
    onThemeChange(themeId)
  }

  return (
    <div className="theme-selector">
      <div className="theme-buttons">
        {themes.map((theme) => (
          <button
            key={theme.id}
            className={`theme-button ${selectedTheme === theme.id ? 'active' : ''}`}
            onClick={() => handleThemeChange(theme.id)}
            title={t(`themes.${theme.id}`)}
          >
            <span className="theme-icon">{theme.icon}</span>
            <span className="theme-name">{t(`themes.${theme.id}`)}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ThemeSelector
