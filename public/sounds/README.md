# 音频文件目录

此目录用于存放 Rusty Pen 应用的所有音效文件。

## 目录结构

```
public/
└── sounds/
    ├── pens/              # 笔具音效
    │   ├── fountain.mp3   # 钢笔音效
    │   ├── brush.mp3      # 毛笔音效
    │   ├── feather.mp3    # 羽毛笔音效
    │   └── ballpoint.mp3  # 圆珠笔音效
    └── ambient/           # 环境音效
        ├── fireplace.mp3  # 壁炉声
        ├── rain.mp3       # 雨声
        ├── train.mp3      # 火车声
        ├── cafe.mp3       # 咖啡馆声
        ├── forest.mp3     # 森林声
        └── ocean.mp3      # 海浪声
```

## 音频文件要求

### 笔具音效 (pens/)
- **格式**: MP3 或 OGG
- **时长**: 0.05-0.15 秒（短促的打字声）
- **音质**: 清晰的单次打字音效
- **音量**: 适中，不要太大

### 环境音效 (ambient/)
- **格式**: MP3 或 OGG
- **时长**: 建议 30 秒以上，会循环播放
- **音质**: 高质量的环境录音
- **音量**: 背景音量，不要盖过打字音效

## 推荐音效来源

### 免费音效网站
- [Freesound](https://freesound.org/) - 大量免费音效
- [Zapsplat](https://www.zapsplat.com/) - 专业音效库
- [Pixabay Audio](https://pixabay.com/music/sound-effects/) - 免费音效

### 笔具音效关键词
- Fountain pen: "fountain pen writing", "fountain pen click"
- Brush: "brush on paper", "calligraphy brush"
- Feather: "quill pen", "feather pen writing"
- Ballpoint: "ballpoint pen", "pen click"

### 环境音效关键词
- Fireplace: "fireplace crackling", "fireplace ambience"
- Rain: "rain sound", "rain ambience"
- Train: "train ambience", "train ride"
- Cafe: "cafe ambience", "coffee shop background"
- Forest: "forest ambience", "birds and wind"
- Ocean: "ocean waves", "sea ambience"

## 音频文件命名规范

- 使用小写字母
- 使用下划线或连字符分隔单词
- 使用英文命名（避免中文文件名问题）
- 示例：`fountain_pen.mp3`, `rain_ambience.mp3`

## 音频优化建议

1. **文件大小**: 尽量压缩，单个文件不超过 5MB
2. **采样率**: 44.1kHz 或 48kHz
3. **比特率**: 
   - 笔具音效: 128-192 kbps
   - 环境音效: 192-320 kbps
4. **格式**: 优先使用 MP3（兼容性好），备选 OGG

## 临时占位文件

在找到合适的音效文件之前，可以使用在线音效生成工具创建临时文件：

- [Bfxr](https://www.bfxr.net/) - 游戏音效生成器
- [ChipTone](http://sfbgames.com/chiptone/) - 8位音效生成器

## 许可证注意事项

- 确保使用的音效文件有合适的许可证
- 优先使用 CC0（公共领域）或 CC BY（署名）许可证
- 商业使用时注意许可证限制
- 在文档中记录音效来源和许可证信息
