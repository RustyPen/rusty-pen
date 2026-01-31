import { useState, useEffect } from 'react'
import './DeleteConfirmModal.css'
import { playButtonSound } from '../utils/soundUtils'
import { useI18n } from '../contexts/I18nContext'

function DeleteConfirmModal({ isOpen, onClose, onConfirm, articleTitle }) {
  const [isClosing, setIsClosing] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const { t } = useI18n()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleClose = () => {
    if (isClosing || isConfirming) return
    
    playButtonSound()
    setIsClosing(true)
    setTimeout(() => {
      onClose()
      setIsClosing(false)
    }, 300)
  }

  const handleConfirm = () => {
    if (isClosing || isConfirming) return
    
    playButtonSound()
    setIsConfirming(true)
    setIsClosing(true)
    setTimeout(() => {
      onConfirm()
      setIsClosing(false)
      setIsConfirming(false)
    }, 300)
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClose()
    } else if (e.key === 'Enter') {
      handleConfirm()
    }
  }

  if (!isOpen && !isClosing) return null

  return (
    <div 
      className={`delete-confirm-backdrop ${isClosing ? 'closing' : ''}`} 
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className={`delete-confirm-modal ${isClosing ? 'closing' : ''}`}>
        <div className="delete-confirm-icon">⚠️</div>
        <h2 className="delete-confirm-title">{t('delete_confirm.title')}</h2>
        <p className="delete-confirm-message">
          {t('delete_confirm.message')} "{articleTitle}"？
        </p>
        <p className="delete-confirm-warning">
          {t('delete_confirm.warning')}
        </p>
        <div className="delete-confirm-actions">
          <button 
            className="delete-confirm-btn delete-confirm-btn-cancel"
            onClick={handleClose}
            disabled={isClosing || isConfirming}
          >
            {t('delete_confirm.cancel')}
          </button>
          <button 
            className="delete-confirm-btn delete-confirm-btn-confirm"
            onClick={handleConfirm}
            disabled={isClosing || isConfirming}
          >
            {isConfirming ? t('delete_confirm.deleting') : t('delete_confirm.confirm')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmModal
