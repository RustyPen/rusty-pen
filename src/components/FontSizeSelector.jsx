import { useState, useEffect } from 'react'
import './FontSizeSelector.css'
import { playButtonSound } from '../utils/soundUtils'
import { useI18n } from '../contexts/I18nContext'

const fontSizes = [
  { id: 'small', label: 'font_sizes.small', size: 14 },
  { id: 'medium', label: 'font_sizes.medium', size: 16 },
  { id: 'large', label: 'font_sizes.large', size: 20 },
  { id: 'xlarge', label: 'font_sizes.xlarge', size: 24 }
]

function FontSizeSelector({ currentFontSize, onFontSizeChange }) {
  const [selectedFontSize, setSelectedFontSize] = useState(currentFontSize || 'medium')
  const { t } = useI18n()

  useEffect(() => {
    setSelectedFontSize(currentFontSize || 'medium')
  }, [currentFontSize])

  const handleFontSizeChange = (fontSizeId) => {
    playButtonSound()
    setSelectedFontSize(fontSizeId)
    onFontSizeChange(fontSizeId)
  }

  return (
    <div className="font-size-selector">
      <div className="font-size-options">
        {fontSizes.map((fontSize) => (
          <button
            key={fontSize.id}
            className={`font-size-option ${selectedFontSize === fontSize.id ? 'active' : ''} font-size-${fontSize.id}`}
            onClick={() => handleFontSizeChange(fontSize.id)}
          >
            {t(fontSize.label)}
          </button>
        ))}
      </div>
    </div>
  )
}

export default FontSizeSelector
