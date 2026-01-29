import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import WritingArea from './components/WritingArea'
import ThemeSelector from './components/ThemeSelector'
import PenSelector from './components/PenSelector'
import SoundToggle from './components/SoundToggle'
import BackgroundMusic from './components/BackgroundMusic'
import ClickSoundSelector from './components/ClickSoundSelector'
import SettingsButton from './components/SettingsButton'
import SettingsModal from './components/SettingsModal'
import { applyGlobalTheme } from './utils/themeUtils'
import { applyFont } from './utils/fontUtils'
import { I18nProvider, useI18n } from './contexts/I18nContext'

function AppContent() {
  const [currentTheme, setCurrentTheme] = useState('vintage')
  const [globalTheme, setGlobalTheme] = useState('light')
  const [currentFont, setCurrentFont] = useState('yahei')
  const [currentPen, setCurrentPen] = useState('fountain')
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const { language, changeLanguage, t } = useI18n()

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 500)
  }, [])

  useEffect(() => {
    applyGlobalTheme(globalTheme)
  }, [globalTheme])

  const handleGlobalThemeChange = (themeId) => {
    setGlobalTheme(themeId)
  }

  const handleLanguageChange = (languageId) => {
    changeLanguage(languageId)
  }

  const handleFontChange = (fontId) => {
    setCurrentFont(fontId)
    applyFont(fontId)
  }

  return (
    <div className={`app ${isLoaded ? 'loaded' : ''}`}>
      <Header />
      <div className="app-controls">
        <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
        <PenSelector currentPen={currentPen} onPenChange={setCurrentPen} />
        <SoundToggle enabled={soundEnabled} onToggle={setSoundEnabled} />
        <ClickSoundSelector />
        <BackgroundMusic />
        <SettingsButton onClick={() => setSettingsOpen(true)} />
      </div>
      <WritingArea 
        theme={currentTheme} 
        pen={currentPen} 
        font={currentFont}
        language={language}
        soundEnabled={soundEnabled}
      />
      <SettingsModal 
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        currentTheme={globalTheme}
        onThemeChange={handleGlobalThemeChange}
        currentFont={currentFont}
        onFontChange={handleFontChange}
        currentLanguage={language}
        onLanguageChange={handleLanguageChange}
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
