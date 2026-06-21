import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./productByCat.css";
import { useCart } from "../../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";

export default function ProductByCat() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate()
const {addToCart}=useCart()

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const API = import.meta.env.VITE_API_URL;

  async function getProductByCAT() {
    try {
      const { data } = await axios.get(
        `${API}/products-by-category?category=${category}`
      );

      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (category) {
      getProductByCAT();
    }
  }, [category]);

  return (
    <div className="products-container">
      <h2 className="title-cat">🛒 {category}</h2>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="products-grid">
          {products.map((p) => (
            <div key={p._id} className="product-card"         onClick={() => navigate(`/product/${p._id}`)}
>
            
              <img
                src={
                  p.images && p.images.length > 0
                    ? `${API}/${p.images[0].replace(/\\/g, "/")}`
                    : "https://via.placeholder.com/200"
                }
                alt={p.name}
              />

              <h4>{p.name}</h4>
              <p>{p.price} EGP</p>

              <button 
  className="add-to-cart-btn"
  onClick={() => addToCart(p._id)}
>
  Add to Cart
</button> 
            </div>
          ))}
        </div>
      )}
    </div>
  );
}