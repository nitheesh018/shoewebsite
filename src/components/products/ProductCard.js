// src/components/products/ProductCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer and toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the default styles for react-toastify

function ProductCard({ product }) {
  const navigate = useNavigate();
  
  const addToCart = (e) => {
    e.stopPropagation();
    
    // Get the current cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Add the product to the cart with a default quantity of 1
    cart.push({ ...product, quantity: 1 });
    
    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Display a toast notification
    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 3000,  // Auto-close after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });

    console.log("updated cart = ", localStorage.getItem('cart'));
  };

  return (
    <div className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">${product.price}</p>
        <div className="product-details">
          <span className="category">{product.category}</span>
          <button onClick={addToCart} className="add-to-cart-btn">
            Add to Cart
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ProductCard;