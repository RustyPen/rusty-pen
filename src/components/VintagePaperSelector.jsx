import './VintagePaperSelector.css'
import { vintagePapers } from './WritingArea'
import { playButtonSound } from '../utils/soundUtils'

function VintagePaperSelector({ currentPaperId, onPaperChange }) {
  const handlePaperChange = (paperId) => {
    playButtonSound()
    onPaperChange(paperId)
  }

  return (
    <div className="vintage-paper-selector">
      <div className="vintage-paper-buttons">
        {vintagePapers.map((paper) => (
          <button
            key={paper.id}
            className={`vintage-paper-button ${currentPaperId === paper.id ? 'active' : ''}`}
            onClick={() => handlePaperChange(paper.id)}
            style={{ backgroundImage: paper.texture }}
          ></button>
        ))}
      </div>
    </div>
  )
}

export default VintagePaperSelector
