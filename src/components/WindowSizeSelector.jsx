import { useState, useEffect } from 'react'
import './WindowSizeSelector.css'
import { playButtonSound } from '../utils/soundUtils'
import { useI18n } from '../contexts/I18nContext'

const windowSizes = [
  { id: 'small', label: 'window_sizes.small', width: 1280, height: 720 },
  { id: 'medium', label: 'window_sizes.medium', width: 1600, height: 900 },
  { id: 'large', label: 'window_sizes.large', width: 1920, height: 1080 },
  { id: 'xlarge', label: 'window_sizes.xlarge', width: 2560, height: 1440 }
]

function WindowSizeSelector({ currentWindowSize, onWindowSizeChange }) {
  const [selectedWindowSize, setSelectedWindowSize] = useState(currentWindowSize || 'medium')
  const { t } = useI18n()

  useEffect(() => {
    setSelectedWindowSize(currentWindowSize || 'medium')
  }, [currentWindowSize])

  const handleWindowSizeChange = (windowSizeId) => {
    playButtonSound()
    setSelectedWindowSize(windowSizeId)
    onWindowSizeChange(windowSizeId)
  }

  return (
    <div className="window-size-selector">
      <div className="window-size-options">
        {windowSizes.map((windowSize) => (
          <button
            key={windowSize.id}
            className={`window-size-option ${selectedWindowSize === windowSize.id ? 'active' : ''}`}
            onClick={() => handleWindowSizeChange(windowSize.id)}
          >
            {t(windowSize.label)}
          </button>
        ))}
      </div>
    </div>
  )
}

export default WindowSizeSelector
