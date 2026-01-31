import './ArticleList.css'
import { useI18n } from '../contexts/I18nContext'
import { playButtonSound } from '../utils/soundUtils'

const ArticleList = ({ articles, activeArticle, onArticleSelect, onNewArticle, onDeleteArticle }) => {
  const { t } = useI18n()

  return (
    <div className="article-list-panel">
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
            onClick={() => onArticleSelect(article)}
          >
            <div className="article-title">{article.title || t('sidebar.untitled')}</div>
            <div className="article-meta">
              <span className="article-date">{article.date}</span>
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
          </div>
        ))}
      </div>
    </div>
  )
}

export default ArticleList
