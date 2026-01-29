import './ThemeSelector.css'
import { playButtonSound } from '../utils/soundUtils'

const themes = [
  { id: 'vintage', name: '复古信纸', icon: '📜' },
  { id: 'parchment', name: '羊皮纸', icon: '📄' },
  { id: 'manuscript', name: '手稿纸', icon: '📝' },
  { id: 'telegram', name: '电报纸', icon: '📨' }
]

function ThemeSelector({ currentTheme, onThemeChange }) {
  const handleThemeChange = (themeId) => {
    playButtonSound()
    onThemeChange(themeId)
  }

  return (
    <div className="theme-selector">
      <label className="theme-label">纸张主题</label>
      <div className="theme-buttons">
        {themes.map((theme) => (
          <button
            key={theme.id}
            className={`theme-button ${currentTheme === theme.id ? 'active' : ''}`}
            onClick={() => handleThemeChange(theme.id)}
            title={theme.name}
          >
            <span className="theme-icon">{theme.icon}</span>
            <span className="theme-name">{theme.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ThemeSelector
