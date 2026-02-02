import { useState } from 'react'
import './WritingSettingsPanel.css'
import ThemeSelector from './ThemeSelector'
import PenSelector from './PenSelector'
import BackgroundMusic from './BackgroundMusic'
import VintagePaperSelector from './VintagePaperSelector'
import { useI18n } from '../contexts/I18nContext'

const WritingSettingsPanel = ({ 
  currentTheme, 
  onThemeChange, 
  currentPen, 
  onPenChange, 
  soundEnabled, 
  onSoundToggle,
  vintagePaperId,
  onVintagePaperChange
}) => {
  const { t } = useI18n()

  return (
    <div className="writing-settings-panel">
      <div className="writing-settings-content">
        <div className="settings-section">
          <div className="section-title">{t('controls.paper_theme')}</div>
          <ThemeSelector currentTheme={currentTheme} onThemeChange={onThemeChange} />
          {currentTheme === 'vintage' && (
            <div className="vintage-paper-section">
              <div className="section-title">{t('controls.vintage_paper')}</div>
              <VintagePaperSelector 
                currentPaperId={vintagePaperId} 
                onPaperChange={onVintagePaperChange} 
              />
            </div>
          )}
        </div>

        <div className="settings-section">
          <div className="section-title">{t('controls.pen')}</div>
          <PenSelector 
            currentPen={currentPen} 
            onPenChange={onPenChange}
            soundEnabled={soundEnabled}
            onSoundToggle={onSoundToggle}
          />
        </div>

        <div className="settings-section">
          <div className="section-title">{t('controls.ambient_sound')}</div>
          <BackgroundMusic />
        </div>
      </div>
    </div>
  )
}

export default WritingSettingsPanel
