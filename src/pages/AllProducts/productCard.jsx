import axios from "axios";
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useCart } from "../../context/CartContext.jsx";

const ProductCard = ({ p, onDelete }) => {
  const navigate = useNavigate();
  const { addToCart, removeFromCart } = useCart();

  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_API_URL;

  // 🧠 optimize images
  const images = useMemo(() => {
    return (
      p.images?.map(
        (img) => `${API}/${img.replace(/\\/g, "/")}`
      ) || []
    );
  }, [p.images, API]);

  // 🔥 SWEET ALERT DELETE
  const handleDelete = async (e) => {
    e.stopPropagation();

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f1c40f",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      setLoading(true);

      const { data } = await axios.delete(`${API}/productDel/${p._id}`);

      if (data.success) {
        removeFromCart(p._id);

        Swal.fire({
          title: "Deleted!",
          text: "Product has been deleted.",
          icon: "success",
          confirmButtonColor: "#f1c40f",
        });

        onDelete?.(p._id);
      }
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Delete failed",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(p._id);
    toast.success("Added to cart 🛒");
  };

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${p._id}`)}
    >
      {/* ❌ Delete Button */}
      {onDelete && (
        <button className="btn-del" onClick={handleDelete}>
          ×
        </button>
      )}

      {/* 🖼️ Image */}
      <div className="product-image">
        <img src={images[0]} alt={p.name} loading="lazy" />
        <span className="badge">New</span>
      </div>

      {/* 🧾 Info */}
      <div className="product-info">
        <h3>{p.name}</h3>

        <div className="price-row">
          <span className="price">${p.price}</span>
          <span className="old-price">${p.price + 20}</span>
        </div>

        <button
          className="add-btn"
          onClick={handleAddToCart}
          disabled={loading}
        >
          {loading ? "..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);