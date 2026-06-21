import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./aggretionCat.css";
import { useNavigate } from "react-router-dom";

export default function AggretionCat() {

  const [perCat, setPerCat] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL;
const navigate=useNavigate()
  async function getPerCat() {
    try {
      const { data } = await axios.get(`${API}/oneCategory`);

      if (data.success) {
        setPerCat(data.data);
      }

    } catch (error) {
      toast.error("Error fetching categories");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPerCat();
  }, []);

  return (
    <div className="cat-container">

      <h2>🔥 Shop By Category</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
       <div className="cat-grid">
  {perCat.map((p) => (
    <div
      key={p._id}
      className="cat-card"
      onClick={() => navigate(`/getProductByCatS?category=${p.category}`)}
    >
      <div className="cat-image">
        <img
          src={
            p.images?.length
              ? `${API}/${p.images[0].replace(/\\/g, "/")}`
              : "https://via.placeholder.com/200"
          }
          alt={p.category}
        />
      </div>

      <h3>{p.category}</h3>
      <span>{p.count} Products</span>
    </div>
  ))}
</div>
      )}

    </div>
  );
}