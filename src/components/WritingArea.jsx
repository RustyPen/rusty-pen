import { useState, useRef, useEffect } from 'react'
import './WritingArea.css'
import { getFontById } from '../utils/fontUtils'
import { useI18n } from '../contexts/I18nContext'

const themes = {
  vintage: {
    name: '复古信纸',
    background: 'linear-gradient(180deg, #FAF3E0 0%, #F5E6D3 50%, #E8DCC8 100%)',
    textColor: '#1a1a1a',
    paperTexture: 'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.10\'/%3E%3Cfilter id=\'paper\'%3E%3CfeTurbulence type=\'turbulence\' baseFrequency=\'0.04\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3CfeColorMatrix type=\'matrix\' values=\'0 0 0 0 0.95 0 0 0 0 0.9 0 0 0 0 0.85 0 0 0 0.15 0\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23paper)\'/%3E%3C/svg%3E")'
  },
  parchment: {
    name: '羊皮纸',
    background: 'linear-gradient(135deg, #C9B896 0%, #B8A67E 25%, #D4C4A8 50%, #C4B393 75%, #B8A67E 100%)',
    textColor: '#2c1810',
    paperTexture: 'url("data:image/svg+xml,%3Csvg width=\'150\' height=\'150\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'rough\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'5\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23rough)\' opacity=\'0.15\'/%3E%3Cfilter id=\'parchment\'%3E%3CfeTurbulence type=\'turbulence\' baseFrequency=\'0.02\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3CfeColorMatrix type=\'matrix\' values=\'0 0 0 0 0.85 0 0 0 0 0.78 0 0 0 0 0.65 0 0 0 0.2 0\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23parchment)\'/%3E%3C/svg%3E")'
  },
  manuscript: {
    name: '手稿纸',
    background: 'linear-gradient(180deg, #FFF8E7 0%, #F5E6D3 100%)',
    textColor: '#2c1810',
    paperTexture: 'url("data:image/svg+xml,%3Csvg width=\'120\' height=\'120\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'paper\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.5\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23paper)\' opacity=\'0.08\'/%3E%3C/svg%3E")'
  },
  telegram: {
    name: '电报纸',
    background: 'linear-gradient(180deg, #FFF8DC 0%, #F0E68C 100%)',
    textColor: '#000000',
    paperTexture: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'telegraph\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.7\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23telegraph)\' opacity=\'0.12\'/%3E%3C/svg%3E")'
  }
}

const pens = {
  fountain: {
    name: '钢笔',
    fontWeight: '500',
    letterSpacing: '0.01em',
    soundType: 'fountain'
  },
  brush: {
    name: '毛笔',
    fontWeight: '400',
    letterSpacing: '0.02em',
    soundType: 'brush'
  },
  feather: {
    name: '羽毛笔',
    fontWeight: '400',
    fontStyle: 'italic',
    letterSpacing: '0.03em',
    soundType: 'feather'
  },
  ballpoint: {
    name: '圆珠笔',
    fontWeight: '400',
    letterSpacing: '0em',
    soundType: 'ballpoint'
  }
}

function WritingArea({ theme, pen, font, soundEnabled, language, activeArticle, onContentChange }) {
  const [content, setContent] = useState('')
  const editorRef = useRef(null)
  const audioCacheRef = useRef({})
  const typingTimerRef = useRef(null)
  const isTypingRef = useRef(false)
  const isUpdatingRef = useRef(false)
  
  const currentTheme = themes[theme] || themes.vintage
  const currentPen = pens[pen] || pens.fountain
  const currentFont = getFontById(font) || getFontById('georgia')
  const { t } = useI18n()
  
  const isLinedPaper = theme === 'manuscript' || theme === 'telegram'
  
  const penPaths = {
    fountain: '/cursors/fountain.svg',
    brush: '/cursors/brush.svg',
    feather: '/cursors/feather.svg',
    ballpoint: '/cursors/ballpoint.svg'
  }
  const cursorPath = penPaths[pen] || penPaths.fountain
  
  const placeholderText = t('writing.placeholder')

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (activeArticle && !isUpdatingRef.current) {
      setContent(activeArticle.content || '')
      if (editorRef.current) {
        editorRef.current.innerText = activeArticle.content || ''
      }
    } else if (!activeArticle && !isUpdatingRef.current) {
      setContent('')
      if (editorRef.current) {
        editorRef.current.innerText = ''
      }
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
    isUpdatingRef.current = true
    const newContent = e.target.innerText
    setContent(newContent)
    
    if (soundEnabled) {
      startTypingSound()
    }
    
    if (activeArticle && onContentChange) {
      onContentChange(activeArticle.id, newContent)
    }
    
    setTimeout(() => {
      isUpdatingRef.current = false
    }, 0)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      document.execCommand('insertLineBreak', false, null)
    }
  }

  const handleSubmit = () => {
    if (!activeArticle || !content.trim()) {
      return
    }
    
    alert(t('writing.submitted'))
  }

  return (
    <div className="writing-area">
      <div 
        className={`writing-paper ${isLinedPaper ? 'lined-paper' : ''}`}
        style={{
          background: currentTheme.background,
          color: currentTheme.textColor
        }}
        data-theme={theme}
      >
        <div 
          className="paper-texture"
          style={{ backgroundImage: currentTheme.paperTexture }}
        ></div>
        <div
          ref={editorRef}
          id="writing-editor"
          className={`writing-editor ${isLinedPaper ? 'lined-paper' : ''}`}
          contentEditable="true"
          data-pen={pen}
          data-placeholder={placeholderText}
          onInput={handleTyping}
          onKeyDown={handleKeyDown}
          style={{
            fontFamily: currentFont.family,
            fontWeight: currentPen.fontWeight,
            fontStyle: currentPen.fontStyle || 'normal',
            letterSpacing: currentPen.letterSpacing || '0em',
            color: currentTheme.textColor,
            cursor: `url('${cursorPath}') 0 24, auto`
          }}
        ></div>
      </div>
      <div className="writing-info">
        <span className="word-count">{content.length} {t('writing.word_count')}</span>
        <button 
          className="submit-btn"
          onClick={handleSubmit}
          disabled={!activeArticle || !content.trim()}
        >
          {t('writing.submit')}
        </button>
      </div>
    </div>
  )
}

export default WritingArea
