import { useState } from 'react'
import './WritingSettingsPanel.css'
import PaperSelector from './PaperSelector'
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
  onVintagePaperChange,
  customPaperPath,
  customPaperUrl,
  useCustomPaper,
  onCustomPaperChange,
  paperOpacity,
  onPaperOpacityChange
}) => {
  const { t } = useI18n()

  const handleOpacityChange = (e) => {
    const value = parseFloat(e.target.value)
    onPaperOpacityChange(value)
  }

  return (
    <div className="writing-settings-panel">
      <div className="writing-settings-content">
        <div className="settings-section">
          <div className="section-title">{t('controls.paper_theme')}</div>
          <PaperSelector currentTheme={currentTheme} onThemeChange={onThemeChange} />
          {currentTheme === 'vintage' && (
            <div className="vintage-paper-section">
              <div className="section-title">{t('controls.vintage_paper')}</div>
              <VintagePaperSelector 
                currentPaperId={vintagePaperId} 
                onPaperChange={onVintagePaperChange}
                customPaperPath={customPaperPath}
                customPaperUrl={customPaperUrl}
                useCustomPaper={useCustomPaper}
                onCustomPaperChange={onCustomPaperChange}
              />
              <div className="opacity-control">
                <label>{t('controls.paper_opacity')}</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={paperOpacity}
                  onChange={handleOpacityChange}
                  className="opacity-slider"
                />
                <span className="opacity-value">{Math.round(paperOpacity * 100)}%</span>
              </div>
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
