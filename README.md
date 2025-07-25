# Muna Ecommerce

Muna Ecommerce is a full-stack web application for an online marketplace, built with React (frontend) and Node.js/Express/MongoDB (backend). It supports customer shopping, admin management, product uploads, order tracking, and more.

## Features
- Customer registration, login, and profile management
- Product catalog with categories and search
- Shopping cart and checkout
- Order placement and order history
- Customers can view order status and details
- Admin dashboard with analytics
- Admin product management (add, edit, delete, upload images)
- Admin order management
- Image upload and serving
- Responsive design

## Tech Stack
- **Frontend:** React, Redux Toolkit, React Router, Vite
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Authentication:** JWT
- **File Uploads:** Multer

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm
- MongoDB database (local or Atlas)

### 1. Clone the repository
```sh
git clone https://github.com/yourusername/muna-ecommerce.git
cd muna-ecommerce
```

### 2. Setup the Backend
```sh
cd server
npm install
```
- Create a `.env` file in the `server` directory with:
  ```env
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  PORT=5000
  ```
- Start the backend:
  ```sh
  node index.js
  # or for development with auto-reload:
  npx nodemon index.js
  ```

### 3. Setup the Frontend
```sh
cd ../client
npm install
npm run dev
```
- The frontend will run at [http://localhost:5173](http://localhost:5173)
- The backend runs at [http://localhost:5000](http://localhost:5000)

### 4. Seeding Products (Optional)
To add sample products for testing:
```sh
cd server
node seedProducts.js
```

## Usage
- Register as a customer and shop products.
- Log in as an admin to manage products and orders.
- Customers can view their order status and details.
- Admins can add/edit/delete products and view analytics.

## Folder Structure
```
muna-ecommerce/
  client/    # React frontend
  server/    # Node.js/Express backend
```

## License
MIT

---
**Muna Ecommerce** - Kitui Town, Kenya 