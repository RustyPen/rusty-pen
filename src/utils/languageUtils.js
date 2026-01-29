export const languages = {
  zh: {
    id: 'zh',
    name: '中文',
    icon: '🇨🇳',
    direction: 'ltr',
    fonts: ['xingshu', 'kaiti', 'lishu', 'caoshu', 'shoujin', 'songti', 'fangsong', 'heiti', 'yahei', 'yuan']
  },
  en: {
    id: 'en',
    name: 'English',
    icon: '🇺🇸',
    direction: 'ltr',
    fonts: ['georgia', 'times', 'garamond', 'palatino', 'arial', 'helvetica', 'verdana', 'courier', 'monaco', 'brush']
  }
}

export const getLanguages = () => {
  return Object.keys(languages).map(id => ({
    id,
    ...languages[id]
  }))
}

export const getLanguageById = (languageId) => {
  return languages[languageId] || languages.zh
}

export const applyLanguage = (languageId) => {
  const language = languages[languageId]
  if (!language) return

  document.documentElement.lang = languageId
  document.documentElement.dir = language.direction
}

export const getAvailableFontsForLanguage = (languageId) => {
  const language = languages[languageId]
  return language ? language.fonts : languages.zh.fonts
}
