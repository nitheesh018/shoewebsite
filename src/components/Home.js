import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer and toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the default styles for react-toastify


function Home() {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate('/products');
  };

  const featuredProducts = [
    {
      id: 1,
      name: "Running Shoes",
      price: 99.99,
      image: "/images/sports1.png"
    },
    {
      id: 2,
      name: "Casual Sneakers",
      price: 79.99,
      image: "/images/casual1.jpg"
    }
  ];

 // Add product to cart function
 const addToCart = (e, product) => {
  e.stopPropagation();

  // Get the current cart from localStorage or initialize an empty array
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Add the selected product to the cart with a default quantity of 1
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

  console.log("Updated cart = ", localStorage.getItem('cart'));
};

  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to ShoeMart</h1>
          <p>Discover the latest trends in footwear</p>
          <button 
            className="shop-now-btn"
            onClick={handleShopNow}
          >
            Shop Now
          </button>
        </div>
      </div>

      <section className="featured-section">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {featuredProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="price">${product.price}</p>
              <button 
                className="add-to-cart" 
                onClick={(e) => addToCart(e, product)}  // Pass product to addToCart
              >Add to Cart</button>
            </div>
          ))}
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}

export default Home;