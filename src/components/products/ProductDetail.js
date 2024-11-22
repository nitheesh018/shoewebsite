// src/components/products/ProductDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product details (mock data for now)
    setProduct({
      id: id,
      name: "Sample Shoe",
      price: 99.99,
      description: "Comfortable and stylish shoe",
      image: "/images/shoe.jpg",
      sizes: ["7", "8", "9", "10", "11"]
    });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="price">${product.price}</p>
        <p className="description">{product.description}</p>
        <div className="size-selection">
          <h3>Select Size</h3>
          <div className="size-options">
            {product.sizes.map(size => (
              <button key={size} className="size-button">
                {size}
              </button>
            ))}
          </div>
        </div>
        <button className="add-to-cart">Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductDetail;