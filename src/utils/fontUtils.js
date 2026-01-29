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
  xingshu: {
    name: '行书',
    family: 'Xingkai SC, STXingkai, KaiTi, serif',
    description: '中文行书字体，流畅自然',
    category: 'chinese_cursive',
    preview: '汉'
  },
  kaiti: {
    name: '楷体',
    family: 'KaiTi, STKaiti, serif',
    description: '中文楷书字体，传统书法',
    category: 'chinese_serif',
    preview: '汉'
  },
  lishu: {
    name: '隶书',
    family: 'LiSu, SimLi, serif',
    description: '中文隶书字体，古朴典雅',
    category: 'chinese_serif',
    preview: '汉'
  },
  caoshu: {
    name: '草书',
    family: 'Huawen Caoshu, STCaiyun, serif',
    description: '中文草书字体，飘逸洒脱',
    category: 'chinese_cursive',
    preview: '汉'
  },
  shoujin: {
    name: '瘦金体',
    family: 'STSong, serif',
    description: '中文瘦金体字体，纤细秀丽',
    category: 'chinese_cursive',
    preview: '汉'
  },
  songti: {
    name: '宋体',
    family: 'SimSun, serif',
    description: '中文宋体字体，正式规范',
    category: 'chinese_serif',
    preview: '汉'
  },
  fangsong: {
    name: '仿宋',
    family: 'FangSong, STFangsong, serif',
    description: '中文仿宋字体，清秀雅致',
    category: 'chinese_serif',
    preview: '汉'
  },
  heiti: {
    name: '黑体',
    family: 'SimHei, sans-serif',
    description: '中文黑体字体，现代简洁',
    category: 'chinese_sans',
    preview: '汉'
  },
  yahei: {
    name: '微软雅黑',
    family: 'Microsoft YaHei, sans-serif',
    description: '中文微软雅黑字体，清晰易读',
    category: 'chinese_sans',
    preview: '汉'
  },
  yuan: {
    name: '圆体',
    family: 'YouYuan, sans-serif',
    description: '中文圆体字体，圆润可爱',
    category: 'chinese_sans',
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
