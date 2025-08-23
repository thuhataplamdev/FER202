# FoodHub - React E-commerce Application

A modern, responsive React e-commerce application for food and recipe products with advanced features and state management.

## 🚀 Features

### Core Functionality
- **Product Catalog**: Browse and search through a collection of food products
- **Shopping Cart**: Add, remove, and manage cart items with quantity controls
- **Favourites**: Save and manage favourite products
- **User Authentication**: Login, registration, and profile management
- **Responsive Design**: Mobile-first design that works on all devices

### Advanced Features
- **Theme Management**: Dark/Light mode toggle with useContext
- **State Management**: 
  - useReducer for cart, favourites, and toast logic
  - useContext for theme, authentication, cart, and favourites
  - useMemo for optimized search, filter, and sort operations
- **Toast Notifications**: Real-time feedback for user actions
- **Protected Routes**: Authentication-based route protection
- **Form Validation**: Comprehensive form validation with error handling

### UI Components
- **Carousel**: Auto-playing image carousel with navigation controls
- **Product Cards**: Interactive product display with action buttons
- **Navigation**: Responsive navbar with user menu and counters
- **Grid Layout**: Responsive product grid with filtering and sorting

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── NavBar.js       # Navigation component
│   ├── Carousel.js     # Image carousel component
│   ├── ProductCard.js  # Product display card
│   └── Toast.js        # Toast notification component
├── context/            # React Context providers
│   ├── ThemeContext.js     # Theme management
│   ├── AuthContext.js      # Authentication state
│   ├── CartContext.js      # Shopping cart state
│   ├── FavouritesContext.js # Favourites management
│   └── ToastContext.js     # Toast notifications
├── data/               # Static data and mock data
│   └── products.js     # Product catalog data
├── pages/              # Application pages
│   ├── Home.js         # Landing page with carousel
│   ├── Products.js     # Product listing with filters
│   ├── ProductDetail.js # Individual product view
│   ├── Cart.js         # Shopping cart management
│   ├── Favourites.js   # User favourites
│   ├── Login.js        # User authentication
│   ├── Register.js     # User registration
│   ├── Profile.js      # User profile management
│   └── Checkout.js     # Order checkout process
├── routes/             # Routing configuration
│   └── AppRoutes.js    # Main application routes
├── App.js              # Main application component
└── App.css             # Global styles and animations
```

## 🛠️ Technologies Used

- **React 19.1.1** - Modern React with hooks
- **React Router DOM 6.30.1** - Client-side routing
- **React Bootstrap 2.10.10** - UI component library
- **Bootstrap 5.3.7** - CSS framework
- **React Icons 5.5.0** - Icon library
- **Context API + useReducer** - State management
- **Custom Hooks** - Reusable logic

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation
1. Clone the repository:
```bash
git clone <repository-url>
cd foodhub
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Usage

### Demo Credentials
- **Email**: demo@example.com
- **Password**: demo123

### Key Features
1. **Browse Products**: Navigate to `/products` to see all available products
2. **Search & Filter**: Use the search bar and category filters to find specific products
3. **Add to Cart**: Click "Add to Cart" on any product to add it to your shopping cart
4. **Favourites**: Click the heart icon to add products to your favourites
5. **Theme Toggle**: Use the sun/moon icon in the navbar to switch between light and dark themes
6. **User Account**: Register a new account or login to access additional features

### Navigation
- **Home**: Landing page with featured content
- **Products**: Browse all products with search and filters
- **Cart**: Manage your shopping cart
- **Favourites**: View your saved products
- **Profile**: Manage your account information
- **Login/Register**: Authentication pages

## 🔧 Customization

### Adding New Products
Edit `src/data/products.js` to add new products to the catalog:

```javascript
{
  id: 9,
  name: "New Product Name",
  description: "Product description",
  price: "9.99",
  image: "/images/product-image.jpg",
  category: "category-name",
  rating: 4.5,
  reviews: 100
}
```

### Modifying Themes
Update `src/context/ThemeContext.js` to customize color schemes and theme options.

### Styling
Modify `src/App.css` to customize global styles, animations, and component appearances.

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🎨 Design Features

- **Modern UI**: Clean, intuitive interface design
- **Smooth Animations**: Hover effects and transitions
- **Accessibility**: Proper focus states and semantic HTML
- **Performance**: Optimized rendering with useMemo and useCallback
- **SEO Ready**: Proper meta tags and semantic structure

## 🔒 Security Features

- **Protected Routes**: Authentication-required pages
- **Form Validation**: Client-side input validation
- **Secure State**: Context-based state management
- **User Sessions**: Persistent authentication state

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify/Vercel
1. Connect your repository to the deployment platform
2. Set build command: `npm run build`
3. Set publish directory: `build`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository or contact the development team.

---

**Built with ❤️ using React and modern web technologies**
