import { useState, useEffect } from 'react'
import './GlobalThemeSelector.css'
import { getGlobalThemes, applyGlobalTheme } from '../utils/themeUtils'
import { playButtonSound } from '../utils/soundUtils'

function GlobalThemeSelector({ currentTheme, onThemeChange }) {
  const [selectedTheme, setSelectedTheme] = useState(currentTheme || 'light')
  const themes = getGlobalThemes()

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
      <label className="global-theme-label">全局主题</label>
      <div className="global-theme-buttons">
        {themes.map((theme) => (
          <button
            key={theme.id}
            className={`global-theme-button ${selectedTheme === theme.id ? 'active' : ''}`}
            onClick={() => handleThemeChange(theme.id)}
            title={theme.name}
          >
            <span className="global-theme-icon">{theme.icon}</span>
            <span className="global-theme-name">{theme.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default GlobalThemeSelector
