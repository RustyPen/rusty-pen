# Rusty Pen

> The pen is rusty. The mind isn't.

A vintage-inspired writing application that brings the ritual of traditional writing to the digital age.

## About

`Rusty Pen` is a name full of character, combining two powerful imagery:

- **Rusty**: Suggests retro, nostalgia, time-worn, slightly gritty - perhaps metaphorically "long unused" but still valuable
- **Pen**: Represents writing, creation, thoughts, manuscripts, diaries, signatures, art

This name naturally fits writing, note-taking, and creative tools, especially with a minimalist, artistic, vintage, or anti-distraction vibe.

## Product Vision

- **Type**: Cross-platform writing app (Web, Windows, macOS, iOS), with optional physical accessories (vintage notebooks, metal bookmarks, ink color cards)
- **Style**: Minimalist UI + vintage animations + immersive sound effects
- **Differentiation**: Transform writing into a ritual and collecting experience
- **Positioning**: Spark creativity using "old-school methods" - simulate typewriters, telegrams, stationery, etc.
- **Target Users**:
  - Artistic youth, writers, diary enthusiasts
  - Digital minimalists (Anti-distraction)
  - People who love the feel of handwriting but rely on digital tools

## Core Features

### ✍️ Writing Experience

| Feature | Description |
|----------|-------------|
| **Daily Pen Unlock** | Unlock a new pen each day: fountain pen, ballpoint pen, feather pen, brush pen, pencil, chalk, etc. Each pen has unique writing texture (font + friction sound effects) |
| **Mechanical Sound System** | Toggle immersive sound effects: typewriter enter sounds, feather pen scratching paper, etc. |
| **Multiple Themes** | Various paper themes (vintage stationery, 1940s letters, 1960s manuscripts, etc.), user-customizable |
| **Multiple Papers** | Regular paper, lined paper, parchment, vintage paper, etc. Users can customize paper styles: color, thickness, texture |
| **Custom Fonts** | Support user-uploaded custom fonts for all writing content, especially for Chinese users: running script, cursive, regular script, clerical script, artistic fonts, handwriting |
| **Seasonal Theme Skins** | Seasonal theme skins like autumn falling leaves stationery, winter snowy night ink, available for manual switching |

### 📜 Output & Sharing

| Feature | Description |
|----------|-------------|
| **Vintage Stationery Export** | Automatically apply themes and export as PDF or images |
| **Rusty Pen Club Achievement System** | Write continuously for 3/7/30 days to unlock vintage pens, badges, displayable on personal profile |

## Visual & Interaction Design

- **Color Palette**: Rusty red, parchment yellow, ink black, copper green
- **Typography**: Primarily serif fonts (Garamond, Caslon), supplemented by handwriting fonts
- **Animations**: Slow fade-ins, paper curling, ink spreading
- **Icons**: Aged metal texture with slight oxidation spots
- **Buttons**: Multiple styles to match themes - rounded rectangles, metallic sheen, click sounds
- **Input Area**: A pen follows input, simulating handwriting. Users can manually adjust pen position and angle for added realism and fun
- **Scrollbars**: Traditional style with vintage paper texture
- **Modals**: Simple, vintage-style popups
- **Startup Animation**: Book opening animation simulating the ritual of vintage writing
- **Main Interface**: Clean, vintage-style interface including pen selection, paper themes, writing area
- **Personal Profile**: Display writing records, unlocked pens, completed challenges

## Slogans

- The pen is rusty. The mind isn't.
- Where old ink meets new ideas.
- Your thoughts, unpolished and true.

## App Store Subtitles

- "A writing app for those who miss the weight of a real pen."
- "No likes. No edits. Just you and the page."

## File Storage Format

Article content is stored in custom `.rustypen` format.

## Tech Stack

- **Frontend**: React + Vite
- **Styling**: CSS with custom variables
- **Audio**: Web Audio API for sound effects
- **Icons**: SVG icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/rusty-pen.git

# Navigate to the project directory
cd rusty-pen

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Build for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

## Project Structure

```
rusty-pen/
├── public/
│   ├── icons/           # SVG icons
│   └── sounds/         # Audio files
│       ├── ambient/      # Background sounds
│       └── pens/        # Pen sound effects
├── src/
│   ├── components/      # React components
│   │   ├── App.jsx
│   │   ├── Header.jsx
│   │   ├── PenSelector.jsx
│   │   ├── WritingArea.jsx
│   │   ├── ThemeSelector.jsx
│   │   ├── BackgroundMusic.jsx
│   │   ├── SoundToggle.jsx
│   │   └── PenIcon.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Terms of Use

1. **Free Use**: Products built from source code can be used for free.
2. **Store Distribution**: Distribution of products to app stores (including Apple App Store, Microsoft Store, etc.) is not permitted.
3. **Trademark Usage**: Use of the "Rusty Pen" trademark is not permitted.

## License

This project is licensed under the MIT License.

## Contact

For questions or suggestions, please open an issue on GitHub.

---

**Rusty Pen** - Where old ink meets new ideas.
