export const themes = {
  light: {
    name: '浅色',
    icon: '☀️',
    defaultFont: 'yahei',
    recommendedFonts: ['yahei', 'heiti', 'songti', 'kaiti'],
    colors: {
      '--copper-green': '#B87333',
      '--dark-brown': '#3E2723',
      '--background-primary': '#F5E6D3',
      '--background-secondary': '#E8DCC8',
      '--text-primary': '#1a1a1a',
      '--text-secondary': '#704214',
      '--border-color': '#8B4513',
      '--accent-color': '#D4AF37',
      '--shadow-color': 'rgba(0, 0, 0, 0.1)'
    }
  },
  dark: {
    name: '深色',
    icon: '🌙',
    defaultFont: 'heiti',
    recommendedFonts: ['heiti', 'yahei', 'songti', 'fangsong'],
    colors: {
      '--copper-green': '#D4A574',
      '--dark-brown': '#4A4A4A',
      '--background-primary': '#1F1F1F',
      '--background-secondary': '#2D2D2D',
      '--text-primary': '#E8E8E8',
      '--text-secondary': '#B8956E',
      '--border-color': '#CD853F',
      '--accent-color': '#FFD700',
      '--shadow-color': 'rgba(0, 0, 0, 0.3)'
    }
  },
  autumn: {
    name: '秋季落叶',
    icon: '🍂',
    defaultFont: 'xingshu',
    recommendedFonts: ['xingshu', 'caoshu', 'shoujin', 'kaiti'],
    colors: {
      '--copper-green': '#E67E22',
      '--dark-brown': '#873600',
      '--background-primary': '#F5CBA7',
      '--background-secondary': '#FAD7A0',
      '--text-primary': '#2C3E50',
      '--text-secondary': '#A04000',
      '--border-color': '#D35400',
      '--accent-color': '#F39C12',
      '--shadow-color': 'rgba(211, 84, 0, 0.2)'
    }
  },
  winter: {
    name: '冬日雪夜',
    icon: '❄️',
    defaultFont: 'songti',
    recommendedFonts: ['songti', 'fangsong', 'kaiti', 'lishu'],
    colors: {
      '--copper-green': '#85929E',
      '--dark-brown': '#34495E',
      '--background-primary': '#D4E6F1',
      '--background-secondary': '#EBF5FB',
      '--text-primary': '#2C3E50',
      '--text-secondary': '#566573',
      '--border-color': '#5D6D7E',
      '--accent-color': '#AED6F1',
      '--shadow-color': 'rgba(93, 109, 126, 0.2)'
    }
  },
  ink: {
    name: '水墨风格',
    icon: '🖌️',
    defaultFont: 'caoshu',
    recommendedFonts: ['caoshu', 'xingshu', 'shoujin', 'kaiti'],
    colors: {
      '--copper-green': '#666666',
      '--dark-brown': '#2A2A2A',
      '--background-primary': '#FAFAFA',
      '--background-secondary': '#F5F5F5',
      '--text-primary': '#1A1A1A',
      '--text-secondary': '#333333',
      '--border-color': '#4A4A4A',
      '--accent-color': '#808080',
      '--shadow-color': 'rgba(0, 0, 0, 0.15)'
    }
  },
  vintage: {
    name: '年代感',
    icon: '📜',
    defaultFont: 'lishu',
    recommendedFonts: ['lishu', 'songti', 'fangsong', 'kaiti'],
    colors: {
      '--copper-green': '#B87333',
      '--dark-brown': '#3E2723',
      '--background-primary': '#E8DCC8',
      '--background-secondary': '#F5E6D3',
      '--text-primary': '#1a1a1a',
      '--text-secondary': '#704214',
      '--border-color': '#8B4513',
      '--accent-color': '#D4AF37',
      '--shadow-color': 'rgba(139, 69, 19, 0.15)'
    }
  }
}

export const getThemes = () => {
  return Object.keys(themes).map(id => ({
    id,
    name: themes[id].name,
    icon: themes[id].icon,
    defaultFont: themes[id].defaultFont,
    recommendedFonts: themes[id].recommendedFonts
  }))
}

export const getThemeById = (themeId) => {
  return themes[themeId]
}

export const applyTheme = (themeId) => {
  const theme = themes[themeId]
  if (!theme) return

  Object.entries(theme.colors).forEach(([property, value]) => {
    document.documentElement.style.setProperty(property, value)
  })
}
