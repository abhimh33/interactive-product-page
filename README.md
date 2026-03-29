# GTG Perfume - Interactive Product Page

A modern, responsive e-commerce product page for GTG Perfume featuring an interactive product gallery, subscription options, and comprehensive product information.

## 🚀 Live Demo

**[View Live Site](https://interactive-product-page.vercel.app/)**

## ✨ Features

- **Interactive Product Gallery**: Image carousel with thumbnail navigation
- **Subscription Options**: Multiple subscription plans with dynamic pricing
- **Fragrance Selection**: Choose from Original, Lily, and Rose scents
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Comparison Table**: Side-by-side brand comparison
- **Accordion FAQ**: Collapsible product information sections
- **Statistics Banner**: Key product metrics and customer satisfaction data

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript**: Vanilla JS for interactive components
- **Fonts**: Inter and Oxanium from Google Fonts
- **Testing**: Vitest with JSDOM for component testing

## 📁 Project Structure

```
├── assets/              # Images and SVG assets
├── css/
│   └── styles.css      # Main stylesheet
├── js/
│   └── main.js         # Interactive functionality
├── test/               # Test files
├── index.html          # Main HTML file
├── package.json        # Dependencies and scripts
└── vitest.config.js    # Test configuration
```

## 🎨 Design Features

### Color Palette
- Primary Green: `#032E15` - `#016630`
- Accent Green: `#00C950`
- Text: `#162456`, `#032E15`
- Backgrounds: Gradient overlays with transparency

### Typography
- **Inter**: Body text, headings, and UI elements
- **Oxanium**: Accent text and special sections

### Key Components
1. **Hero Section**: Full-width banner with product highlights
2. **Product Gallery**: Carousel with 4 thumbnail previews
3. **Subscription Cards**: "Most Popular" and "One Time" options
4. **Fragrance Selector**: Visual cards with radio button selection
5. **Comparison Table**: Feature comparison across brands
6. **Footer**: Newsletter signup and navigation links

## 🧪 Testing

The project includes comprehensive test coverage:

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

Test categories:
- Responsive behavior (768px, 900px, 1024px, 1200px, 1400px breakpoints)
- Interactive components (accordion, carousel, form inputs)
- Visual styling (buttons, cards, badges, ribbons)
- Layout grids (footer, stats, fragrance selection)

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies
```bash
npm install
```

3. Run tests
```bash
npm test
```

4. Open in browser
```bash
# Simply open index.html in your browser
# Or use a local server like Live Server in VS Code
```

## 📦 Dependencies

### Production
- No runtime dependencies (vanilla JavaScript)

### Development
- `vitest`: Testing framework
- `jsdom`: DOM implementation for testing
- `@vitest/ui`: Test UI interface

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Breakpoints

- **Desktop**: 1400px and above
- **Laptop**: 1024px - 1399px
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

## 🎯 Key Interactions

1. **Product Gallery**: Click thumbnails or use arrow buttons to navigate
2. **Subscription Selection**: Radio buttons for plan selection
3. **Fragrance Cards**: Click to select preferred scent
4. **Accordion**: Expand/collapse product information
5. **Form Inputs**: Focus states and validation

## 📄 License

This project is created for educational and portfolio purposes.

## 👤 Author

Created with attention to detail and modern web standards.

---

**Deployed on Vercel** | [View Live Site](https://interactive-product-page.vercel.app/)
