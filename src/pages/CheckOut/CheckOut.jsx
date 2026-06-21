import React, { useState } from "react";
import axios from "axios";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Checkout.css";

const Checkout = () => {
  const { cart, clearCart } = useCart(); // 🔥 خد الكارت
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const [form, setForm] = useState({
    address: "",
    city: "",
    phone: "",
    paymentMethod: "cash",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.items.length === 0) {
      return toast.error("Cart is empty");
    }

    try {
      const { data } = await axios.post(
        `${API}/CheckOut`,
        form,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      if (data.success) {
        toast.success("Order placed ✅");
        clearCart();
        navigate("/");
      }

    } catch (error) {
      toast.error("Order failed ❌");
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="checkout-grid">
        
        {/* 🧾 LEFT: FORM */}
        <form onSubmit={handleSubmit} className="checkout-form">
          <h3>Shipping Info</h3>

          <input
            type="text"
            placeholder="Address"
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder="City"
            value={form.city}
            onChange={(e) =>
              setForm({ ...form, city: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
            required
          />

          <select
            value={form.paymentMethod}
            onChange={(e) =>
              setForm({ ...form, paymentMethod: e.target.value })
            }
          >
            <option value="cash">Cash</option>
            <option value="card">Card</option>
          </select>

          <button type="submit" className="place-order-btn">
            Place Order 💳
          </button>
        </form>

        {/* 🛒 RIGHT: ORDER SUMMARY */}
        <div className="order-summary">
          <h3>Order Summary</h3>

          {cart.items.map((item) => (
            <div key={item._id} className="summary-item">
              <img
                src={`${API}/${item.product.images[0].replace(/\\/g, "/")}`}
                alt={item.product.name}
              />
              <div>
                <p>{item.product.name}</p>
                <span>
                  {item.quantity} × ${item.product.price}
                </span>
              </div>
              <strong>
                ${(item.quantity * item.product.price).toFixed(2)}
              </strong>
            </div>
          ))}

          <div className="summary-total">
            <span>Total:</span>
            <span className="totalOrder">${cart.totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;