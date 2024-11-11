# Angular eCommerce Website

This project is an eCommerce website built with Angular 18, featuring a full product catalog, shopping cart, checkout functionality, and an admin panel for managing products. It utilizes the Fake Store API for product data.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
  - [User Guide](#user-guide)
  - [Admin Guide](#admin-guide)
- [API](#api)
- [Project Structure](#project-structure)
- [License](#license)

---

## Features

- **User Pages**: Home, Catalog, About, Cart, and Checkout pages.
- **Product Catalog**: Allows users to view and search for products.
- **Shopping Cart**: Users can add products to the cart, view them, and proceed to checkout.
- **Admin Panel**: Accessible at `http://localhost:4200/admin` for managing products and users.
- **Authentication**: Default credentials for admin login, with functionality to add new admins.
- **CRUD Operations**: Admins can add, edit, and delete products.

## Technologies Used

- **Angular 18**: Frontend framework for building SPAs.
- **Angular Material**: UI components library for responsive design.
- **Fake Store API**: Provides mock product data for the catalog.
- **SCSS**: Styling using variables, mixins, and modular components.

---

## Setup and Installation

### Prerequisites

- **Node.js** (v14 or higher)
- **Angular CLI** (v15 or higher)

### Installation Steps

1. **Clone the Repository**

   Clone the project repository from GitHub to your local machine.

   ```bash
   git clone https://github.com/AGh123/ecommerce-catalog.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd your-repo-name
   ```

3. **Install Dependencies**

   Install all necessary packages using npm.

   ```bash
   npm install
   ```

4. **Run the Development Server**

   Start the Angular development server.

   ```bash
   npm start
   ```

5. **Open the Application**

   Open your browser and navigate to `http://localhost:4200` to view the application.

---

## Usage

### User Guide

1. **Browse Products**: Go to the catalog to explore available products.
2. **Add to Cart**: Click on any product to view details and add it to the cart.
3. **View Cart**: Access the cart to view and manage selected products.
4. **Checkout**: Complete the checkout process.

### Admin Guide

1. **Access Admin Panel**: Navigate to `http://localhost:4200/admin`.
2. **Login**: Use the following default credentials:
   - **Email**: `admin@gmail.com`
   - **Password**: `admin1`
3. **Manage Products**: Add, edit, or delete products in the catalog.
4. **Manage Admins**: Create new admins.

---

## API

This project uses the [Fake Store API](https://fakestoreapi.com/) to simulate a backend, providing product details such as title, price, images, and descriptions.

---
