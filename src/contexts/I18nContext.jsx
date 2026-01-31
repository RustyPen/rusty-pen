import { createContext, useContext, useState, useEffect } from 'react'
import { invoke } from '@tauri-apps/api/core'

const I18nContext = createContext()

const translations = {
  zh: () => import('../i18n/zh.json'),
  en: () => import('../i18n/en.json')
}

export const I18nProvider = ({ children }) => {
  const [language, setLanguage] = useState('en')
  const [translationsData, setTranslationsData] = useState({})

  useEffect(() => {
    const initLanguage = async () => {
      const systemLang = await invoke('get_system_language')
      setLanguage(systemLang)
      document.documentElement.lang = systemLang
      await loadTranslations(systemLang)
    }

    initLanguage()
  }, [])

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
