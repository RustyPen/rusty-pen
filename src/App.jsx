import { useState, useEffect } from 'react'
import './App.css'
import WritingArea from './components/WritingArea'
import Sidebar from './components/Sidebar'
import WritingSettingsPanel from './components/WritingSettingsPanel'
import SettingsModal from './components/SettingsModal'
import AboutModal from './components/AboutModal'
import TitleBar from './components/TitleBar'
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
  const [articles, setArticles] = useState([])
  const [activeArticle, setActiveArticle] = useState(null)
  const [settingsModalOpen, setSettingsModalOpen] = useState(false)
  const [aboutModalOpen, setAboutModalOpen] = useState(false)
  const { language, changeLanguage, t } = useI18n()

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 500)
    
    const savedArticles = localStorage.getItem('rusty-pen-articles')
    if (savedArticles) {
      setArticles(JSON.parse(savedArticles))
    }

    const handleOpenSettings = () => {
      setSettingsModalOpen(true)
    }

    const handleOpenAbout = () => {
      setAboutModalOpen(true)
    }

    window.addEventListener('open-settings', handleOpenSettings)
    window.addEventListener('open-about', handleOpenAbout)

    return () => {
      window.removeEventListener('open-settings', handleOpenSettings)
      window.removeEventListener('open-about', handleOpenAbout)
    }
  }, [])

  useEffect(() => {
    applyGlobalTheme(globalTheme)
  }, [globalTheme])

  useEffect(() => {
    localStorage.setItem('rusty-pen-articles', JSON.stringify(articles))
  }, [articles])

  const handleNewArticle = () => {
    const newArticle = {
      id: Date.now(),
      title: '',
      content: '',
      date: new Date().toLocaleDateString()
    }
    setArticles([newArticle, ...articles])
    setActiveArticle(newArticle)
  }

  const handleArticleSelect = (article) => {
    setActiveArticle(article)
  }

  const handleDeleteArticle = (articleId) => {
    setArticles(articles.filter(a => a.id !== articleId))
    if (activeArticle?.id === articleId) {
      setActiveArticle(null)
    }
  }

  const handleContentChange = (articleId, newContent) => {
    setArticles(articles.map(article => 
      article.id === articleId 
        ? { ...article, content: newContent }
        : article
    ))
  }

  const handleThemeChange = (themeId) => {
    setCurrentTheme(themeId)
  }

  const handlePenChange = (penId) => {
    setCurrentPen(penId)
  }

  const handleSoundToggle = (enabled) => {
    setSoundEnabled(enabled)
  }

  const handleGlobalThemeChange = (themeId) => {
    setGlobalTheme(themeId)
  }

  const handleFontChange = (fontId) => {
    setCurrentFont(fontId)
    applyFont(fontId)
  }

  const handleLanguageChange = (languageId) => {
    changeLanguage(languageId)
  }

  return (
    <div className={`app ${isLoaded ? 'loaded' : ''}`}>
      <TitleBar />
      <div className="app-content">
        <Sidebar 
          articles={articles}
          activeArticle={activeArticle}
          onArticleSelect={handleArticleSelect}
          onNewArticle={handleNewArticle}
          onDeleteArticle={handleDeleteArticle}
        />
        <div className="main-content">
          <WritingArea 
            theme={currentTheme} 
            pen={currentPen} 
            font={currentFont}
            language={language}
            soundEnabled={soundEnabled}
            activeArticle={activeArticle}
            onContentChange={handleContentChange}
          />
        </div>
        <WritingSettingsPanel 
          currentTheme={currentTheme}
          onThemeChange={handleThemeChange}
          currentPen={currentPen}
          onPenChange={handlePenChange}
          soundEnabled={soundEnabled}
          onSoundToggle={handleSoundToggle}
        />
      </div>
      <SettingsModal 
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        currentTheme={globalTheme}
        onThemeChange={handleGlobalThemeChange}
        currentFont={currentFont}
        onFontChange={handleFontChange}
        currentLanguage={language}
        onLanguageChange={handleLanguageChange}
      />
      <AboutModal 
        isOpen={aboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
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
