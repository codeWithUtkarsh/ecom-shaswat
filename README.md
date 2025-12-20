# Silkrute E-commerce Platform

A modern, full-featured e-commerce web application built with Next.js 15, TypeScript, and Tailwind CSS. Inspired by Silkrute.co.uk, this monolithic application provides a complete shopping experience for authentic Indian and ethnic products.

## Features

### 🎨 Modern UI/UX
- Responsive design that works on all devices
- Beautiful gradient color schemes (Orange/Amber theme)
- Smooth animations and transitions
- Image carousels and interactive components

### 🛍️ E-commerce Functionality
- **Product Catalog**: Browse products by category
- **Product Details**: Detailed product pages with images, descriptions, and pricing
- **Shopping Cart**: Add, remove, and update quantities
- **Real-time Cart Updates**: Dynamic cart count in header
- **Category Navigation**: Easy navigation across different product categories
- **Promotional Sections**: Featured deals and discount banners

### 🔐 User Authentication (UI Ready)
- Login page with email/password
- Sign up page with form validation
- Social login buttons (Google, Facebook)
- Password visibility toggle
- Remember me functionality

### 📦 Product Features
- Product ratings and reviews display
- Discount badges
- Stock status indicators
- Related products suggestions
- Product search functionality
- Price filtering and sorting

### 🛒 Shopping Cart
- Add to cart from product cards or detail pages
- Update quantities
- Remove items
- View subtotal, shipping, and tax calculations
- Free shipping threshold indicator
- Persistent cart state (using React Context)

### 🎯 Additional Features
- Hero banner carousel with auto-rotation
- Feature highlights (24/7 Support, Free Shipping, Secure Payment)
- Promotional category sections
- SEO-friendly meta tags
- Fast loading with Next.js App Router
- TypeScript for type safety

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context API
- **Image Handling**: Next.js Image Optimization

## Project Structure

```
ecom-shaswat/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── auth/              # Authentication pages
│   │   │   ├── login/         # Login page
│   │   │   └── signup/        # Signup page
│   │   ├── cart/              # Shopping cart page
│   │   ├── products/          # Product pages
│   │   │   ├── [category]/    # Category listing page
│   │   │   └── detail/[id]/   # Product detail page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── home/             # Home page components
│   │   │   ├── HeroBanner.tsx
│   │   │   ├── FeatureHighlights.tsx
│   │   │   └── PromotionalSection.tsx
│   │   ├── layout/           # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/               # UI components
│   │       └── ProductCard.tsx
│   ├── lib/                  # Utilities and data
│   │   ├── cart-context.tsx  # Shopping cart state management
│   │   └── data.ts           # Mock data
│   └── types/                # TypeScript types
│       └── index.ts
├── public/                   # Static files
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ecom-shaswat
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Features Breakdown

### Home Page
- Hero carousel with rotating banners
- Feature highlights section
- Promotional category cards
- Featured products grid
- Best sellers section

### Product Catalog
- Category-based filtering
- Sort options (price, rating, newest)
- Product grid layout
- Quick add to cart

### Product Detail Page
- Large product image
- Detailed description
- Price with discount display
- Stock availability
- Add to cart functionality
- Related products
- Ratings and reviews count

### Shopping Cart
- Full cart management
- Quantity controls
- Order summary with calculations
- Shipping threshold indicator
- Tax calculation (20% VAT)
- Secure checkout indicator

### Authentication
- Email/password login
- User registration
- Social login integration (UI)
- Form validation
- Password visibility toggle

## Customization

### Colors
Edit `tailwind.config.ts` to customize the color scheme:
```typescript
colors: {
  primary: {
    // Your custom colors
  }
}
```

### Products Data
Edit `src/lib/data.ts` to add or modify:
- Products
- Categories
- Banners
- Promotional sections

### Layout
Modify components in `src/components/layout/` to customize:
- Header design
- Navigation menu
- Footer content

## Future Enhancements

- Backend API integration
- User authentication (backend)
- Payment gateway integration
- Order management system
- Product search functionality
- Wishlist feature
- Product reviews and ratings
- Order tracking
- Admin dashboard
- Email notifications
- Multi-language support
- Currency conversion

## Performance Optimizations

- Next.js Image Optimization
- App Router for better performance
- Code splitting
- Lazy loading components
- Optimized bundle size

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For support, email support@silkrute.com or create an issue in the repository.
