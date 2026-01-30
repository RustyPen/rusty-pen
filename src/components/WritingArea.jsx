import { useState, useRef, useEffect } from 'react'
import './WritingArea.css'
import { getFontById } from '../utils/fontUtils'
import { useI18n } from '../contexts/I18nContext'

const themes = {
  vintage: {
    name: '复古信纸',
    background: 'linear-gradient(180deg, #F5E6D3 0%, #E8DCC8 100%)',
    textColor: '#1a1a1a',
    fontFamily: 'Georgia, serif',
    paperTexture: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.08\'/%3E%3C/svg%3E")'
  },
  parchment: {
    name: '羊皮纸',
    background: 'linear-gradient(180deg, #D4C4A8 0%, #C4B393 100%)',
    textColor: '#2c1810',
    fontFamily: 'Garamond, serif',
    paperTexture: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.6\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.12\'/%3E%3C/svg%3E")'
  },
  manuscript: {
    name: '手稿纸',
    background: 'linear-gradient(180deg, #FFF8E7 0%, #F5E6D3 100%)',
    textColor: '#2c1810',
    fontFamily: 'Georgia, serif',
    paperTexture: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpattern id=\'lines\' width=\'100%25\' height=\'32\' patternUnits=\'userSpaceOnUse\'%3E%3Cline x1=\'0\' y1=\'31\' x2=\'100%25\' y2=\'31\' stroke=\'%23B87333\' stroke-width=\'0.5\' opacity=\'0.3\'/%3E%3C/pattern%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'url(%23lines)\'/%3E%3C/svg%3E")'
  },
  telegram: {
    name: '电报纸',
    background: 'linear-gradient(180deg, #FFF8DC 0%, #F0E68C 100%)',
    textColor: '#000000',
    fontFamily: 'Courier New, monospace',
    paperTexture: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpattern id=\'grid\' width=\'100%25\' height=\'32\' patternUnits=\'userSpaceOnUse\'%3E%3Cline x1=\'0\' y1=\'31\' x2=\'100%25\' y2=\'31\' stroke=\'%23000\' stroke-width=\'0.3\' opacity=\'0.2\'/%3E%3C/pattern%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'url(%23grid)\'/%3E%3C/svg%3E")'
  }
}

const pens = {
  fountain: {
    name: '钢笔',
    fontFamily: 'Georgia, serif',
    fontWeight: '500',
    letterSpacing: '0.01em',
    soundType: 'fountain'
  },
  brush: {
    name: '毛笔',
    fontFamily: 'KaiTi, STKaiti, serif',
    fontWeight: '400',
    letterSpacing: '0.02em',
    soundType: 'brush'
  },
  feather: {
    name: '羽毛笔',
    fontFamily: 'Times New Roman, serif',
    fontWeight: '400',
    fontStyle: 'italic',
    letterSpacing: '0.03em',
    soundType: 'feather'
  },
  ballpoint: {
    name: '圆珠笔',
    fontFamily: 'Arial, sans-serif',
    fontWeight: '400',
    letterSpacing: '0em',
    soundType: 'ballpoint'
  }
}

const fontSizes = {
  small: '1.0rem',
  medium: '1.2rem',
  large: '1.4rem',
  xlarge: '1.6rem'
}

function WritingArea({ theme, pen, font, fontSize, soundEnabled, language, activeArticle, onContentChange }) {
  const [content, setContent] = useState('')
  const textareaRef = useRef(null)
  const audioCacheRef = useRef({})
  const typingTimerRef = useRef(null)
  const isTypingRef = useRef(false)
  
  const currentTheme = themes[theme] || themes.vintage
  const currentPen = pens[pen] || pens.fountain
  const currentFont = getFontById(font) || getFontById('georgia')
  const currentFontSize = fontSizes[fontSize] || fontSizes.medium
  const infoFontSize = parseFloat(currentFontSize) * 0.75 + 'rem'
  const { t } = useI18n()
  
  const penPaths = {
    fountain: '/cursors/fountain.svg',
    brush: '/cursors/brush.svg',
    feather: '/cursors/feather.svg',
    ballpoint: '/cursors/ballpoint.svg'
  }
  const cursorPath = penPaths[pen] || penPaths.fountain
  
  const placeholderText = t('writing.placeholder')

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (activeArticle) {
      setContent(activeArticle.content || '')
    } else {
      setContent('')
    }
  }, [activeArticle])

  const preloadAudio = (soundType) => {
    if (audioCacheRef.current[soundType]) {
      return audioCacheRef.current[soundType]
    }

    const audio = new Audio(`/sounds/pens/${soundType}.mp3`)
    audio.loop = true
    audioCacheRef.current[soundType] = audio
    return audio
  }

  const startTypingSound = () => {
    if (!isTypingRef.current) {
      isTypingRef.current = true
      const soundType = currentPen.soundType || 'fountain'
      const audio = preloadAudio(soundType)
      
      if (audio) {
        audio.currentTime = 0
        audio.volume = 0.3
        audio.play().catch(err => {
          console.log('Audio play failed:', err)
        })
      }
    }

    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current)
    }

    typingTimerRef.current = setTimeout(() => {
      stopTypingSound()
    }, 500)
  }

  const stopTypingSound = () => {
    isTypingRef.current = false
    
    Object.values(audioCacheRef.current).forEach(audio => {
      audio.pause()
      audio.currentTime = 0
    })
  }

  const handleTyping = (e) => {
    const newContent = e.target.value
    setContent(newContent)
    
    if (soundEnabled) {
      startTypingSound()
    }
    
    if (activeArticle && onContentChange) {
      onContentChange(activeArticle.id, newContent)
    }
  }

  return (
    <div className="writing-area">
      <div 
        className="writing-paper"
        style={{
          background: currentTheme.background,
          fontFamily: `${currentPen.fontWeight} ${currentPen.fontStyle || ''} ${currentTheme.fontFamily}`,
          color: currentTheme.textColor
        }}
      >
        <div 
          className="paper-texture"
          style={{ backgroundImage: currentTheme.paperTexture }}
        ></div>
        <textarea
          ref={textareaRef}
          id="writing-textarea"
          className="writing-textarea"
          data-pen={pen}
          value={content}
          onChange={handleTyping}
          placeholder={placeholderText}
          style={{
            fontFamily: currentFont.family,
            fontWeight: currentPen.fontWeight,
            fontStyle: currentPen.fontStyle || 'normal',
            letterSpacing: currentPen.letterSpacing || '0em',
            fontSize: currentFontSize,
            color: currentTheme.textColor,
            cursor: `url('${cursorPath}') 0 24, auto`
          }}
        />
      </div>
      <div className="writing-info" style={{ fontSize: infoFontSize }}>
        <span className="word-count">{content.length} {t('writing.word_count')}</span>
        <span className="current-pen">{t(`pens.${pen}`)}</span>
      </div>
    </div>
  )
}

export default WritingArea
