import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
   const [page, setPage] = useState(1);
   const [pages, setPages] = useState(1);
   const [Loading, setLoading] = useState(false);
   const [keyword, setKeyword] = useState("");

  const API = import.meta.env.VITE_API_URL;

  const getAllProducts = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/products?page=${page}&keyword=${keyword}`
      );

      setProducts(res.data?.data || []);
      setPages(res.data?.pages || 1);
    } catch (error) {
      console.log(error);
      setProducts([]);
      setPages(1);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
   getAllProducts();
  }, [page, keyword]);

  return (
    <ProductContext.Provider
      value={{
        getAllProducts,
        products,
        setPage,
        page,
        setPages,
        pages,
        keyword,
        setKeyword,
        setLoading,
        Loading
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
