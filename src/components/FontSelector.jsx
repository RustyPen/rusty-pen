import { useState, useEffect } from 'react'
import './FontSelector.css'
import { getFonts, applyFont } from '../utils/fontUtils'
import { getThemeById } from '../utils/themeUtils'
import { getAvailableFontsForLanguage } from '../utils/languageUtils'
import { playButtonSound } from '../utils/soundUtils'
import { useI18n } from '../contexts/I18nContext'

function FontSelector({ currentFont, onFontChange, currentTheme, currentLanguage }) {
  const [selectedFont, setSelectedFont] = useState(currentFont || 'georgia')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const allFonts = getFonts()
  const theme = getThemeById(currentTheme)
  const recommendedFonts = theme?.recommendedFonts || []
  const availableFontIds = getAvailableFontsForLanguage(currentLanguage)
  const fonts = allFonts.filter(font => availableFontIds.includes(font.id))
  const { t } = useI18n()

  useEffect(() => {
    setSelectedFont(currentFont || 'georgia')
  }, [currentFont])

  const categories = [
    { id: 'all' },
    { id: 'serif' },
    { id: 'sans-serif' },
    { id: 'chinese_serif' },
    { id: 'chinese_sans' },
    { id: 'chinese_cursive' },
    { id: 'monospace' },
    { id: 'cursive' }
  ].filter(category => {
    if (category.id === 'all') return true
    return fonts.some(font => font.category === category.id)
  })

  const filteredFonts = selectedCategory === 'all' 
    ? fonts 
    : fonts.filter(font => font.category === selectedCategory)

  const handleFontChange = (fontId) => {
    playButtonSound()
    setSelectedFont(fontId)
    applyFont(fontId)
    onFontChange(fontId)
  }

  const handleCategoryChange = (categoryId) => {
    playButtonSound()
    setSelectedCategory(categoryId)
  }

  return (
    <div className="font-selector">
      <div className="font-categories">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`font-category ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => handleCategoryChange(category.id)}
          >
            {t(`fonts.${category.id}`)}
          </button>
        ))}
      </div>

      <div className="font-grid">
        {filteredFonts.map((font) => (
          <button
            key={font.id}
            className={`font-option ${selectedFont === font.id ? 'active' : ''} ${recommendedFonts.includes(font.id) ? 'recommended' : ''}`}
            onClick={() => handleFontChange(font.id)}
            title={font.description}
          >
            <span 
              className="font-preview" 
              style={{ fontFamily: font.family }}
            >
              {font.preview}
            </span>
            <span className="font-name">{t(`fonts.${font.id}`)}</span>
            {recommendedFonts.includes(font.id) && (
              <span className="font-recommend">{t('fonts.recommended')}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default FontSelector
