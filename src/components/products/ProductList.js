// src/components/products/ProductList.js
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import './ProductList.css'


function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
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