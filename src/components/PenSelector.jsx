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

function PenSelector({ currentPen, onPenChange }) {
  const { t } = useI18n()

  const handlePenChange = (penId) => {
    playButtonSound()
    onPenChange(penId)
  }

  return (
    <div className="pen-selector">
      <label className="pen-label">{t('controls.pen')}</label>
      <div className="pen-buttons">
        {pens.map((pen) => (
          <button
            key={pen.id}
            className={`pen-button ${currentPen === pen.id ? 'active' : ''}`}
            onClick={() => handlePenChange(pen.id)}
            title={t(`pens.${pen.id}`)}
          >
            <PenIcon type={pen.id} size={24} />
            <span className="pen-name">{t(`pens.${pen.id}`)}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default PenSelector
