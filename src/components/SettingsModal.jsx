import './SettingsModal.css'
import { useState, useEffect } from 'react'
import { useI18n } from '../contexts/I18nContext'
import GlobalThemeSelector from './GlobalThemeSelector'
import FontSelector from './FontSelector'
import FontSizeSelector from './FontSizeSelector'
import LanguageSelector from './LanguageSelector'
import WindowSizeSelector from './WindowSizeSelector'
import { playButtonSound } from '../utils/soundUtils'

function SettingsModal({ isOpen, onClose, currentTheme, onThemeChange, currentFont, onFontChange, currentFontSize, onFontSizeChange, currentLanguage, onLanguageChange, showSplashScreen, onSplashScreenToggle, currentWindowSize, onWindowSizeChange }) {
  const { t } = useI18n()
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleClose = () => {
    playButtonSound()
    setIsClosing(true)
    setTimeout(() => {
      onClose()
      setIsClosing(false)
    }, 300)
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClose()
    }
  }

  if (!isOpen && !isClosing) return null

  return (
    <div
      className={`settings-modal-backdrop ${isClosing ? 'closing' : ''}`}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
    >
      <div className={`settings-modal ${isClosing ? 'closing' : ''}`}>
        <div className="settings-modal-header">
          <h2 className="settings-modal-title">{t('controls.settings')}</h2>
          <button
            className="settings-modal-close"
            onClick={handleClose}
            aria-label={t('buttons.close')}
          >
            ✕
          </button>
        </div>

        <div className="settings-modal-content">
          <div className="settings-section">
            <h3 className="settings-section-title">{t('controls.language')}</h3>
            <LanguageSelector
              currentLanguage={currentLanguage}
              onLanguageChange={onLanguageChange}
            />
          </div>

          <div className="settings-section">
            <h3 className="settings-section-title">{t('controls.splash_screen')}</h3>
            <div className="settings-toggle">
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={showSplashScreen}
                  onChange={(e) => {
                    playButtonSound()
                    onSplashScreenToggle(e.target.checked)
                  }}
                />
                <span className="toggle-slider"></span>
              </label>
              <span className="toggle-label">{showSplashScreen ? t('buttons.enable') : t('buttons.disable')}</span>
            </div>
          </div>

          <div className="settings-section">
            <h3 className="settings-section-title">{t('controls.global_theme')}</h3>
            <GlobalThemeSelector
              currentTheme={currentTheme}
              onThemeChange={onThemeChange}
            />
          </div>

          <div className="settings-section">
            <h3 className="settings-section-title">{t('controls.font')}</h3>
            <FontSelector
              currentFont={currentFont}
              onFontChange={onFontChange}
              currentTheme={currentTheme}
              currentLanguage={currentLanguage}
            />
          </div>

          <div className="settings-section">
            <h3 className="settings-section-title">{t('controls.font_size')}</h3>
            <FontSizeSelector
              currentFontSize={currentFontSize}
              onFontSizeChange={onFontSizeChange}
            />
          </div>

          <div className="settings-section">
            <h3 className="settings-section-title">{t('controls.window_size')}</h3>
            <WindowSizeSelector
              currentWindowSize={currentWindowSize}
              onWindowSizeChange={onWindowSizeChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsModal
