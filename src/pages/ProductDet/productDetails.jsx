import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./productDetails.css";
import { useCart } from "../../context/CartContext";

const ProductDet = () => {
  const { id } = useParams();
  const API = import.meta.env.VITE_API_URL;
const {addToCart}=useCart()
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API}/product/${id}`);
      setProduct(res.data?.data);

      // أول صورة تبقى default
      setSelectedImage(0);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) return <p className="loading">Loading...</p>;
  if (!product) return <p>Product not found</p>;

  const images =
    product.images?.map(
      (img) => `http://localhost:5000/${img.replace(/\\/g, "/")}`
    ) || [];

  return (
    <div className="product-det-container">
      <div className="product-det">

        {/* 🔥 Images */}
        <div className="images-section">

          {/* Main Image */}
          <img
            src={images[selectedImage] || "/placeholder.png"}
            alt="main"
            className="main-image"
          />

          {/* Thumbnails */}
          <div className="small-images">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="small"
                className={selectedImage === i ? "active-thumb" : ""}
                onClick={() => setSelectedImage(i)}
              />
            ))}
          </div>
        </div>

        {/* 📦 Info */}
        <div className="info-section">
          <h2>{product.name}</h2>

          <p className="price">${product.price}</p>

          <p className="desc">
            {product.description || "No description available"}
          </p>

          <button className="add-btn" onClick={()=>addToCart(id)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDet;