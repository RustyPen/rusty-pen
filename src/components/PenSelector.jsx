import React from 'react'
import './PenSelector.css'
import './PenIcon.css'
import PenIcon from './PenIcon'
import { playButtonSound } from '../utils/soundUtils'
import { useI18n } from '../contexts/I18nContext'

const pens = [
  { id: 'fountain' },
  { id: 'brush' },
  { id: 'feather' },
  { id: 'ballpoint' }
]

function PenSelector({ currentPen, onPenChange, soundEnabled, onSoundToggle }) {
  const { t } = useI18n()

  const handlePenChange = (penId) => {
    playButtonSound()
    onPenChange(penId)
  }

  const handleSoundToggle = () => {
    playButtonSound()
    onSoundToggle(!soundEnabled)
  }

  return (
    <div className="pen-selector">
      <div className="pen-buttons">
        {pens.map((pen) => (
          <button
            key={pen.id}
            className={`control-button ${currentPen === pen.id ? 'active' : ''}`}
            onClick={() => handlePenChange(pen.id)}
            title={t(`pens.${pen.id}`)}
          >
            <PenIcon type={pen.id} size={24} />
            <span className="control-text">{t(`pens.${pen.id}`)}</span>
          </button>
        ))}

        <button
          className={`control-button ${soundEnabled ? 'active' : ''}`}
          onClick={handleSoundToggle}
          title={soundEnabled ? t('buttons.disable') : t('buttons.enable')}
        >
          <span className="control-icon">{soundEnabled ? '🔊' : '🔇'}</span>
          <span className="control-text">{t('pens.sound')}</span>
        </button>
      </div>

    </div>
  )
}

export default PenSelector
