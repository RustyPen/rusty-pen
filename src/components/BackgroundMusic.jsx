import { useState, useEffect, useRef } from 'react'
import './BackgroundMusic.css'
import { playButtonSound } from '../utils/soundUtils'

const ambientSounds = [
  { id: 'fireplace', name: '壁炉', icon: '🔥' },
  { id: 'rain', name: '雨声', icon: '🌧️' },
  { id: 'train', name: '火车', icon: '🚂' },
  { id: 'cafe', name: '咖啡馆', icon: '☕' },
  { id: 'forest', name: '森林', icon: '🌲' },
  { id: 'ocean', name: '海浪', icon: '🌊' }
]

function BackgroundMusic() {
  const [currentSound, setCurrentSound] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const audioRef = useRef(null)

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
      <label className="music-label">环境音效</label>
      <div className="music-controls">
        <div className="sound-buttons">
          {ambientSounds.map((sound) => (
            <button
              key={sound.id}
              className={`sound-btn ${currentSound === sound.id && isPlaying ? 'active' : ''}`}
              onClick={() => handleSoundSelect(sound.id)}
              title={sound.name}
            >
              <span className="sound-icon">{sound.icon}</span>
              <span className="sound-name">{sound.name}</span>
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
