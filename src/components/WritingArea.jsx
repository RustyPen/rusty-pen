import { useState, useRef, useEffect } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import './WritingArea.css'
import { getFontById } from '../utils/fontUtils'
import { useI18n } from '../contexts/I18nContext'
import { playButtonSound } from '../utils/soundUtils'
import { save } from '@tauri-apps/plugin-dialog'
import { writeFile } from '@tauri-apps/plugin-fs'

export const vintagePapers = [
  { id: 1, texture: 'url(images/vintage1.jpg)' },
  { id: 2, texture: 'url(images/vintage2.jpg)' },
  { id: 3, texture: 'url(images/vintage3.jpg)' },
  { id: 4, texture: 'url(images/vintage4.jpg)' }
]

const themes = {
  vintage: {
    name: '复古信纸',
    background: 'linear-gradient(180deg, #FAF3E0 0%, #F5E6D3 50%, #E8DCC8 100%)',
    textColor: '#1a1a1a',
    paperTexture: 'url(images/vintage1.jpg)'
  },
  parchment: {
    name: '羊皮纸',
    background: 'linear-gradient(135deg, #C9B896 0%, #B8A67E 25%, #D4C4A8 50%, #C4B393 75%, #B8A67E 100%)',
    textColor: '#2c1810',
    paperTexture: 'url(images/parchment.jpg)'
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

function WritingArea({ theme, pen, font, fontSize, soundEnabled, activeArticle, onContentChange, onBlurSave, useA4Ratio, vintagePaperId, customPaperUrl, useCustomPaper, paperOpacity }) {
  const [content, setContent] = useState('')
  const editorRef = useRef(null)
  const paperRef = useRef(null)
  const audioCacheRef = useRef({})
  const typingTimerRef = useRef(null)
  const isTypingRef = useRef(false)
  const isUpdatingRef = useRef(false)
  
  const currentTheme = themes[theme] || themes.vintage
  const currentPen = pens[pen] || pens.fountain
  const currentFont = getFontById(font) || getFontById('georgia')
  const { t } = useI18n()
  
  const fontSizeMap = {
    small: 14,
    medium: 16,
    large: 20,
    xlarge: 24
  }
  
  const currentFontSize = fontSizeMap[fontSize] || 16
  
  const isLinedPaper = theme === 'manuscript' || theme === 'telegram'
  
  const A4_ASPECT_RATIO = 210 / 297
  
  let paperTexture = currentTheme.paperTexture
  let currentPaperOpacity = paperOpacity !== undefined ? paperOpacity : 0.3
  
  if (theme === 'vintage') {
    if (useCustomPaper && customPaperUrl) {
      paperTexture = `url(${customPaperUrl})`
    } else if (vintagePaperId) {
      const selectedPaper = vintagePapers.find(p => p.id === vintagePaperId)
      if (selectedPaper) {
        paperTexture = selectedPaper.texture
      }
    }
  }
  
  const paperStyle = {
    background: currentTheme.background,
    color: currentTheme.textColor
  }
  
  if (useA4Ratio) {
    paperStyle.aspectRatio = `${A4_ASPECT_RATIO}`
  }
  
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

  const handleBlur = () => {
    if (activeArticle && onBlurSave) {
      onBlurSave(activeArticle.id, content)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      document.execCommand('insertLineBreak', false, null)
    }
  }

  const handleExportPDF = async () => {
    if (!content.trim()) {
      return
    }

    playButtonSound()

    try {
      const A4_WIDTH = 794
      const A4_HEIGHT = 1123

      const exportContainer = document.createElement('div')
      exportContainer.style.position = 'fixed'
      exportContainer.style.left = '-9999px'
      exportContainer.style.top = '0'
      exportContainer.style.width = `${A4_WIDTH}px`
      exportContainer.style.height = `${A4_HEIGHT}px`
      document.body.appendChild(exportContainer)

      const writingArea = document.querySelector('.writing-area')
      if (!writingArea) {
        document.body.removeChild(exportContainer)
        return
      }

      const clonedWritingArea = writingArea.cloneNode(true)
      clonedWritingArea.style.width = '100%'
      clonedWritingArea.style.height = '100%'
      clonedWritingArea.style.minHeight = '100%'
      clonedWritingArea.style.boxShadow = 'none'
      clonedWritingArea.style.overflow = 'hidden'
      clonedWritingArea.style.padding = '0'
      clonedWritingArea.style.backgroundColor = 'var(--background-primary)'

      const writingInfo = clonedWritingArea.querySelector('.writing-info')
      if (writingInfo) {
        writingInfo.remove()
      }

      const writingPaper = clonedWritingArea.querySelector('.writing-paper')
      if (writingPaper) {
        writingPaper.style.border = 'none'
        writingPaper.style.borderRadius = '0'
        writingPaper.style.boxShadow = 'none'
      }

      const writingEditor = clonedWritingArea.querySelector('.writing-editor')
      if (writingEditor) {
        writingEditor.style.padding = '2rem'
        
        if (writingEditor.classList.contains('lined-paper')) {
          const isTelegram = writingPaper?.getAttribute('data-theme') === 'telegram'
          const lineColor = isTelegram ? 'rgba(0, 0, 0, 0.2)' : 'rgba(184, 115, 51, 0.3)'
          
          const svgPattern = `
            <svg width="100%" height="32" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="lines" width="100%" height="32" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="28.5" x2="100%" y2="28.5" stroke="${lineColor}" stroke-width="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#lines)"/>
            </svg>
          `
          
          const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgPattern)}`
          writingEditor.style.backgroundImage = `url('${svgDataUrl}')`
          writingEditor.style.backgroundSize = '100% 32px'
          writingEditor.style.backgroundRepeat = 'repeat-y'
        }
      }

      exportContainer.appendChild(clonedWritingArea)

      const canvas = await html2canvas(exportContainer, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
        allowTaint: true,
        logging: false,
        letterRendering: true
      })

      document.body.removeChild(exportContainer)

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()

      const imgData = canvas.toDataURL('image/png', 1.0)
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      
      const pdfBytes = pdf.output('arraybuffer')
      const pdfArray = new Uint8Array(pdfBytes)
      
      const fileName = activeArticle?.title || 'untitled'
      const defaultPath = `${fileName}.pdf`
      
      const filePath = await save({
        defaultPath,
        filters: [
          {
            name: 'PDF',
            extensions: ['pdf']
          }
        ]
      })
      
      if (filePath) {
        await writeFile(filePath, pdfArray)
      }
    } catch (error) {
      console.error('Export PDF failed:', error)
    }
  }

  return (
    <div className="writing-area">
      {!activeArticle ? (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h2 className="empty-title">{t('sidebar.new_article')}</h2>
          <p className="empty-description">{t('sidebar.empty_hint')}</p>
        </div>
      ) : (
        <>
          <div 
            ref={paperRef}
            className={`writing-paper ${isLinedPaper ? 'lined-paper' : ''} ${useA4Ratio ? 'a4-ratio' : ''}`}
            style={paperStyle}
            data-theme={theme}
          >
            <div 
              className="paper-texture"
              style={{ 
                backgroundImage: paperTexture,
                opacity: currentPaperOpacity
              }}
            ></div>
            <div
              ref={editorRef}
              id="writing-editor"
              className={`writing-editor ${isLinedPaper ? 'lined-paper' : ''}`}
              contentEditable="true"
              data-pen={pen}
              data-placeholder={placeholderText}
              onInput={handleTyping}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              style={{
                fontFamily: currentFont.family,
                fontWeight: currentPen.fontWeight,
                fontStyle: currentPen.fontStyle || 'normal',
                letterSpacing: currentPen.letterSpacing || '0em',
                fontSize: `${currentFontSize}px`,
                color: currentTheme.textColor,
                cursor: `url('${cursorPath}') 0 24, auto`
              }}
            ></div>
          </div>
          <div className="writing-info">
            <span className="word-count">{content.length} {t('writing.word_count')}</span>
            <div className="writing-buttons">
              <button 
                className="export-btn"
                onClick={handleExportPDF}
                disabled={!content.trim()}
              >
                {t('writing.export_pdf')}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default WritingArea
