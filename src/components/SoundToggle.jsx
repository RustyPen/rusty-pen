import './SoundToggle.css'
import { playButtonSound } from '../utils/soundUtils'

function SoundToggle({ enabled, onToggle }) {
  const handleToggle = () => {
    playButtonSound()
    onToggle(!enabled)
  }

  return (
    <div className="sound-toggle">
      <label className="sound-label">笔具音效</label>
      <button
        className={`sound-button ${enabled ? 'enabled' : ''}`}
        onClick={handleToggle}
        title={enabled ? '关闭音效' : '开启音效'}
      >
        <span className="sound-icon">{enabled ? '🔊' : '🔇'}</span>
        <span className="sound-status">{enabled ? '已开启' : '已关闭'}</span>
      </button>
    </div>
  )
}

export default SoundToggle
