# Ecommie

A modern, full-stack e-commerce platform built with Next.js, featuring a comprehensive seller dashboard, product management, and seamless shopping experience.

## Project Overview

Ecommie is a feature-rich e-commerce application that enables users to browse and purchase products while providing sellers with powerful tools to manage their inventory and orders. The platform includes user authentication, shopping cart functionality, order management, and an analytics dashboard for sellers.

## Features

### Customer Features
- **User Authentication** - Secure sign-up and login powered by Clerk
- **Product Browsing** - Browse all products with filtering and search capabilities
- **Shopping Cart** - Add, remove, and update product quantities in cart
- **Order Management** - Place orders and track order status
- **Address Management** - Save and manage multiple delivery addresses
- **Order History** - View past orders and their current status

### Seller Features
- **Seller Onboarding** - Register as a seller and set up your store
- **Product Management** - Add, edit, and delete products with multiple images
- **Product Listing** - View all your listed products
- **Order Dashboard** - Manage incoming orders and update order status
- **Analytics Dashboard** - Visualize sales data and performance metrics with charts
- **Image Upload** - Upload product images to Cloudinary

### Technical Features
- **Responsive Design** - Fully responsive UI with Tailwind CSS
- **Form Validation** - Client-side validation using Zod schemas
- **Background Jobs** - Automated tasks with Inngest
- **Real-time Updates** - Optimistic updates with React Query
- **Toast Notifications** - User feedback with React Hot Toast

## Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **TanStack Query (React Query)** - Server state management
- **Recharts** - Data visualization for analytics
- **React Hot Toast** - Toast notifications

### Backend
- **Next.js API Routes** - RESTful API endpoints
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Clerk** - Authentication and user management
- **Inngest** - Background job processing
- **Cloudinary** - Image storage and optimization

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Turbopack** - Fast development bundler

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB database
- Clerk account
- Cloudinary account
- Inngest account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Ecommie
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory with the following variables:
   ```env
   # Public Environment Variables
   NEXT_PUBLIC_CURRENCY=$

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   # MongoDB
   MONGODB_URI=your_mongodb_connection_string

   # Inngest
   INNGEST_SIGNING_KEY=your_inngest_signing_key
   INNGEST_EVENT_KEY=your_inngest_event_key

   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Configure Clerk**
   - Sign up at [clerk.com](https://clerk.com)
   - Create a new application
   - Copy your publishable and secret keys to the `.env` file

5. **Configure MongoDB**
   - Set up a MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
   - Copy your connection string to the `.env` file

6. **Configure Cloudinary**
   - Sign up at [cloudinary.com](https://cloudinary.com)
   - Get your cloud name, API key, and API secret from the dashboard
   - Add them to the `.env` file

7. **Configure Inngest**
   - Sign up at [inngest.com](https://www.inngest.com)
   - Create a new project
   - Copy your signing key and event key to the `.env` file

### Running the Application

#### Development Mode
```bash
npm run dev
```
The application will start at `http://localhost:3000`

#### Production Build
```bash
npm run build
npm start
```

#### Linting
```bash
npm run lint
```

## Project Structure

```
Ecommie/
├── app/                      # Next.js App Router pages
│   ├── api/                  # API routes
│   │   ├── cart/            # Cart management endpoints
│   │   ├── inngest/         # Inngest webhook handlers
│   │   ├── order/           # Order management endpoints
│   │   ├── product/         # Product CRUD endpoints
│   │   ├── seller/          # Seller-specific endpoints
│   │   ├── user/            # User management endpoints
│   │   └── webhooks/        # External webhooks
│   ├── add-address/         # Address management page
│   ├── all-products/        # Product listing page
│   ├── cart/                # Shopping cart page
│   ├── my-orders/           # Order history page
│   ├── order-placed/        # Order confirmation page
│   ├── product/             # Product detail pages
│   ├── seller/              # Seller dashboard
│   │   ├── add-product/    # Add new product
│   │   ├── edit-product/   # Edit existing product
│   │   ├── orders/         # Seller order management
│   │   ├── product-list/   # Seller's products
│   │   └── onboard-seller/ # Seller registration
│   └── layout.js            # Root layout
├── components/              # React components
│   └── seller/             # Seller-specific components
├── config/                  # Configuration files
├── context/                 # React context providers
├── lib/                     # Utility functions
│   ├── constants/          # App constants
│   ├── react-query/        # React Query configuration
│   └── validation/         # Zod validation schemas
├── models/                  # Mongoose models
│   ├── Address.js          # Address schema
│   ├── AuditLog.js         # Audit log schema
│   ├── Order.js            # Order schema
│   ├── Product.js          # Product schema
│   └── User.js             # User schema
├── public/                  # Static assets
└── assets/                  # Images and media files
```

## API Endpoints

### User Endpoints
- `GET /api/user` - Get user profile
- `POST /api/user` - Create/update user

### Product Endpoints
- `GET /api/product` - Get all products
- `GET /api/product/:id` - Get product by ID
- `POST /api/product` - Create new product (seller only)
- `PUT /api/product/:id` - Update product (seller only)
- `DELETE /api/product/:id` - Delete product (seller only)

### Cart Endpoints
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart` - Update cart item
- `DELETE /api/cart` - Remove item from cart

### Order Endpoints
- `GET /api/order` - Get user's orders
- `POST /api/order` - Create new order
- `PUT /api/order/:id` - Update order status (seller only)

### Seller Endpoints
- `POST /api/seller/onboard` - Register as seller
- `GET /api/seller/products` - Get seller's products
- `GET /api/seller/orders` - Get seller's orders