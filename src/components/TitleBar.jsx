import { useState, useEffect, useCallback } from 'react'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { playButtonSound } from '../utils/soundUtils'
import './TitleBar.css'

function TitleBar() {
  const [isMaximized, setIsMaximized] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const getCurrentWindowInstance = getCurrentWindow()

    const checkMaximized = async () => {
      const maximized = await getCurrentWindowInstance.isMaximized()
      console.log('Window maximized state:', maximized)
      setIsMaximized(maximized)
    }

    checkMaximized()

    const unlistenResize = getCurrentWindowInstance.onResized(() => {
      console.log('Window resized')
      checkMaximized()
    })

    return () => {
      unlistenResize.then(f => f())
    }
  }, [])

  const handleMinimize = useCallback(async () => {
    const appWindow = getCurrentWindow()
    console.log('Minimize clicked')
    await appWindow.minimize()
  }, [])

  const handleMaximize = useCallback(async () => {
    const appWindow = getCurrentWindow()
    console.log('Maximize clicked, isMaximized:', isMaximized)
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
    console.log('Close clicked')
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
              设置
            </div>
            <div className="menu-item" onClick={() => {
              playButtonSound()
              window.dispatchEvent(new CustomEvent('open-about'))
              setMenuOpen(false)
            }}>
              关于
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
          title="最小化"
        >
          <span className="button-icon">─</span>
        </button>
        <button 
          className={`titlebar-button maximize-button ${isMaximized ? 'maximized' : ''}`} 
          onClick={handleMaximize}
          title={isMaximized ? "还原" : "最大化"}
        >
          <span className="button-icon">{isMaximized ? '❐' : '□'}</span>
        </button>
        <button 
          className="titlebar-button close-button" 
          onClick={handleClose}
          title="关闭"
        >
          <span className="button-icon">✕</span>
        </button>
      </div>
    </div>
  )
}

export default TitleBar
