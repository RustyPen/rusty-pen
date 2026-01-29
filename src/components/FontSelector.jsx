import { useState, useEffect } from 'react'
import './FontSelector.css'
import { getFonts, applyFont } from '../utils/fontUtils'
import { getThemeById } from '../utils/themeUtils'
import { playButtonSound } from '../utils/soundUtils'

function FontSelector({ currentFont, onFontChange, currentTheme }) {
  const [selectedFont, setSelectedFont] = useState(currentFont || 'georgia')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const fonts = getFonts()
  const theme = getThemeById(currentTheme)
  const recommendedFonts = theme?.recommendedFonts || []

  useEffect(() => {
    setSelectedFont(currentFont || 'georgia')
  }, [currentFont])

  const categories = [
    { id: 'all', name: '全部' },
    { id: 'serif', name: '衬线体' },
    { id: 'sans-serif', name: '无衬线' },
    { id: 'chinese', name: '中文字体' },
    { id: 'monospace', name: '等宽字体' },
    { id: 'cursive', name: '手写体' }
  ]

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
      <label className="font-label">字体选择</label>
      
      <div className="font-categories">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`font-category ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.name}
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
            <span className="font-name">{font.name}</span>
            {recommendedFonts.includes(font.id) && (
              <span className="font-recommend">推荐</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default FontSelector
