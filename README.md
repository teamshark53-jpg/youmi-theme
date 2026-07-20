# YOUMI Shopify Theme

AI-powered personalised storybook theme for Shopify stores.

## Theme Structure

```
theme/
├── layout/
│   └── theme.liquid          # Main theme layout
├── templates/
│   ├── index.json            # Homepage
│   ├── page.pricing.json     # Pricing page
│   ├── page.how-it-works.json
│   ├── page.art-styles.json
│   ├── page.features.json
│   ├── page.faq.json
│   ├── page.get-started.json
│   ├── page.stories.json
│   ├── 404.json
│   └── search.json
├── sections/
│   ├── header.liquid
│   ├── footer.liquid
│   ├── hero.liquid
│   ├── logo-strip.liquid
│   ├── how-it-works.liquid
│   ├── art-styles.liquid
│   ├── features.liquid
│   ├── testimonials.liquid
│   ├── pricing.liquid
│   ├── faq.liquid
│   ├── cta.liquid
│   └── page-hero.liquid
├── config/
│   ├── settings_data.json
│   └── settings_schema.json
├── assets/
│   ├── styles.css
│   └── main.js
└── locales/
    └── en.default.json
```

## How to Upload to Shopify

### Method 1: Shopify Admin (Recommended)

1. **Create a ZIP file** of the entire `theme` folder
2. Go to **Shopify Admin → Themes**
3. Click **Add theme → Upload zip file**
4. Select your ZIP file and upload
5. Click **Customize** to configure the theme

### Method 2: Shopify CLI

1. Navigate to the theme folder:
   ```bash
   cd e:/cursor/youmi-storybook/theme
   ```

2. Push the theme to your store:
   ```bash
   shopify theme push --store=3zd2a1-rm.myshopify.com
   ```

3. For development with live reloading:
   ```bash
   shopify theme dev --store=3zd2a1-rm.myshopify.com
   ```

## Required Pages

Create these pages in Shopify Admin for navigation to work:

- `/pages/how-it-works` - How It Works
- `/pages/art-styles` - Art Styles
- `/pages/features` - Features
- `/pages/pricing` - Pricing
- `/pages/faq` - FAQ
- `/pages/get-started` - Get Started
- `/pages/stories` - Stories

## Customization

### Colors (in theme.liquid CSS variables)
- `--color-bordeaux`: #3A2E18 (Primary text)
- `--color-orange`: #C8881A (Accent)
- `--color-cream`: #F5F0E6 (Background)
- `--color-sand`: #E8DFD0 (Borders)
- `--color-rose`: #F4E0D6 (Alternate section)

### Fonts
- Headings: Fredoka
- Body: Nunito

## Features

- ✅ Responsive design
- ✅ Custom cursor effect
- ✅ Page loader animation
- ✅ Scroll reveal animations
- ✅ FAQ accordion
- ✅ Pricing cards with featured option
- ✅ Art styles grid with hover effects
- ✅ Testimonials section
- ✅ CTA sections
- ✅ Mobile navigation

## Notes

- The theme uses Shopify's section-based architecture
- All content can be edited through the Shopify theme editor
- For the PDF modal functionality, you'll need to add PDF.js library to assets
