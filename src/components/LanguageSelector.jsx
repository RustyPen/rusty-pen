import './LanguageSelector.css'
import { useI18n } from '../contexts/I18nContext'
import { playButtonSound } from '../utils/soundUtils'

function LanguageSelector({ currentLanguage, onLanguageChange }) {
  const { t } = useI18n()

  const languages = [
    { id: 'zh', name: '中文', icon: '🇨🇳' },
    { id: 'en', name: 'English', icon: '🇺🇸' }
  ]

  const handleLanguageChange = (languageId) => {
    playButtonSound()
    onLanguageChange(languageId)
  }

  return (
    <div className="language-selector">
      <div className="language-buttons">
        {languages.map((lang) => (
          <button
            key={lang.id}
            className={`language-button ${currentLanguage === lang.id ? 'active' : ''}`}
            onClick={() => handleLanguageChange(lang.id)}
          >
            <span className="language-icon">{lang.icon}</span>
            <span className="language-name">{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default LanguageSelector
