import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import WritingArea from './components/WritingArea'
import ThemeSelector from './components/ThemeSelector'
import GlobalThemeSelector from './components/GlobalThemeSelector'
import PenSelector from './components/PenSelector'
import FontSelector from './components/FontSelector'
import SoundToggle from './components/SoundToggle'
import BackgroundMusic from './components/BackgroundMusic'
import ClickSoundSelector from './components/ClickSoundSelector'
import { applyGlobalTheme, getThemeById } from './utils/themeUtils'
import { applyFont } from './utils/fontUtils'

function App() {
  const [currentTheme, setCurrentTheme] = useState('vintage')
  const [globalTheme, setGlobalTheme] = useState('light')
  const [currentFont, setCurrentFont] = useState('georgia')
  const [currentPen, setCurrentPen] = useState('fountain')
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 500)
  }, [])

  useEffect(() => {
    applyGlobalTheme(globalTheme)
    const theme = getThemeById(globalTheme)
    if (theme && theme.defaultFont) {
      setCurrentFont(theme.defaultFont)
      applyFont(theme.defaultFont)
    }
  }, [globalTheme])

  const handleGlobalThemeChange = (themeId) => {
    setGlobalTheme(themeId)
  }

  const handleFontChange = (fontId) => {
    setCurrentFont(fontId)
    applyFont(fontId)
  }

  return (
    <div className={`app ${isLoaded ? 'loaded' : ''}`}>
      <Header />
      <div className="app-controls">
        <GlobalThemeSelector currentTheme={globalTheme} onThemeChange={handleGlobalThemeChange} />
        <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
        <PenSelector currentPen={currentPen} onPenChange={setCurrentPen} />
        <FontSelector currentFont={currentFont} onFontChange={handleFontChange} currentTheme={globalTheme} />
        <SoundToggle enabled={soundEnabled} onToggle={setSoundEnabled} />
        <ClickSoundSelector />
        <BackgroundMusic />
      </div>
      <WritingArea 
        theme={currentTheme} 
        pen={currentPen} 
        font={currentFont}
        soundEnabled={soundEnabled}
      />
    </div>
  )
}

export default App
