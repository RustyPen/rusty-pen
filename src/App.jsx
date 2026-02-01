import { useState, useEffect, useRef } from 'react'
import './App.css'
import WritingArea from './components/WritingArea'
import Sidebar from './components/Sidebar'
import WritingSettingsPanel from './components/WritingSettingsPanel'
import SettingsModal from './components/SettingsModal'
import AboutModal from './components/AboutModal'
import DeleteConfirmModal from './components/DeleteConfirmModal'
import TitleBar from './components/TitleBar'
import SplashScreen from './components/SplashScreen'
import { applyGlobalTheme } from './utils/themeUtils'
import { applyFont } from './utils/fontUtils'
import { I18nProvider, useI18n } from './contexts/I18nContext'
import { loadSettings, saveSettings, loadArticles, saveArticles, loadArticleContent, saveArticleContent, deleteArticleFile } from './utils/settingsUtils'
import { getCurrentWindow } from '@tauri-apps/api/window'

function AppContent({ settings, updateSettings }) {
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
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [articleToDelete, setArticleToDelete] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const { language, changeLanguage, t } = useI18n()

  useEffect(() => {
    const initApp = async () => {
      setGlobalTheme(settings.globalTheme)
      setCurrentFont(settings.font)

      const savedArticles = await loadArticles()
      setArticles(savedArticles)
    }

    initApp()

    setTimeout(() => setIsLoaded(true), 500)
  }, [settings])

  useEffect(() => {
    applyGlobalTheme(globalTheme)
  }, [globalTheme])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveArticles(articles)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [articles])

  useEffect(() => {
    const unlisten = getCurrentWindow().onCloseRequested(async () => {
      if (activeArticle) {
        await saveArticleContent(activeArticle)
      }
    })

    return () => {
      unlisten.then(fn => fn())
    }
  }, [activeArticle])

  const handleNewArticle = () => {
    const newArticle = {
      id: Date.now(),
      title: t('sidebar.untitled'),
      content: '',
      date: new Date().toLocaleDateString()
    }
    setArticles([newArticle, ...articles])
    setActiveArticle(newArticle)
  }

  const handleArticleSelect = async (article) => {
    if (activeArticle) {
      await saveArticleContent(activeArticle)
    }
    const content = await loadArticleContent(article.id)
    setActiveArticle({ ...article, content: content || '' })
  }

  const handleDeleteArticle = (articleId) => {
    if (isDeleting) return

    const article = articles.find(a => a.id === articleId)
    if (article) {
      setArticleToDelete(article)
      setDeleteConfirmOpen(true)
    }
  }

  const handleConfirmDelete = async () => {
    if (isDeleting || !articleToDelete) return

    setIsDeleting(true)
    setDeleteConfirmOpen(false)

    setArticles(articles.filter(a => a.id !== articleToDelete.id))
    if (activeArticle?.id === articleToDelete.id) {
      setActiveArticle(null)
    }

    await deleteArticleFile(articleToDelete.id)
    setArticleToDelete(null)
    setIsDeleting(false)
  }

  const handleContentChange = (articleId, newContent) => {
    setArticles(articles.map(article =>
      article.id === articleId
        ? { ...article, content: newContent }
        : article
    ))

    if (activeArticle?.id === articleId) {
      setActiveArticle({ ...activeArticle, content: newContent })
    }
  }

  const handleBlurSave = async (articleId, content) => {
    await saveArticleContent({ id: articleId, content })
  }

  const handleUpdateArticle = (articleId, updates) => {
    setArticles(articles.map(article =>
      article.id === articleId
        ? { ...article, ...updates }
        : article
    ))

    if (activeArticle?.id === articleId) {
      setActiveArticle({ ...activeArticle, ...updates })
    }
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

  const handleGlobalThemeChange = async (themeId) => {
    setGlobalTheme(themeId)
    await updateSettings({
      ...settings,
      globalTheme: themeId
    })
  }

  const handleFontChange = async (fontId) => {
    setCurrentFont(fontId)
    applyFont(fontId)
    await updateSettings({
      ...settings,
      font: fontId
    })
  }

  const handleLanguageChange = async (languageId) => {
    changeLanguage(languageId)
    await updateSettings({
      ...settings,
      language: languageId
    })
  }

  const handleSplashScreenToggle = async (enabled) => {
    await updateSettings({
      ...settings,
      showSplashScreen: enabled
    })
  }

  return (
    <div className={`app ${isLoaded ? 'loaded' : ''}`}>
      <TitleBar
        onOpenSettings={() => setSettingsModalOpen(true)}
        onOpenAbout={() => setAboutModalOpen(true)}
      />
      <div className="app-content">
        <Sidebar
          articles={articles}
          activeArticle={activeArticle}
          onArticleSelect={handleArticleSelect}
          onNewArticle={handleNewArticle}
          onDeleteArticle={handleDeleteArticle}
          onUpdateArticle={handleUpdateArticle}
        />
        <div className="main-content">
          <WritingArea
            theme={currentTheme}
            pen={currentPen}
            font={currentFont}
            soundEnabled={soundEnabled}
            activeArticle={activeArticle}
            onContentChange={handleContentChange}
            onBlurSave={handleBlurSave}
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
        showSplashScreen={settings.showSplashScreen}
        onSplashScreenToggle={handleSplashScreenToggle}
      />
      <AboutModal
        isOpen={aboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
      />
      <DeleteConfirmModal
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        articleTitle={articleToDelete?.title || 'Article'}
      />
    </div>
  )
}

function App() {
  const [settings, setSettings] = useState(null)
  const hasInitialized = useRef(false)
  const [isAppReady, setIsAppReady] = useState(false)
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    if (hasInitialized.current) return
    hasInitialized.current = true

    const initApp = async () => {
      const loadedSettings = await loadSettings()
      setSettings(loadedSettings)
      setShowSplash(loadedSettings.showSplashScreen)
      setIsAppReady(true)
    }

    initApp()
  }, [])

  const updateSettings = async (newSettings) => {
    setSettings(newSettings)
    await saveSettings(newSettings)
  }

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  if (!isAppReady) {
    return null
  }

  if (showSplash) {
    return (
      <I18nProvider initialLanguage={settings.language}>
        <SplashScreen onComplete={handleSplashComplete} />
      </I18nProvider>
    )
  }

  return (
    <I18nProvider initialLanguage={settings.language}>
      <AppContent settings={settings} updateSettings={updateSettings} />
    </I18nProvider>
  )
}

export default App
