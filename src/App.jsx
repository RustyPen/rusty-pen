import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import WritingArea from './components/WritingArea'
import ThemeSelector from './components/ThemeSelector'
import GlobalThemeSelector from './components/GlobalThemeSelector'
import PenSelector from './components/PenSelector'
import FontSelector from './components/FontSelector'
import LanguageSelector from './components/LanguageSelector'
import SoundToggle from './components/SoundToggle'
import BackgroundMusic from './components/BackgroundMusic'
import ClickSoundSelector from './components/ClickSoundSelector'
import { applyGlobalTheme, getThemeById } from './utils/themeUtils'
import { applyFont } from './utils/fontUtils'
import { languages } from './utils/languageUtils'
import { I18nProvider, useI18n } from './contexts/I18nContext'

function AppContent() {
  const [currentTheme, setCurrentTheme] = useState('vintage')
  const [globalTheme, setGlobalTheme] = useState('light')
  const [currentFont, setCurrentFont] = useState('yahei')
  const [currentPen, setCurrentPen] = useState('fountain')
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const { language, changeLanguage } = useI18n()

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 500)
  }, [])

  useEffect(() => {
    applyGlobalTheme(globalTheme)
    const theme = getThemeById(globalTheme)
    if (theme && theme.defaultFont) {
      const langConfig = languages[language]
      const availableFonts = langConfig?.fonts || []
      const defaultFont = availableFonts.find(fontId => fontId === theme.defaultFont) || availableFonts[0]
      if (defaultFont) {
        setCurrentFont(defaultFont)
        applyFont(defaultFont)
      }
    }
  }, [globalTheme, language])

  const handleGlobalThemeChange = (themeId) => {
    setGlobalTheme(themeId)
  }

  const handleLanguageChange = (languageId) => {
    changeLanguage(languageId)
    const langConfig = languages[languageId]
    if (langConfig && langConfig.fonts && langConfig.fonts.length > 0) {
      setCurrentFont(langConfig.fonts[0])
      applyFont(langConfig.fonts[0])
    }
  }

  const handleFontChange = (fontId) => {
    setCurrentFont(fontId)
    applyFont(fontId)
  }

  return (
    <div className={`app ${isLoaded ? 'loaded' : ''}`}>
      <Header />
      <div className="app-controls">
        <LanguageSelector currentLanguage={language} onLanguageChange={handleLanguageChange} />
        <GlobalThemeSelector currentTheme={globalTheme} onThemeChange={handleGlobalThemeChange} />
        <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
        <PenSelector currentPen={currentPen} onPenChange={setCurrentPen} />
        <FontSelector currentFont={currentFont} onFontChange={handleFontChange} currentTheme={globalTheme} currentLanguage={language} />
        <SoundToggle enabled={soundEnabled} onToggle={setSoundEnabled} />
        <ClickSoundSelector />
        <BackgroundMusic />
      </div>
      <WritingArea 
        theme={currentTheme} 
        pen={currentPen} 
        font={currentFont}
        language={language}
        soundEnabled={soundEnabled}
      />
    </div>
  )
}

function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  )
}

export default App
