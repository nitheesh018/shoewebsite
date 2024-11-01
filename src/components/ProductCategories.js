import React from 'react';
import { Link } from 'react-router-dom';

function ProductCategories() {
  const categories = ['Running Shoes', 'Jogging Shoes', 'Casual Shoes', 'Sports Shoes'];

  return (
    <div>
      <h1>Product Categories</h1>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <Link to={`/category/${category.toLowerCase().replace(' ', '-')}`}>{category}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductCategories;