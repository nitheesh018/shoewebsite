// src/components/Checkout.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    zipCode: '',
    country: ''
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          shippingInfo,
          paymentInfo,
          items: JSON.parse(localStorage.getItem('cart'))
        })
      });
      
      if (response.ok) {
        // Clear cart and redirect to order confirmation
        localStorage.removeItem('cart');
        navigate('/order-confirmation');
      }
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return (
    <div className="checkout-container">
      {/* Add checkout form fields */}
    </div>
  );
}