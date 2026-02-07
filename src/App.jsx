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
import { applyTheme } from './utils/themeUtils'
import { applyFont } from './utils/fontUtils'
import { I18nProvider, useI18n } from './contexts/I18nContext'
import { loadSettings, saveSettings, loadArticles, saveArticles, loadArticleContent, saveArticleContent, deleteArticleFile, resizeWindow, deleteCustomPaper, loadCustomPaperAsDataUrl } from './utils/settingsUtils'
import { getCurrentWindow } from '@tauri-apps/api/window'

function AppContent({ 
  settings, 
  updateSettings, 
  articles, 
  activeArticle, 
  onNewArticle, 
  onArticleSelect, 
  onDeleteArticle, 
  onUpdateArticle 
}) {
  const [currentPaper, setCurrentPaper] = useState('vintage')
  const [theme, setTheme] = useState('light')
  const [currentFont, setCurrentFont] = useState('yahei')
  const [currentFontSize, setCurrentFontSize] = useState('medium')
  const [currentWindowSize, setCurrentWindowSize] = useState('medium')
  const [useA4Ratio, setUseA4Ratio] = useState(false)
  const [currentPen, setCurrentPen] = useState('fountain')
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [vintagePaperId, setVintagePaperId] = useState(1)
  const [customPaperPath, setCustomPaperPath] = useState(null)
  const [customPaperUrl, setCustomPaperUrl] = useState(null)
  const [useCustomPaper, setUseCustomPaper] = useState(false)
  const [paperOpacity, setPaperOpacity] = useState(0.3)
  const [settingsModalOpen, setSettingsModalOpen] = useState(false)
  const [aboutModalOpen, setAboutModalOpen] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [articleToDelete, setArticleToDelete] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const { language, changeLanguage, t } = useI18n()

  useEffect(() => {
    settings.theme !== theme && setTheme(settings.theme)
    settings.font !== currentFont && setCurrentFont(settings.font)
    settings.fontSize !== currentFontSize && setCurrentFontSize(settings.fontSize || 'medium')
    settings.windowSize !== currentWindowSize && setCurrentWindowSize(settings.windowSize || 'medium')
    settings.useA4Ratio !== useA4Ratio && setUseA4Ratio(settings.useA4Ratio || false)
    settings.vintagePaperId !== vintagePaperId && setVintagePaperId(settings.vintagePaperId || 1)
    settings.useCustomPaper !== useCustomPaper && setUseCustomPaper(settings.useCustomPaper || false)
    settings.paperOpacity !== paperOpacity && setPaperOpacity(settings.paperOpacity !== undefined ? settings.paperOpacity : 0.3)
  }, [settings.theme, settings.font, settings.fontSize, settings.windowSize, settings.useA4Ratio, settings.vintagePaperId, settings.useCustomPaper, settings.paperOpacity])

  useEffect(() => {
    setCustomPaperPath(settings.customVintagePaper || null)
    if (settings.customVintagePaper) {
      loadCustomPaperAsDataUrl(settings.customVintagePaper).then((dataUrl) => {
        setCustomPaperUrl(dataUrl)
      }).catch(() => {
        console.error('Failed to load custom paper', settings.customVintagePaper)
      })
    }
  }, [settings.customVintagePaper])

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateSettings({
        ...settings,
        paperOpacity: paperOpacity
      })
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [paperOpacity])

  const handleNewArticle = () => {
    const newArticle = {
      id: Date.now(),
      title: t('sidebar.untitled'),
      content: '',
      date: new Date().toLocaleDateString()
    }
    onNewArticle(newArticle)
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

    onDeleteArticle(articleToDelete.id)
    
    await deleteArticleFile(articleToDelete.id)
    setArticleToDelete(null)
    setIsDeleting(false)
  }

  const handleContentChange = (articleId, newContent) => {
    onUpdateArticle(articleId, { content: newContent })
  }

  const handleBlurSave = async (articleId, content) => {
    await saveArticleContent({ id: articleId, content })
  }

  const handlePaperChange = (paperId) => {
    setCurrentPaper(paperId)
  }

  const handlePenChange = (penId) => {
    setCurrentPen(penId)
  }

  const handleSoundToggle = (enabled) => {
    setSoundEnabled(enabled)
  }

  const handleThemeChange = async (themeId) => {
    setTheme(themeId)
    await updateSettings({
      ...settings,
      theme: themeId
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

  const handleFontSizeChange = async (fontSizeId) => {
    setCurrentFontSize(fontSizeId)
    await updateSettings({
      ...settings,
      fontSize: fontSizeId
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

  const handleWindowSizeChange = async (windowSizeId) => {
    setCurrentWindowSize(windowSizeId)

    const windowSizes = {
      small: { width: 1280, height: 720 },
      medium: { width: 1600, height: 900 },
      large: { width: 1920, height: 1080 },
      xlarge: { width: 2560, height: 1440 }
    }

    const size = windowSizes[windowSizeId]
    if (size) {
      await resizeWindow(size.width, size.height)
    }

    await updateSettings({
      ...settings,
      windowSize: windowSizeId
    })
  }

  const handleA4RatioToggle = async (enabled) => {
    setUseA4Ratio(enabled)
    await updateSettings({
      ...settings,
      useA4Ratio: enabled
    })
  }

  const handleVintagePaperChange = async (paperId) => {
    setVintagePaperId(paperId)
    setUseCustomPaper(false)
    await updateSettings({
      ...settings,
      vintagePaperId: paperId,
      useCustomPaper: false
    })
  }

  const handleCustomPaperChange = async (filePath, base64Data) => {
    if (filePath === null && customPaperPath) {
      await deleteCustomPaper(customPaperPath)
    }

    setCustomPaperPath(filePath)
    if (filePath) {
      setUseCustomPaper(true)
      if (base64Data) {
        const extension = filePath.split('.').pop()
        const mimeType = extension === 'png' ? 'image/png' : 'image/jpeg'
        setCustomPaperUrl(`data:${mimeType};base64,${base64Data}`)
      } else {
        const dataUrl = await loadCustomPaperAsDataUrl(filePath)
        setCustomPaperUrl(dataUrl)
      }
    } else {
      setUseCustomPaper(false)
      setCustomPaperUrl(null)
    }
    await updateSettings({
      ...settings,
      customVintagePaper: filePath,
      useCustomPaper: !!filePath
    })
  }

  return (
    <div className="app">
      <TitleBar
        onOpenSettings={() => setSettingsModalOpen(true)}
        onOpenAbout={() => setAboutModalOpen(true)}
      />
      <div className="app-content">
        <Sidebar
          articles={articles}
          activeArticle={activeArticle}
          onArticleSelect={onArticleSelect}
          onNewArticle={handleNewArticle}
          onDeleteArticle={handleDeleteArticle}
          onUpdateArticle={onUpdateArticle}
        />
        <div className="main-content">
          <WritingArea
            paper={currentPaper}
            pen={currentPen}
            font={currentFont}
            fontSize={currentFontSize}
            soundEnabled={soundEnabled}
            activeArticle={activeArticle}
            onContentChange={handleContentChange}
            onBlurSave={handleBlurSave}
            useA4Ratio={useA4Ratio}
            vintagePaperId={vintagePaperId}
            customPaperUrl={customPaperUrl}
            useCustomPaper={useCustomPaper}
            paperOpacity={paperOpacity}
          />
        </div>
        <WritingSettingsPanel
          currentPaper={currentPaper}
          onPaperChange={handlePaperChange}
          currentPen={currentPen}
          onPenChange={handlePenChange}
          soundEnabled={soundEnabled}
          onSoundToggle={handleSoundToggle}
          vintagePaperId={vintagePaperId}
          onVintagePaperChange={handleVintagePaperChange}
          customPaperPath={customPaperPath}
          customPaperUrl={customPaperUrl}
          useCustomPaper={useCustomPaper}
          onCustomPaperChange={handleCustomPaperChange}
          paperOpacity={paperOpacity}
          onPaperOpacityChange={setPaperOpacity}
        />
      </div>
      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        currentTheme={theme}
        onThemeChange={handleThemeChange}
        currentFont={currentFont}
        onFontChange={handleFontChange}
        currentFontSize={currentFontSize}
        onFontSizeChange={handleFontSizeChange}
        currentLanguage={language}
        onLanguageChange={handleLanguageChange}
        showSplashScreen={settings.showSplashScreen}
        onSplashScreenToggle={handleSplashScreenToggle}
        currentWindowSize={currentWindowSize}
        onWindowSizeChange={handleWindowSizeChange}
        useA4Ratio={useA4Ratio}
        onA4RatioToggle={handleA4RatioToggle}
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
  const [articles, setArticles] = useState([])
  const [activeArticle, setActiveArticle] = useState(null)
  const [isAppReady, setIsAppReady] = useState(false)
  const [showSplash, setShowSplash] = useState(true)
  const hasInitialized = useRef(false)

  useEffect(() => {
    if (hasInitialized.current) return
    hasInitialized.current = true

    const initApp = async () => {
      const [loadedSettings, savedArticles] = await Promise.all([
        loadSettings(),
        loadArticles()
      ])

      setSettings(loadedSettings)
      setShowSplash(loadedSettings.showSplashScreen)
      setArticles(savedArticles)

      if (savedArticles.length > 0) {
        const content = await loadArticleContent(savedArticles[0].id)
        setActiveArticle({ ...savedArticles[0], content: content || '' })
      }

      setIsAppReady(true)
    }

    initApp()
  }, [])

  const updateSettings = async (newSettings) => {
    setSettings(newSettings)
    await saveSettings(newSettings)
  }

  const handleNewArticle = (newArticle) => {
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

  const handleDeleteArticle = async (articleId) => {
    setArticles(articles.filter(a => a.id !== articleId))
    if (activeArticle?.id === articleId) {
      if (articles.length > 0) {
        const content = await loadArticleContent(articles[0].id)
        setActiveArticle({ ...articles[0], content: content || '' })
      } else {
        setActiveArticle(null)
      }
    }
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

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  if (showSplash && settings !== null) {
    return (
      <I18nProvider initialLanguage={settings.language}>
        <SplashScreen onComplete={handleSplashComplete} />
      </I18nProvider>
    )
  }

  if (!isAppReady) {
    return null
  }

  return (
    <I18nProvider initialLanguage={settings.language}>
      <AppContent 
        settings={settings} 
        updateSettings={updateSettings}
        articles={articles}
        activeArticle={activeArticle}
        onNewArticle={handleNewArticle}
        onArticleSelect={handleArticleSelect}
        onDeleteArticle={handleDeleteArticle}
        onUpdateArticle={handleUpdateArticle}
      />
    </I18nProvider>
  )
}

export default App
