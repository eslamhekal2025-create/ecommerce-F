import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyOrders.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const API = import.meta.env.VITE_API_URL;

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${API}/getMyOrders`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      if (data.success) {
setOrders(data.data);      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  if (!Array.isArray(orders) || orders.length === 0) {
    return (
      <div className="empty-orders">
        <h2>No orders yet 😢</h2>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h2>My Orders</h2>

      {orders.map((order) => (
        <div key={order._id} className="order-card">
          
          {/* Header */}
          <div className="order-header">
            <span>Order for: <span className="orderFor">{order.user.name.toUpperCase()}</span> </span>
            <span className={`status ${order.status}`}>
              {order.status}
            </span>
          </div>

          {/* Items */}
          <div className="order-items">
            {order.items.map((item) => (
              <div key={item._id} className="order-item">
                <img
                  src={`${API}/${item.product.images[0].replace(/\\/g, "/")}`}
                  alt={item.product.name}
                />

                <div className="item-info">
                  <p>{item.product.name}</p>
                  <span>
                    {item.quantity} × ${item.price}
                  </span>
                </div>

                <strong>
                  ${(item.quantity * item.price).toFixed(2)}
                </strong>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="order-footer">
            <span>Total: ${order.totalAmount.toFixed(2)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;