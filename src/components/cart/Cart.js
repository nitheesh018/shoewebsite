// src/components/Cart.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
    calculateTotal(savedCart);
  }, []);

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotal(sum.toFixed(2));
  };

  const updateQuantity = (productId, newQuantity) => {
    const updated = cartItems.map(item => 
      item.id === productId ? {...item, quantity: parseInt(newQuantity)} : item
    );
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    calculateTotal(updated);
  };

  const removeItem = (productId) => {
    const updated = cartItems.filter(item => item.id !== productId);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    calculateTotal(updated);
  };

  const handleCheckout = () => {
    setShowPayment(true);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    // Process payment logic here
    localStorage.removeItem('cart');
    setCartItems([]);
    setTotal(0);
    setShowPayment(false);
    alert('Payment successful! Thank you for your purchase.');
    navigate('/');
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="price">${item.price}</p>
                  <div className="quantity-controls">
                    <input 
                      type="number" 
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, e.target.value)}
                      min="1"
                    />
                    <button 
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: ${total}</h3>
            <button 
              className="checkout-button"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>

          {showPayment && (
            <div className="payment-modal">
              <div className="payment-content">
                <h2>Payment Details</h2>
                <form onSubmit={handlePayment}>
                  <div className="form-group">
                    <label>Card Holder Name</label>
                    <input
                      type="text"
                      required
                      value={paymentDetails.name}
                      onChange={(e) => setPaymentDetails({
                        ...paymentDetails,
                        name: e.target.value
                      })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Card Number</label>
                    <input
                      type="text"
                      required
                      maxLength="16"
                      value={paymentDetails.cardNumber}
                      onChange={(e) => setPaymentDetails({
                        ...paymentDetails,
                        cardNumber: e.target.value.replace(/\D/g, '')
                      })}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        required
                        maxLength="5"
                        value={paymentDetails.expiryDate}
                        onChange={(e) => setPaymentDetails({
                          ...paymentDetails,
                          expiryDate: e.target.value
                        })}
                      />
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input
                        type="text"
                        required
                        maxLength="3"
                        value={paymentDetails.cvv}
                        onChange={(e) => setPaymentDetails({
                          ...paymentDetails,
                          cvv: e.target.value.replace(/\D/g, '')
                        })}
                      />
                    </div>
                  </div>
                  <div className="payment-buttons">
                    <button type="submit" className="pay-button">
                      Pay ${total}
                    </button>
                    <button 
                      type="button" 
                      className="cancel-button"
                      onClick={() => setShowPayment(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Cart;