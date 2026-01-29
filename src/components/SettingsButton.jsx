import React from 'react'
import './SettingsButton.css'
import { useI18n } from '../contexts/I18nContext'
import { playButtonSound } from '../utils/soundUtils'

function SettingsButton({ onClick }) {
  const { t } = useI18n()

  const handleClick = () => {
    playButtonSound()
    onClick()
  }

  return (
    <div className="settings-button-wrapper">
      <span className="control-label">{t('controls.settings')}</span>
      <button 
        className="control-button"
        onClick={handleClick}
        title={t('controls.settings')}
      >
        <span className="control-icon">⚙️</span>
        <span className="control-text">{t('controls.settings')}</span>
      </button>
    </div>
  )
}

export default SettingsButton
