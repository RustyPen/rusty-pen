import './Sidebar.css'
import { useI18n } from '../contexts/I18nContext'
import { playButtonSound } from '../utils/soundUtils'
import { useState } from 'react'

const Sidebar = ({ articles, activeArticle, onArticleSelect, onNewArticle, onDeleteArticle, onUpdateArticle }) => {
  const { t } = useI18n()
  const [editingId, setEditingId] = useState(null)
  const [editingTitle, setEditingTitle] = useState('')
  const [isClickingButton, setIsClickingButton] = useState(false)

  const handleEdit = (article) => {
    playButtonSound()
    setEditingId(article.id)
    setEditingTitle(article.title || t('sidebar.untitled'))
  }

  const handleSave = (articleId, e) => {
    if (e) {
      e.stopPropagation()
      e.preventDefault()
    }
    playButtonSound()
    onUpdateArticle(articleId, { title: editingTitle })
    setEditingId(null)
    setEditingTitle('')
  }

  const handleCancel = (e) => {
    if (e) {
      e.stopPropagation()
      e.preventDefault()
    }
    playButtonSound()
    setEditingId(null)
    setEditingTitle('')
  }

  const handleBlur = (articleId) => {
    if (isClickingButton) {
      return
    }
    handleSave(articleId)
  }

  const handleButtonMouseDown = () => {
    setIsClickingButton(true)
  }

  const handleButtonMouseUp = () => {
    setTimeout(() => setIsClickingButton(false), 0)
  }

  return (
    <div className="sidebar-panel">
      <button 
        className="new-article-btn" 
        onClick={() => {
          playButtonSound()
          onNewArticle()
        }}
      >
        <span className="btn-icon">➕</span>
        <span className="btn-text">{t('sidebar.new_article')}</span>
      </button>
      <div className="article-list">
        {articles.map(article => (
          <div
            key={article.id}
            className={`article-item ${activeArticle?.id === article.id ? 'active' : ''}`}
            onClick={() => editingId === article.id ? null : onArticleSelect(article)}
          >
            {editingId === article.id ? (
              <input
                type="text"
                className="article-title-input"
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                onBlur={() => handleBlur(article.id)}
                autoFocus
              />
            ) : (
              <div className="article-title">{article.title || t('sidebar.untitled')}</div>
            )}
            <div className="article-meta">
              <span className="article-date">{article.date}</span>
              {editingId === article.id ? (
                <div className="article-actions">
                  <button
                    className="article-save"
                    onMouseDown={handleButtonMouseDown}
                    onMouseUp={handleButtonMouseUp}
                    onClick={(e) => handleSave(article.id, e)}
                  >
                    ✓
                  </button>
                  <button
                    className="article-cancel"
                    onMouseDown={handleButtonMouseDown}
                    onMouseUp={handleButtonMouseUp}
                    onClick={handleCancel}
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="article-actions">
                  <button
                    className="article-edit"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEdit(article)
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    className="article-delete"
                    onClick={(e) => {
                      e.stopPropagation()
                      playButtonSound()
                      onDeleteArticle(article.id)
                    }}
                  >
                    🗑️
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
