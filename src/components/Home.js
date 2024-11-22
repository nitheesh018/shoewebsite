import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

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
              <button className="add-to-cart">Add to Cart</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;