import './SettingsPanel.css'
import { useI18n } from '../contexts/I18nContext'
import GlobalThemeSelector from './GlobalThemeSelector'
import FontSelector from './FontSelector'
import LanguageSelector from './LanguageSelector'

const SettingsPanel = ({ currentTheme, onThemeChange, currentFont, onFontChange, currentLanguage, onLanguageChange }) => {
  const { t } = useI18n()

  return (
    <div className="settings-panel">
      <div className="settings-panel-content">
        <h1 className="settings-panel-title">{t('controls.settings')}</h1>
        
        <div className="settings-section">
          <h2 className="settings-section-title">{t('controls.language')}</h2>
          <LanguageSelector 
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
          />
        </div>
        
        <div className="settings-section">
          <h2 className="settings-section-title">{t('controls.global_theme')}</h2>
          <GlobalThemeSelector 
            currentTheme={currentTheme} 
            onThemeChange={onThemeChange} 
          />
        </div>
        
        <div className="settings-section">
          <h2 className="settings-section-title">{t('controls.font')}</h2>
          <FontSelector 
            currentFont={currentFont} 
            onFontChange={onFontChange} 
            currentTheme={currentTheme}
            currentLanguage={currentLanguage}
          />
        </div>
      </div>
    </div>
  )
}

export default SettingsPanel
