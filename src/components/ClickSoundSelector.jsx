import { useState, useEffect } from 'react'
import './ClickSoundSelector.css'
import { getClickSounds, setClickSound, getClickSound, playButtonSound } from '../utils/soundUtils'
import { useI18n } from '../contexts/I18nContext'

function ClickSoundSelector() {
  const [currentSound, setCurrentSound] = useState('click1')
  const sounds = getClickSounds()
  const { t } = useI18n()

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
      <label className="click-sound-label">{t('controls.click_sound')}</label>
      <div className="click-sound-buttons">
        {sounds.map((sound) => (
          <button
            key={sound.id}
            className={`click-sound-button ${currentSound === sound.id ? 'active' : ''}`}
            onClick={() => handleSoundChange(sound.id)}
            title={t(`sounds.${sound.id}`)}
          >
            <span className="click-sound-name">{t(`sounds.${sound.id}`)}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ClickSoundSelector
