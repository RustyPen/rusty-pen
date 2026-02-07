import './PaperSelector.css'
import { playButtonSound } from '../utils/soundUtils'
import { useI18n } from '../contexts/I18nContext'

const papers = [
  { id: 'vintage', icon: '📜' },
  { id: 'parchment', icon: '📄' },
  { id: 'manuscript', icon: '📝' },
  { id: 'telegram', icon: '📨' }
]

function PaperSelector({ currentPaper, onPaperChange }) {
  const { t } = useI18n()

  const handlePaperChange = (paperId) => {
    playButtonSound()
    onPaperChange(paperId)
  }

  return (
    <div className="paper-selector">
      <div className="paper-buttons">
        {papers.map((paper) => (
          <button
            key={paper.id}
            className={`control-button ${currentPaper === paper.id ? 'active' : ''}`}
            onClick={() => handlePaperChange(paper.id)}
            title={t(`papers.${paper.id}`)}
          >
            <span className="control-icon">{paper.icon}</span>
            <span className="control-text">{t(`papers.${paper.id}`)}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default PaperSelector
