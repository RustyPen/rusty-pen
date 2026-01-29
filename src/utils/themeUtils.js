export const globalThemes = {
  light: {
    name: '浅色',
    icon: '☀️',
    colors: {
      '--rusty-red': '#8B4513',
      '--parchment-yellow': '#F5E6D3',
      '--ink-black': '#1a1a1a',
      '--copper-green': '#B87333',
      '--aged-paper': '#E8DCC8',
      '--sepia-brown': '#704214',
      '--gold-accent': '#D4AF37',
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
    colors: {
      '--rusty-red': '#CD853F',
      '--parchment-yellow': '#2D2D2D',
      '--ink-black': '#E8E8E8',
      '--copper-green': '#D4A574',
      '--aged-paper': '#1F1F1F',
      '--sepia-brown': '#B8956E',
      '--gold-accent': '#FFD700',
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
    colors: {
      '--rusty-red': '#D35400',
      '--parchment-yellow': '#FAD7A0',
      '--ink-black': '#2C3E50',
      '--copper-green': '#E67E22',
      '--aged-paper': '#F5CBA7',
      '--sepia-brown': '#A04000',
      '--gold-accent': '#F39C12',
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
    colors: {
      '--rusty-red': '#5D6D7E',
      '--parchment-yellow': '#EBF5FB',
      '--ink-black': '#2C3E50',
      '--copper-green': '#85929E',
      '--aged-paper': '#D4E6F1',
      '--sepia-brown': '#566573',
      '--gold-accent': '#AED6F1',
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
    colors: {
      '--rusty-red': '#4A4A4A',
      '--parchment-yellow': '#FAFAFA',
      '--ink-black': '#1A1A1A',
      '--copper-green': '#666666',
      '--aged-paper': '#F5F5F5',
      '--sepia-brown': '#333333',
      '--gold-accent': '#808080',
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
    colors: {
      '--rusty-red': '#8B4513',
      '--parchment-yellow': '#F5E6D3',
      '--ink-black': '#1a1a1a',
      '--copper-green': '#B87333',
      '--aged-paper': '#E8DCC8',
      '--sepia-brown': '#704214',
      '--gold-accent': '#D4AF37',
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

export const getGlobalThemes = () => {
  return Object.keys(globalThemes).map(id => ({
    id,
    name: globalThemes[id].name,
    icon: globalThemes[id].icon
  }))
}

export const applyGlobalTheme = (themeId) => {
  const theme = globalThemes[themeId]
  if (!theme) return

  Object.entries(theme.colors).forEach(([property, value]) => {
    document.documentElement.style.setProperty(property, value)
  })
}
