import './Sidebar.css'
import { useI18n } from '../contexts/I18nContext'
import { playButtonSound } from '../utils/soundUtils'
import { useState } from 'react'

const Sidebar = ({ articles, activeArticle, onArticleSelect, onNewArticle, onDeleteArticle, onUpdateArticle }) => {
  const { t } = useI18n()
  const [editingId, setEditingId] = useState(null)
  const [editingTitle, setEditingTitle] = useState('')

  const handleEdit = (article) => {
    playButtonSound()
    setEditingId(article.id)
    setEditingTitle(article.title || t('sidebar.untitled'))
  }

  const handleSave = (articleId) => {
    playButtonSound()
    onUpdateArticle(articleId, { title: editingTitle })
    setEditingId(null)
    setEditingTitle('')
  }

  const handleCancel = () => {
    playButtonSound()
    setEditingId(null)
    setEditingTitle('')
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
                onBlur={() => handleSave(article.id)}
                autoFocus
              />
            ) : (
              <div className="article-title">{article.title || t('sidebar.untitled')}</div>
            )}
            <div className="article-meta">
              <span className="article-date">{article.date}</span>
              {editingId === article.id ? (
                <>
                  <button
                    className="article-save"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSave(article.id)
                    }}
                  >
                    ✓
                  </button>
                  <button
                    className="article-cancel"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCancel()
                    }}
                  >
                    ✕
                  </button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
