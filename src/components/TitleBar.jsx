import { useState, useEffect, useCallback } from 'react'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { playButtonSound } from '../utils/soundUtils'
import { useI18n } from '../contexts/I18nContext'
import './TitleBar.css'

function TitleBar() {
  const [isMaximized, setIsMaximized] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { t } = useI18n()

  useEffect(() => {
    const getCurrentWindowInstance = getCurrentWindow()

    const checkMaximized = async () => {
      const maximized = await getCurrentWindowInstance.isMaximized()
      setIsMaximized(maximized)
    }

    checkMaximized()

    const unlistenResize = getCurrentWindowInstance.onResized(() => {
      checkMaximized()
    })

    return () => {
      unlistenResize.then(f => f())
    }
  }, [])

  const handleMinimize = useCallback(async () => {
    const appWindow = getCurrentWindow()
    await appWindow.minimize()
  }, [])

  const handleMaximize = useCallback(async () => {
    const appWindow = getCurrentWindow()
    const newMaximizedState = !isMaximized
    setIsMaximized(newMaximizedState)
    if (newMaximizedState) {
      await appWindow.maximize()
    } else {
      await appWindow.unmaximize()
    }
  }, [isMaximized])

  const handleClose = useCallback(async () => {
    const appWindow = getCurrentWindow()
    await appWindow.close()
  }, [])

  const handleMenuClick = () => {
    playButtonSound()
    setMenuOpen(!menuOpen)
  }

  return (
    <div className="titlebar" data-tauri-drag-region>
      <div className="titlebar-left" data-tauri-drag-region>
        <div className="titlebar-menu">
          <button className="menu-button" onClick={handleMenuClick}>
            <span className="menu-icon">☰</span>
          </button>
          <div className={`menu-dropdown ${menuOpen ? 'open' : ''}`}>
            <div className="menu-item" onClick={() => {
              playButtonSound()
              window.dispatchEvent(new CustomEvent('open-settings'))
              setMenuOpen(false)
            }}>
              {t('titlebar.settings')}
            </div>
            <div className="menu-item" onClick={() => {
              playButtonSound()
              window.dispatchEvent(new CustomEvent('open-about'))
              setMenuOpen(false)
            }}>
              {t('titlebar.about')}
            </div>
          </div>
        </div>
        <div className="titlebar-title" data-tauri-drag-region>
          Rusty Pen
        </div>
      </div>
      <div className="titlebar-right">
        <button 
          className="titlebar-button minimize-button" 
          onClick={handleMinimize}
          title={t('titlebar.minimize')}
        >
          <span className="button-icon">─</span>
        </button>
        <button 
          className={`titlebar-button maximize-button ${isMaximized ? 'maximized' : ''}`} 
          onClick={handleMaximize}
          title={isMaximized ? t('titlebar.restore') : t('titlebar.maximize')}
        >
          <span className="button-icon">{isMaximized ? '❐' : '□'}</span>
        </button>
        <button 
          className="titlebar-button close-button" 
          onClick={handleClose}
          title={t('titlebar.close')}
        >
          <span className="button-icon">✕</span>
        </button>
      </div>
    </div>
  )
}

export default TitleBar
