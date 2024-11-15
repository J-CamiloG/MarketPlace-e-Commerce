
# AgriMarket E-commerce Application Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Project Structure](#project-structure)
3. [Key Components](#key-components)
4. [Pages](#pages)
5. [Context and State Management](#context-and-state-management)
6. [Styling](#styling)
7. [API Integration](#api-integration)
8. [Future Improvements](#future-improvements)

## 1. Project Overview

AgriMarket is a modern e-commerce application built with Next.js, React, and TypeScript. It features a responsive design, product listing, shopping cart functionality, and a checkout process.

## 2. Project Structure

The project follows a typical Next.js structure:

```bash
/src
  /app
    /components
    /context
    /types
    layout.tsx
    page.tsx (Home)
    /store
      page.tsx
    /cart
      page.tsx
    /about
      page.tsx
    /deals
      page.tsx
  /public
```

## 3. Key Components

### Navbar

```typescript
// File: src/app/components/Navbar.tsx

type NavbarProps = {
  openCart?: () => void
}

export default function Navbar({ openCart }: NavbarProps) {
  // Component logic
}
```

The Navbar component is present on all pages and includes links to different sections of the site, as well as a cart icon that displays the current number of items in the cart.

### ProductCard

```typescript
// File: src/app/components/ProductCard.tsx

type ProductCardProps = {
  product: Product
  openCart: () => void
}

export default function ProductCard({ product, openCart }: ProductCardProps) {
  // Component logic
}
```

ProductCard displays individual product information and includes an "Add to Cart" button that changes to "View Cart" when the product is in the cart.

### CartModal

```typescript
// File: src/app/components/CartModal.tsx

type CartModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  // Component logic
}
```

CartModal displays the current items in the cart, allows for quantity adjustments, and shows the total price.

### Pagination

```typescript
// File: src/app/components/Pagination.tsx

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Component logic
}
```

Pagination component handles page navigation in the store.

## 4. Pages

### Home (/)

The landing page showcases featured products and promotional sections.

### Store (/store)

Displays a grid of products with filtering and sorting options. Uses the Pagination component for navigating through product pages.

### Cart (/cart)

Shows all items added to the cart, allows quantity adjustments, and displays the total price.

### About (/about)

Provides information about the company and includes a contact form.

### Deals (/deals)

Showcases special offers and discounted products.

## 5. Context and State Management

### CartContext

```typescript
// File: src/app/context/CartContext.tsx

type CartContextType = {
  cart: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  isInCart: (id: number) => boolean
  cartTotal: number
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Context logic
}

export function useCart() {
  // Hook logic
}
```

CartContext manages the global state of the shopping cart, providing functions to add, remove, and update items in the cart.

## 6. Styling

The project uses Tailwind CSS for styling, providing a responsive and customizable design system.

## 7. API Integration

The application fetches product data from the Fake Store API (https://fakestoreapi.com/). This is used to populate the store with sample products.

## 8. Future Improvements

- Implement user authentication and user-specific carts
- Add a wishlist feature
- Integrate a real payment gateway
- Implement product reviews and ratings
- Add more detailed product pages
- Improve accessibility features
- Implement server-side rendering for better SEO
