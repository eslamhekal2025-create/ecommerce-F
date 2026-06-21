import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CartContext = createContext();
const API = import.meta.env.VITE_API_URL;

// 🧠 Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_CART":
      return {
        ...state,
        ...action.payload,
        loading: false,
      };

    case "CLEAR_CART":
      return {
        items: [],
        totalItems: 0,
        totalAmount: 0,
        loading: false,
      };

    default:
      return state;
  }
};

// 🔐 headers (🔥 FIXED)
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    token,
    "Content-Type": "application/json",
  };
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, {
    items: [],
    totalItems: 0,
    totalAmount: 0,
    loading: false,
  });

  // 🛒 load cart
  const loadCart = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      const { data } = await axios.get(`${API}/cart`, {
        headers: getAuthHeaders(),
      });

      dispatch({ type: "SET_CART", payload: data.data });

    } catch (error) {
      console.error(error);
    }
  };



  // 🔁 update quantity
const updateQuantity = async (productId, quantity) => {
  try {
    const { data } = await axios.put(
      `${API}/cart`,
      { productId, quantity },
      { headers: getAuthHeaders() }
    );

    if (data.success) {
      dispatch({ type: "SET_CART", payload: data.data });
    }

  } catch (error) {
    console.error(error);
    toast.error("Update failed");
  }
}; 
  useEffect(() => {
    loadCart();
  }, []);

  // ➕ add
  const addToCart = async (productId) => {
    try {
      const { data } = await axios.post(
        `${API}/cart`,
        { productId },
        { headers: getAuthHeaders() }
      );

      if (data.success) {
        toast.success("Added to cart");
        dispatch({ type: "SET_CART", payload: data.data });
      }

    } catch (error) {
      console.error(error);
    }
  };

  // ❌ remove
  const removeFromCart = async (productId) => {
    const { data } = await axios.delete(`${API}/cart/${productId}`, {
      headers: getAuthHeaders(),
    });

    dispatch({ type: "SET_CART", payload: data.data });
  };

  // 🗑 clear
  const clearCart = async () => {
    await axios.delete(`${API}/cart/clear`, {
      headers: getAuthHeaders(),
    });

    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart,updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);