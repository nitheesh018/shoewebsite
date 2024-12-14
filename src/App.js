import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/layout/Navigation';
import Home from './components/Home';
import ProductCategories from './components/products/ProductCategories';
import ProductList from './components/products/ProductList';
import ProductDetail from './components/products/ProductDetail';
import Cart from './components/cart/Cart';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Footer from './components/layout/Footer';
import './App.css';

function App() {

  const products = [
    {
      id: 1,
      name: "Running Shoes",
      price: 89.99,
      category: "Sports",
      image: "/images/sports1.png"
    },
    {
      id: 2,
      name: "Casual Sneakers",
      price: 59.99,
      category: "Casual",
      image: "/images/casual1.jpg"
    },
    {
      id: 3,
      name: "Basketball Shoes",
      price: 29.99,
      category: "Sports",
      image: "images/basketball.jpeg"
    },
    {
      id: 4,
      name: "Oxford Dress Shoes",
      price: 129.99,
      category: "Formal",
      image: "/images/ox.jpg"
    },
    {
      id: 5,
      name: "Patent Leather Shoes",
      price: 149.99,
      category: "Formal",
      image: "/images/pa.jpg"
    },
    {
      id: 6,
      name: "Kids Light-Up Sneakers",
      price: 39.99,
      category: "Kids",
      image: "/images/lit.jpg"
    },
    {
      id: 7,
      name: "Kids School Shoes",
      price: 44.99,
      category: "Kids",
      image: "/images/school.jpg"
    }
  ];

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navigation />
          <main className="main-content">
            <Routes>
            {/* it is called when application is logged in */}
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/categories" element={<ProductCategories />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;