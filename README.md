# Advanced Car Garage Website

A modern, multi-language automotive service website built with Vite, featuring smooth animations and professional design.

## Features

- **Multi-Language Support**: English, Hindi (हिंदी), and Marathi (मराठी)
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Modern Animations**: Smooth scroll effects, parallax backgrounds, and interactive elements
- **Professional UI**: Industrial-modern aesthetic with bold typography
- **Direct Contact**: WhatsApp and phone call integration
- **Fast Performance**: Built with Vite for optimal loading speed

## Services Offered

- Car Servicing
- Car Insurance
- Suspension Work
- Tow Van Service
- Engine & Injector Repair
- Battery Service (Exide)
- Electronics & Diagnostics
- PUC Certification
- Denting & Painting
- Scanning & Coding

## Tech Stack

- **Build Tool**: Vite 5.x
- **Languages**: HTML5, CSS3, JavaScript (ES6+)
- **Internationalization**: Custom i18n implementation
- **Fonts**: Bebas Neue, Barlow
- **Design**: Custom CSS with animations

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
advance-car-garage/
├── src/
│   ├── js/
│   │   ├── main.js          # Main application logic
│   │   └── i18n.js          # Internationalization handler
│   ├── styles/
│   │   └── main.css         # All styles
│   ├── locales/
│   │   └── translations.json # Language translations
│   └── index.html           # Main HTML (moved to root by Vite)
├── index.html               # Entry point
├── package.json
├── vite.config.js
└── README.md
```

## Language Switching

Click the language buttons in the top-right corner:
- **EN** - English
- **हिं** - Hindi
- **मर** - Marathi

Language preference is saved in localStorage.

## Contact Information

- **Phone**: +91 98347 56711
- **WhatsApp**: [Click to message](https://wa.me/919834756711)

## Customization

### Changing Colors

Edit CSS variables in `src/styles/main.css`:

```css
:root {
    --primary: #FF6B35;      /* Main orange color */
    --accent: #FFD23F;       /* Yellow accent */
    --bg: #0A0A0A;          /* Background */
    --text: #FFFFFF;        /* Text color */
}
```

### Adding More Languages

1. Add translations to `src/locales/translations.json`
2. Add language button in `index.html`
3. Update language switcher in `src/js/main.js`

### Modifying Services

Edit the services array in `src/locales/translations.json` under each language.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

MIT

## Contact

For website inquiries: +91 98347 56711