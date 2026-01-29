import React from 'react'
import './PenSelector.css'
import './PenIcon.css'
import PenIcon from './PenIcon'
import { playButtonSound } from '../utils/soundUtils'

const pens = [
  { id: 'fountain', name: '钢笔' },
  { id: 'brush', name: '毛笔' },
  { id: 'feather', name: '羽毛笔' },
  { id: 'ballpoint', name: '圆珠笔' }
]

function PenSelector({ currentPen, onPenChange }) {
  const handlePenChange = (penId) => {
    playButtonSound()
    onPenChange(penId)
  }

  return (
    <div className="pen-selector">
      <label className="pen-label">笔具选择</label>
      <div className="pen-buttons">
        {pens.map((pen) => (
          <button
            key={pen.id}
            className={`pen-button ${currentPen === pen.id ? 'active' : ''}`}
            onClick={() => handlePenChange(pen.id)}
            title={pen.name}
          >
            <PenIcon type={pen.id} size={24} />
            <span className="pen-name">{pen.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default PenSelector
