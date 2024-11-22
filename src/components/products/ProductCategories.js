// src/components/ProductCategories.js
import React, { useState, useEffect } from 'react';

function ProductCategories() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // Fetch categories from your API
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <div className="product-categories">
      <aside className="filters">
        <h2>Categories</h2>
        <ul>
          {categories.map(category => (
            <li 
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </aside>
      <main className="products-grid">
        {/* Products display grid */}
      </main>
    </div>
  );
}

export default ProductCategories;