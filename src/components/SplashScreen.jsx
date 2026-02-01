import { useEffect } from 'react'
import './SplashScreen.css'
import { useI18n } from '../contexts/I18nContext'

function SplashScreen({ onComplete }) {
  const { t } = useI18n()

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 3500)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="splash-screen">
      <div id="page-flip">
        <div id="r1">
          <div id="p1">
            <div>
              <div></div>
            </div>
          </div>
        </div>
        <div id="p2">
          <div>{t('app.slogan')}</div>
        </div>
        <div id="r3">
          <div id="p3">
            <div>
              <div></div>
            </div>
          </div>
        </div>
        <div className="s">
          <div id="s3">
            <div id="sp3"></div>
          </div>
        </div>
        <div className="s" id="s4">
          <div id="s2">
            <div id="sp2"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SplashScreen
