import { useState, useEffect, useRef } from 'react'
import './BackgroundMusic.css'
import { playButtonSound } from '../utils/soundUtils'
import { useI18n } from '../contexts/I18nContext'

const ambientSounds = [
  { id: 'fireplace', icon: '🔥' },
  { id: 'rain', icon: '🌧️' },
  { id: 'train', icon: '🚂' },
  { id: 'cafe', icon: '☕' },
  { id: 'forest', icon: '🌲' },
  { id: 'ocean', icon: '🌊' }
]

function BackgroundMusic() {
  const [currentSound, setCurrentSound] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const audioRef = useRef(null)
  const { t } = useI18n()

  useEffect(() => {
    return () => {
      stopSound()
    }
  }, [])

  const playSound = (soundId) => {
    stopSound()
    
    const audio = new Audio(`/sounds/ambient/${soundId}.mp3`)
    audio.loop = true
    audio.volume = volume
    
    audio.play().then(() => {
      audioRef.current = audio
      setCurrentSound(soundId)
      setIsPlaying(true)
    }).catch(err => {
      console.log('Audio play failed:', err)
    })
  }

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null
    }
    setCurrentSound(null)
    setIsPlaying(false)
  }

  const togglePlay = () => {
    if (isPlaying) {
      stopSound()
    } else if (currentSound) {
      playSound(currentSound)
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const handleSoundSelect = (soundId) => {
    playButtonSound()
    if (currentSound === soundId) {
      togglePlay()
    } else {
      playSound(soundId)
    }
  }

  return (
    <div className="background-music">
      <label className="control-label">{t('controls.ambient_sound')}</label>
      <div className="music-controls">
        <div className="sound-buttons">
          {ambientSounds.map((sound) => (
            <button
              key={sound.id}
              className={`sound-btn ${currentSound === sound.id && isPlaying ? 'active' : ''}`}
              onClick={() => handleSoundSelect(sound.id)}
              title={t(`sounds.${sound.id}`)}
            >
              <span className="sound-icon">{sound.icon}</span>
              <span className="sound-name">{t(`sounds.${sound.id}`)}</span>
            </button>
          ))}
        </div>
        <div className="volume-control">
          <span className="volume-icon">🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
          <span className="volume-value">{Math.round(volume * 100)}%</span>
        </div>
      </div>
    </div>
  )
}

export default BackgroundMusic
