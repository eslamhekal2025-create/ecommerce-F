import React from "react";
import "./productSecion.css";

export default function ProductSection({ title, products, loading, API }) {
  return (
    <section className="products-section">
      <h2>{title}</h2>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="products-grid">
          {products.map((p) => (
            <div key={p._id} className="product-card">
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
            </div>
          ))}
        </div>
      )}
    </section>
  );
}