export const fonts = {
  georgia: {
    name: 'Georgia',
    family: 'Georgia, serif',
    description: '经典衬线字体，优雅复古',
    category: 'serif',
    preview: 'Aa'
  },
  times: {
    name: 'Times New Roman',
    family: 'Times New Roman, serif',
    description: '传统衬线字体，正式庄重',
    category: 'serif',
    preview: 'Aa'
  },
  garamond: {
    name: 'Garamond',
    family: 'Garamond, serif',
    description: '优雅衬线字体，文艺气息',
    category: 'serif',
    preview: 'Aa'
  },
  palatino: {
    name: 'Palatino',
    family: 'Palatino, serif',
    description: '经典衬线字体，优雅大方',
    category: 'serif',
    preview: 'Aa'
  },
  arial: {
    name: 'Arial',
    family: 'Arial, sans-serif',
    description: '现代无衬线字体，简洁清晰',
    category: 'sans-serif',
    preview: 'Aa'
  },
  helvetica: {
    name: 'Helvetica',
    family: 'Helvetica, sans-serif',
    description: '经典无衬线字体，现代感强',
    category: 'sans-serif',
    preview: 'Aa'
  },
  verdana: {
    name: 'Verdana',
    family: 'Verdana, sans-serif',
    description: '清晰无衬线字体，易读性好',
    category: 'sans-serif',
    preview: 'Aa'
  },
  kaiti: {
    name: '楷体',
    family: 'KaiTi, STKaiti, serif',
    description: '中文楷书字体，传统书法',
    category: 'chinese',
    preview: '汉'
  },
  songti: {
    name: '宋体',
    family: 'SimSun, serif',
    description: '中文宋体字体，正式规范',
    category: 'chinese',
    preview: '汉'
  },
  courier: {
    name: 'Courier New',
    family: 'Courier New, monospace',
    description: '等宽字体，打字机风格',
    category: 'monospace',
    preview: 'Aa'
  },
  monaco: {
    name: 'Monaco',
    family: 'Monaco, monospace',
    description: '优雅等宽字体，编程风格',
    category: 'monospace',
    preview: 'Aa'
  },
  brush: {
    name: 'Brush Script',
    family: 'Brush Script MT, cursive',
    description: '手写风格字体，艺术感强',
    category: 'cursive',
    preview: 'Aa'
  }
}

export const getFonts = () => {
  return Object.keys(fonts).map(id => ({
    id,
    ...fonts[id]
  }))
}

export const getFontById = (id) => {
  return fonts[id] || fonts.georgia
}

export const getFontsByCategory = (category) => {
  return Object.entries(fonts)
    .filter(([_, font]) => font.category === category)
    .map(([id, font]) => ({ id, ...font }))
}

export const applyFont = (fontId) => {
  const font = fonts[fontId]
  if (!font) return

  document.documentElement.style.setProperty('--writing-font-family', font.family)
}
