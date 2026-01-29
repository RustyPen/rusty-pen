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
      <label className="sound-label">{t('controls.sound')}</label>
      <button
        className={`sound-button ${enabled ? 'enabled' : ''}`}
        onClick={handleToggle}
        title={enabled ? t('buttons.disable') : t('buttons.enable')}
      >
        <span className="sound-icon">{enabled ? '🔊' : '🔇'}</span>
        <span className="sound-status">{enabled ? t('sounds.enabled') : t('sounds.disabled')}</span>
      </button>
    </div>
  )
}

export default SoundToggle
