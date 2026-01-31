import { Store } from '@tauri-apps/plugin-store'

const SETTINGS_FILE = 'rusty-pen-settings.json'
const SETTINGS_KEY = 'settings'

const defaultSettings = {
  globalTheme: 'light',
  font: 'yahei',
  language: 'en'
}

const store = await Store.load(SETTINGS_FILE)
console.log('Store loaded:', store)

export async function loadSettings() {
  try {
    if(!await store.has(SETTINGS_KEY)) {
      console.log('No settings found, using default settings')
      await store.set(SETTINGS_KEY, defaultSettings)
      const val = await store.get(SETTINGS_KEY);  
      console.log('Default settings saved:', val);
      await store.save()
      return defaultSettings
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
