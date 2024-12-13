import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer and toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the default styles for react-toastify

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null); // State to hold the selected size

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

  // Handle size selection
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  // Handle add to cart
  const addToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size before adding to cart!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return; // If no size is selected, don't add to the cart
    }

    // Prepare product with selected size
    const productToAdd = {
      ...product,
      size: selectedSize, // Add the selected size
      quantity: 1 // Default quantity of 1
    };

    // Get the current cart from localStorage or initialize an empty array
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Add the product to the cart
    cart.push(productToAdd);

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Show a success toast notification
    toast.success(`${product.name} size ${selectedSize} added to cart!`, {
      position: "top-right",
      autoClose: 3000,  // Auto-close after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });

    console.log("Updated cart = ", localStorage.getItem('cart'));
  };

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
              <button
                key={size}
                className={`size-button ${selectedSize === size ? 'selected' : ''}`} 
                onClick={() => handleSizeSelect(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button className="add-to-cart" onClick={addToCart}>
          Add to Cart
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ProductDetail;
