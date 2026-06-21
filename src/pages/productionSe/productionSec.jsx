import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../allProducts/productCard.jsx";
import "./productionSec.css"
const ProductSection = ({ title, endpoint }) => {
  const API = import.meta.env.VITE_API_URL;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      const res = await axios.get(`${API}${endpoint}`);
      setProducts(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [endpoint]);

  return (
    <div className="section">
      <h2>{title}</h2>

      <div className="products-grid">
        {loading
          ? "Loading..."
          : products.map((p) => <ProductCard key={p._id} p={p} />)}
      </div>
    </div>
  );
};

export default ProductSection;