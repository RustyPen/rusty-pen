import './FontSizeSelector.css'
import { playButtonSound } from '../utils/soundUtils'
import { useI18n } from '../contexts/I18nContext'

const fontSizes = [
  { id: 'small', value: '1.0rem', label: 'S' },
  { id: 'medium', value: '1.2rem', label: 'M' },
  { id: 'large', value: '1.4rem', label: 'L' },
  { id: 'xlarge', value: '1.6rem', label: 'XL' }
]

function FontSizeSelector({ currentFontSize, onFontSizeChange }) {
  const { t } = useI18n()

  const handleFontSizeChange = (fontSizeId) => {
    playButtonSound()
    onFontSizeChange(fontSizeId)
  }

  return (
    <div className="font-size-selector">
      <div className="font-size-buttons">
        {fontSizes.map((fontSize) => (
          <button
            key={fontSize.id}
            className={`control-button ${currentFontSize === fontSize.id ? 'active' : ''}`}
            onClick={() => handleFontSizeChange(fontSize.id)}
            title={t(`font_sizes.${fontSize.id}`)}
          >
            <span className="control-icon">{fontSize.label}</span>
            <span className="control-text">{t(`font_sizes.${fontSize.id}`)}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default FontSizeSelector
