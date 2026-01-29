import { useState, useEffect } from 'react'
import './LanguageSelector.css'
import { getLanguages, applyLanguage } from '../utils/languageUtils'
import { playButtonSound } from '../utils/soundUtils'
import { useI18n } from '../contexts/I18nContext'

function LanguageSelector({ currentLanguage, onLanguageChange }) {
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage || 'zh')
  const languages = getLanguages()
  const { t } = useI18n()

  useEffect(() => {
    setSelectedLanguage(currentLanguage || 'zh')
  }, [currentLanguage])

  const handleLanguageChange = (languageId) => {
    playButtonSound()
    setSelectedLanguage(languageId)
    applyLanguage(languageId)
    onLanguageChange(languageId)
  }

  return (
    <div className="language-selector">
      <label className="language-label">{t('controls.language')}</label>
      <div className="language-buttons">
        {languages.map((language) => (
          <button
            key={language.id}
            className={`language-button ${selectedLanguage === language.id ? 'active' : ''}`}
            onClick={() => handleLanguageChange(language.id)}
            title={language.name}
          >
            <span className="language-icon">{language.icon}</span>
            <span className="language-name">{language.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default LanguageSelector
