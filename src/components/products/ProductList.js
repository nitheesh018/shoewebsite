// src/components/products/ProductList.js
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const products = [
    {
      id: 1,
      name: "Running Shoes",
      price: 89.99,
      category: "Sports",
      image: "/images/running-shoes.jpg"
    },
    {
      id: 2,
      name: "Casual Sneakers",
      price: 59.99,
      category: "Casual",
      image: "/images/casual-sneakers.jpg"
    },
    // Add more products
  ];

  const categories = ["All", "Sports", "Casual", "Formal", "Kids"];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category.toLowerCase() === selectedCategory);

  return (
    <div className="product-page">
      <aside className="categories">
        <h2>Categories</h2>
        <ul>
          {categories.map(category => (
            <li 
              key={category}
              className={selectedCategory === category.toLowerCase() ? 'active' : ''}
              onClick={() => setSelectedCategory(category.toLowerCase())}
            >
              {category}
            </li>
          ))}
        </ul>
      </aside>
      
      <main className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </main>
    </div>
  );
}

export default ProductList;