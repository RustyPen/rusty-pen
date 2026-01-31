import { useState } from 'react'
import './Sidebar.css'
import { useI18n } from '../contexts/I18nContext'
import { playButtonSound } from '../utils/soundUtils'

const Sidebar = ({ activeTab, onTabChange }) => {
  const { t } = useI18n()
  const [menuExpanded, setMenuExpanded] = useState(true)

  const tabs = [
    { id: 'articles', icon: '📝', label: t('sidebar.articles') },
    { id: 'settings', icon: '⚙️', label: t('sidebar.settings') },
    { id: 'about', icon: 'ℹ️', label: t('sidebar.about') }
  ]

  const handleTabClick = (tabId) => {
    playButtonSound()
    onTabChange(tabId)
  }

  return (
    <div className="sidebar">
      <div className={`sidebar-left ${menuExpanded ? 'expanded' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">🖋</span>
            {menuExpanded && <span className="logo-text">Rusty Pen</span>}
          </div>
        </div>
        
        <div className="sidebar-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`sidebar-tab ${activeTab === tab.id ? 'active' : ''} ${!menuExpanded ? 'collapsed' : ''}`}
              onClick={() => handleTabClick(tab.id)}
              title={tab.label}
            >
              <span className="tab-icon">{tab.icon}</span>
              {menuExpanded && <span className="tab-label">{tab.label}</span>}
            </button>
          ))}
        </div>

        <div className="sidebar-footer">
          <button 
            className="menu-toggle"
            onClick={() => {
              playButtonSound()
              setMenuExpanded(!menuExpanded)
            }}
            title={menuExpanded ? t('buttons.close') : t('buttons.enable')}
          >
            {menuExpanded ? '◀' : '▶'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
