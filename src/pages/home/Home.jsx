import React, { useEffect, useState } from "react";
import axios from "axios";
import "./home.css";
import { Link } from "react-router-dom";
import AggretionCat from "../aggretionCat/AggretionCat.jsx";
import ProductSection from "../productSection/ProductSection.jsx";

const Home = () => {
  const API = import.meta.env.VITE_API_URL;

  const [trending, setTrending] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [trendRes, newRes] = await Promise.all([
        axios.get(`${API}/products?trending=true`),
        axios.get(`${API}/products?newest=true`)
      ]);

      setTrending(trendRes.data.data);
      setNewProducts(newRes.data.data);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };


  
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <h1>🔥 Best Tech Products</h1>
        <p>Shop the latest laptops and gaming consoles</p>
        <Link to="/allProducts">
          <button>Shop Now</button>
        </Link>
      </section>



      {/* Categories */}
      <section className="categories">
<AggretionCat/>
       
      </section>

      {/* Trending */}
  <ProductSection
  title="🔥 Trending Products"
  products={trending}
  loading={loading}
  API={API}
/>

<ProductSection
  title="🆕 New Arrivals"
  products={newProducts}
  loading={loading}
  API={API}
/>
      {/* Why Us */}
      <section className="why">
        <h2>Why Choose Us</h2>

        <div className="why-grid">
          <div>🚚 Fast Delivery</div>
          <div>💳 Secure Payment</div>
          <div>⭐ Best Quality</div>
          <div>🔄 Easy Returns</div>
        </div>
      </section>

    </div>
  );
};

export default Home;