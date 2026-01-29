import { useState, useEffect } from 'react'
import './ClickSoundSelector.css'
import { getClickSounds, setClickSound, getClickSound, playButtonSound } from '../utils/soundUtils'

function ClickSoundSelector() {
  const [currentSound, setCurrentSound] = useState('click1')
  const sounds = getClickSounds()

  useEffect(() => {
    setCurrentSound(getClickSound())
  }, [])

  const handleSoundChange = (soundId) => {
    playButtonSound(soundId)
    setClickSound(soundId)
    setCurrentSound(soundId)
  }

  return (
    <div className="click-sound-selector">
      <label className="click-sound-label">点击音效</label>
      <div className="click-sound-buttons">
        {sounds.map((sound) => (
          <button
            key={sound.id}
            className={`click-sound-button ${currentSound === sound.id ? 'active' : ''}`}
            onClick={() => handleSoundChange(sound.id)}
            title={sound.name}
          >
            <span className="click-sound-name">{sound.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ClickSoundSelector
