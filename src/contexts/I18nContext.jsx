import { createContext, useContext, useState, useEffect } from 'react'

const I18nContext = createContext()

const translations = {
  zh: () => import('../i18n/zh.json'),
  en: () => import('../i18n/en.json')
}

export const I18nProvider = ({ children, initialLanguage = 'en' }) => {
  const [language, setLanguage] = useState(initialLanguage)
  const [translationsData, setTranslationsData] = useState({})

  useEffect(() => {
    if (language) {
      loadTranslations(language)
      document.documentElement.lang = language
    }
  }, [language])

  const loadTranslations = async (lang) => {
    try {
      const translationsModule = await translations[lang]()
      setTranslationsData(translationsModule.default)
    } catch (error) {
      console.error(`Failed to load translations for ${lang}:`, error)
    }
  }

  const t = (key) => {
    const keys = key.split('.')
    let value = translationsData
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        return key
      }
    }
    
    return value || key
  }

  const changeLanguage = async (lang) => {
    setLanguage(lang)
    document.documentElement.lang = lang
    await loadTranslations(lang)
  }

  const value = {
    language,
    changeLanguage,
    t
  }

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  )
}

export const useI18n = () => {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return context
}
