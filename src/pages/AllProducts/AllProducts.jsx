import React, { useEffect, useState } from "react";
import axios from "axios";
import "./allProducts.css";
import ProductCard from "./productCard.jsx";
import { useProduct } from "../../context/productContext.jsx";

const AllProducts = () => {
  const {products,setProducts,keyword,setKeyword,setPage,page,loading,pages}=useProduct()


  const handleDelete = (id) => {
  setProducts((prev) => prev.filter((p) => p._id !== id));
};

  return (
    <div className="all-products-container">
      <h2>All Products</h2>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search products..."
        className="search-input"
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
          setPage(1);
        }}
      />

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <>
          {/* Products */}
          <div className="products-grid">
            {products?.length > 0 ? (
              products.map((p) => (
                <ProductCard key={p._id} p={p} onDelete={handleDelete}/>
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>

          {/* Pagination */}
          <div className="pagination">
            {[...Array(pages).keys()].map((x) => (
              <button
                key={x + 1}
                className={page === x + 1 ? "active" : ""}
                onClick={() => setPage(x + 1)}
              >
                {x + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AllProducts;