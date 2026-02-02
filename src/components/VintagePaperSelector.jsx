import './VintagePaperSelector.css'
import { vintagePapers } from './WritingArea'
import { playButtonSound } from '../utils/soundUtils'
import { open } from '@tauri-apps/plugin-dialog'
import { readFile } from '@tauri-apps/plugin-fs'
import { saveCustomPaper } from '../utils/settingsUtils'
import { useState } from 'react'
import { useI18n } from '../contexts/I18nContext'

function VintagePaperSelector({ currentPaperId, onPaperChange, customPaperPath, customPaperUrl, useCustomPaper, onCustomPaperChange }) {
  const [isUploading, setIsUploading] = useState(false)
  const { t } = useI18n()

  const handlePaperChange = (paperId) => {
    playButtonSound()
    onPaperChange(paperId)
  }

  const handleUpload = async () => {
    playButtonSound()
    
    if (customPaperPath) {
      onCustomPaperChange(customPaperPath)
      return
    }
    
    try {
      setIsUploading(true)

      const selected = await open({
        multiple: false,
        filters: [
          {
            name: 'Images',
            extensions: ['jpg', 'jpeg', 'png', 'webp']
          }
        ]
      })

      if (selected && !Array.isArray(selected)) {
        const fileData = await readFile(selected)
        const uint8Array = new Uint8Array(fileData)
        let binary = ''
        for (let i = 0; i < uint8Array.length; i++) {
          binary += String.fromCharCode(uint8Array[i])
        }
        const base64Data = btoa(binary)
        const fileName = `custom_${Date.now()}.jpg`
        
        const savedPath = await saveCustomPaper(base64Data, fileName)
        onCustomPaperChange(savedPath, base64Data)
      }
    } catch (error) {
      console.error('Failed to upload custom paper:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleClearCustom = () => {
    playButtonSound()
    onCustomPaperChange(null)
  }

  return (
    <div className="vintage-paper-selector">
      <div className="vintage-paper-buttons">
        {vintagePapers.map((paper) => (
          <button
            key={paper.id}
            className={`vintage-paper-button ${currentPaperId === paper.id && !useCustomPaper ? 'active' : ''}`}
            onClick={() => handlePaperChange(paper.id)}
            style={{ backgroundImage: paper.texture }}
          ></button>
        ))}
        <button
          className={`vintage-paper-button upload-button ${useCustomPaper ? 'active' : ''}`}
          onClick={handleUpload}
          disabled={isUploading}
          title={customPaperPath ? t('controls.use_custom_paper') : t('controls.upload_custom_paper')}
          style={customPaperUrl ? { backgroundImage: `url(${customPaperUrl})` } : {}}
        >
          {isUploading ? '...' : (customPaperPath ? '' : '+')}
        </button>
        {customPaperPath && (
          <button
            className="vintage-paper-button clear-button"
            onClick={handleClearCustom}
            title={t('controls.clear_custom_paper')}
          >
            ×
          </button>
        )}
      </div>
    </div>
  )
}

export default VintagePaperSelector
