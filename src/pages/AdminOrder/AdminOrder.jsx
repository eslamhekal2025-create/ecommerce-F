import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminOrders.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState({});
  const API = import.meta.env.VITE_API_URL;

  // 🔥 fetch orders
  const fetchOrders = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(`${API}/getAllOrders`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      if (data.success) {
        setOrders(data.data);
      }

    } catch (error) {
      console.error(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 update status
 const updateStatus = async (orderId, status) => {
  try {
    const res = await axios.put(
      `${API}/status/${orderId}`,
      { status },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    console.log(res.data); // 🔥 شوف بيرجع ايه

    fetchOrders();
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
};
  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔥 loading state
  if (loading) {
    return <div className="admin-orders">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return <div className="admin-orders">No orders found</div>;
  }
const statusFlow = {
  pending: 0,
  confirmed: 1,
  shipped: 2,
  delivered: 3,
};
  return (
    <div className="admin-orders">
      <h2>Admin Orders</h2>

      {orders.map((order) => (
        <div key={order._id} className="admin-order-card">

          {/* Header */}
          <div className="order-top">
            <span>User: {order.user?.name || "Unknown"}</span>
            <span className="total">${order.totalAmount}</span>
          </div>

          {/* Items */}
          <div className="order-items">
            {order.items.map((item) => (
              <div key={item._id} className="item-row">
                <span>{item.product?.name || "Deleted product"}</span>
                <span>
                  {item.quantity} × ${item.price}
                </span>
              </div>
            ))}
          </div>

          {/* Status */}
          <div className="order-bottom">
            <select
  value={order.status}
  onChange={(e) =>
    updateStatus(order._id, e.target.value)
  }
>
  {Object.keys(statusFlow).map((statusOption) => {
    if (statusFlow[statusOption] < statusFlow[order.status]) {
      return null; // ❌ امنع الرجوع
    }

    return (
      <option key={statusOption} value={statusOption}>
        {statusOption}
      </option>
    );
  })}
</select>
          </div>

        </div>
      ))}
    </div>
  );
};

export default AdminOrders;