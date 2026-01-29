import './Header.css'
import { useI18n } from '../contexts/I18nContext'

function Header() {
  const { t } = useI18n()

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <img src="/logo/1x1/1.png" alt={t('header.logo')} className="logo-image" />
          <h1 className="app-title">{t('app.title')}</h1>
        </div>
        <p className="app-slogan">{t('app.slogan')}</p>
      </div>
    </header>
  )
}

export default Header
