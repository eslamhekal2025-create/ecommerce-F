// CartPage.jsx - Simplified
import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart(); // 🔥 استخدم الـ Context function
  const [updating, setUpdating] = useState({});
const navigate=useNavigate()
  const handleQuantityChange = async (productId, newQuantity) => {
    setUpdating(prev => ({ ...prev, [productId]: true }));
    
    try {
      await updateQuantity(productId, newQuantity); // 🔥 Context function
    } catch (error) {
      // Error handled in context
    } finally {
      setUpdating(prev => ({ ...prev, [productId]: false }));
    }
  };

  const isEmpty = cart.items.length === 0;

  return (
    <div className="cart-container">
      {/* Header */}
      <div className="cart-header">
        <h1 className="cart-title">
          <span className="cart-icon">🛒</span>
          My Cart ({cart.totalItems})
        </h1>
      </div>

      {isEmpty ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛍️</div>
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.items.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="item-image">
                  <img
                    src={
                      item.product?.images?.[0]
                        ? `${import.meta.env.VITE_API_URL}/${item.product.images[0].replace(/\\/g, "/")}`
                        : "/placeholder.png"
                    }
                    alt={item.product?.name}
                  />
                </div>

                <div className="item-details">
                  <h3 className="item-name">{item.product?.name}</h3>
                  <p className="item-price">
                    ${item.product?.price?.toFixed(2)} × {item.quantity}
                  </p>
                  <p className="item-total">
                    Total: ${(item.quantity * item.product?.price).toFixed(2)}
                  </p>
                </div>

                <div className="quantity-controls">
                  <button
                    className={`qty-btn qty-minus ${updating[item.product._id] ? 'loading' : ''}`}
                    onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                    disabled={updating[item.product._id] || item.quantity <= 1}
                  >
                    {updating[item.product._id] ? '⏳' : '-'}
                  </button>
                  
                  <span className="qty-display">
                    {updating[item.product._id] ? '...' : item.quantity}
                  </span>
                  
                  <button
                    className={`qty-btn qty-plus ${updating[item.product._id] ? 'loading' : ''}`}
                    onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                    disabled={updating[item.product._id]}
                  >
                    {updating[item.product._id] ? '⏳' : '+'}
                  </button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.product._id)}
                  disabled={updating[item.product._id]}
                >
                  🗑️ Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Total Items:</span> <span>{cart.totalItems}</span>
            </div>
            <div className="summary-row total-row">
              <span>Total Amount:</span> 
              <span className="total-price">${cart.totalAmount.toFixed(2)}</span>
            </div>
            <button onClick={()=>navigate("/Checkout")} className="checkout-btn">Proceed to Checkout 💳</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;