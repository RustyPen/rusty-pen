import { Store } from '@tauri-apps/plugin-store'
import { appDataDir, join } from '@tauri-apps/api/path'
import { readTextFile, writeTextFile, exists, mkdir, remove, readFile, writeFile } from '@tauri-apps/plugin-fs'
import { invoke } from '@tauri-apps/api/core'

const SETTINGS_FILE = 'rusty-pen-settings.json'
const SETTINGS_KEY = 'settings'
const ARTICLES_DIR = 'rusty-pen-articles'
const CUSTOM_PAPER_DIR = 'rusty-pen-custom-papers'

const defaultSettings = {
  globalTheme: 'light',
  font: 'yahei',
  fontSize: 'medium',
  language: 'en',
  showSplashScreen: true,
  windowSize: 'medium',
  useA4Ratio: true,
  vintagePaperId: 1,
  customVintagePaper: null,
  useCustomPaper: false,
  paperOpacity: 0.3
}

const store = await Store.load(SETTINGS_FILE)
console.log('Store loaded:', store)

export async function loadSettings() {
  try {
    if(!await store.has(SETTINGS_KEY)) {
      console.log('No settings found, using default settings')
      
      const systemLang = await invoke('get_system_language')
      const settingsWithSystemLang = { ...defaultSettings, language: systemLang }
      
      await store.set(SETTINGS_KEY, settingsWithSystemLang)
      const val = await store.get(SETTINGS_KEY);  
      console.log('Default settings saved:', val);
      await store.save()
      return settingsWithSystemLang
    }

    const settings = await store.get(SETTINGS_KEY)
    console.log('Settings loaded:', settings)
    return { ...defaultSettings, ...settings }
  } catch (error) {
    console.error('Failed to load settings:', error)
    return defaultSettings
  }
}

export async function saveSettings(settings) {
  try {
    await store.set(SETTINGS_KEY, settings)
    await store.save()
    console.log('Settings saved successfully')
  } catch (error) {
    console.error('Failed to save settings:', error)
  }
}

async function getArticlesDir() {
  const appDataDirPath = await appDataDir();
  return await join(appDataDirPath, ARTICLES_DIR)
}

export async function loadArticles() {
  try {
    const articlesDir = await getArticlesDir()
    console.log('Articles directory:', articlesDir)
  
    const dirExists = await exists(articlesDir)
    if (!dirExists) {
      console.log('Articles directory does not exist')
      return []
    }
    
    const entries = await readTextFile(`${articlesDir}/index.json`)
    const articles = JSON.parse(entries)
    console.log('Articles loaded:', articles)
    return articles || []
  } catch (error) {
    console.error('Failed to load articles:', error)
    return []
  }
}

export async function saveArticles(articles) {
  try {
    const articlesDir = await getArticlesDir()
    const dirExists = await exists(articlesDir)
    
    if (!dirExists) {
      await mkdir(articlesDir, { recursive: true })
    }
    
    const articlesMetadata = articles.map(({ id, title, date }) => ({ id, title, date }))
    await writeTextFile(`${articlesDir}/index.json`, JSON.stringify(articlesMetadata))
    console.log('Articles index saved successfully')
  } catch (error) {
    console.error('Failed to save articles:', error)
  }
}

export async function loadArticleContent(articleId) {
  try {
    const articlesDir = await getArticlesDir()
    const content = await readTextFile(`${articlesDir}/${articleId}.txt`)
    console.log('Article content loaded:', articleId)
    return content
  } catch (error) {
    console.error('Failed to load article content:', error)
    return null
  }
}

export async function saveArticleContent(article) {
  try {
    const articlesDir = await getArticlesDir()
    const dirExists = await exists(articlesDir)
    
    if (!dirExists) {
      await mkdir(articlesDir, { recursive: true })
    }
    
    await writeTextFile(`${articlesDir}/${article.id}.txt`, article.content)
    console.log('Article content saved:', article.id)
  } catch (error) {
    console.error('Failed to save article content:', error)
  }
}

export async function deleteArticleFile(articleId) {
  try {
    const articlesDir = await getArticlesDir()
    await remove(`${articlesDir}/${articleId}.txt`)
    console.log('Article file deleted:', articleId)
  } catch (error) {
    console.error('Failed to delete article file:', error)
  }
}

export async function resizeWindow(width, height) {
  try {
    await invoke('resize_window', { width, height })
    console.log('Window resized successfully:', width, height)
  } catch (error) {
    console.error('Failed to resize window:', error)
  }
}

async function getCustomPaperDir() {
  const appDataDirPath = await appDataDir()
  return await join(appDataDirPath, CUSTOM_PAPER_DIR)
}

export async function saveCustomPaper(fileData, fileName) {
  try {
    const customPaperDir = await getCustomPaperDir()
    const dirExists = await exists(customPaperDir)
    
    if (!dirExists) {
      await mkdir(customPaperDir, { recursive: true })
    }
    
    const filePath = await join(customPaperDir, fileName)
    const binaryData = Uint8Array.from(atob(fileData), c => c.charCodeAt(0))
    await writeFile(filePath, binaryData)
    console.log('Custom paper saved:', filePath)
    return filePath
  } catch (error) {
    console.error('Failed to save custom paper:', error)
    throw error
  }
}

export async function deleteCustomPaper(filePath) {
  try {
    const fileExists = await exists(filePath)
    if (fileExists) {
      await remove(filePath)
      console.log('Custom paper deleted:', filePath)
    }
  } catch (error) {
    console.error('Failed to delete custom paper:', error)
  }
}

export async function loadCustomPaperAsDataUrl(filePath) {
  try {
    const fileExists = await exists(filePath)
    if (!fileExists) {
      return null
    }
    
    const fileData = await readFile(filePath)
    const uint8Array = new Uint8Array(fileData)
    let binary = ''
    for (let i = 0; i < uint8Array.length; i++) {
      binary += String.fromCharCode(uint8Array[i])
    }
    const base64Data = btoa(binary)
    const extension = filePath.split('.').pop()
    const mimeType = extension === 'png' ? 'image/png' : 'image/jpeg'
    return `data:${mimeType};base64,${base64Data}`
  } catch (error) {
    console.error('Failed to load custom paper as data URL:', error)
    return null
  }
}
