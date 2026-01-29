import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import WritingArea from './components/WritingArea'
import ThemeSelector from './components/ThemeSelector'
import GlobalThemeSelector from './components/GlobalThemeSelector'
import PenSelector from './components/PenSelector'
import SoundToggle from './components/SoundToggle'
import BackgroundMusic from './components/BackgroundMusic'
import ClickSoundSelector from './components/ClickSoundSelector'
import { applyGlobalTheme } from './utils/themeUtils'

function App() {
  const [currentTheme, setCurrentTheme] = useState('vintage')
  const [globalTheme, setGlobalTheme] = useState('light')
  const [currentPen, setCurrentPen] = useState('fountain')
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 500)
  }, [])

  useEffect(() => {
    applyGlobalTheme(globalTheme)
  }, [globalTheme])

  return (
    <div className={`app ${isLoaded ? 'loaded' : ''}`}>
      <Header />
      <div className="app-controls">
        <GlobalThemeSelector currentTheme={globalTheme} onThemeChange={setGlobalTheme} />
        <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
        <PenSelector currentPen={currentPen} onPenChange={setCurrentPen} />
        <SoundToggle enabled={soundEnabled} onToggle={setSoundEnabled} />
        <ClickSoundSelector />
        <BackgroundMusic />
      </div>
      <WritingArea 
        theme={currentTheme} 
        pen={currentPen} 
        soundEnabled={soundEnabled}
      />
    </div>
  )
}

export default App
