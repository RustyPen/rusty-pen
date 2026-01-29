import './SoundToggle.css'
import { playButtonSound } from '../utils/soundUtils'
import { useI18n } from '../contexts/I18nContext'

function SoundToggle({ enabled, onToggle }) {
  const { t } = useI18n()

  const handleToggle = () => {
    playButtonSound()
    onToggle(!enabled)
  }

  return (
    <div className="sound-toggle">
      <span className="control-label">{t('controls.sound')}</span>
      <button
        className={`control-button ${enabled ? 'active' : ''}`}
        onClick={handleToggle}
        title={enabled ? t('buttons.disable') : t('buttons.enable')}
      >
        <span className="control-icon">{enabled ? '🔊' : '🔇'}</span>
        <span className="control-text">{enabled ? t('sounds.enabled') : t('sounds.disabled')}</span>
      </button>
    </div>
  )
}

export default SoundToggle
