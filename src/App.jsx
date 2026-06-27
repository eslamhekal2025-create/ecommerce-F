import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout/layout.jsx";

import Home from "./pages/home/Home.jsx";
import AdminPanel from "./pages/adminPanel/AdminPanel.jsx";
import Register from "./pages/Register/Register.jsx";
import Login from "./pages/Login/Login.jsx";
import Dashboard from "./pages/Dashboard/MainAdmin.jsx";
import AddItem from "./pages/AddItem/AddItem.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { UserProvider } from "./context/userContext.jsx";
import { ToastContainer } from "react-toastify";
import { ProductProvider } from "./context/productContext.jsx";
import { Provider } from 'react-redux';
import store from "./Redux/store.js";


import './i18n.js';
import { AdminRoute } from "./pages/AdminRoute/AdminRoute.jsx";

import ProductDet from "./pages/ProductDet/productDetails.jsx";
import CartPage from "./pages/Cart/Cart.jsx";
import ProductByCat from "./pages/productByCAT/ProductByCat.jsx";
import Checkout from "./pages/CheckOut/CheckOut.jsx";
import MyOrders from "./pages/MyOrders/MyOrders.jsx";
import AdminOrders from "./pages/AdminOrder/AdminOrder.jsx";
import AllProducts from "./pages/AllProducts/AllProducts.jsx";
import About from "./pages/About/About.jsx";



const routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/About", element: <About /> },
      { path: "/allProducts", element: <AllProducts /> },
      { path: "/product/:id", element: <ProductDet /> },
      { path: "/Cart", element: <CartPage /> },
      { path: "/getProductByCatS", element: <ProductByCat /> },
      { path: "/Checkout", element: <Checkout /> },
      { path: "/MyOrders", element: <MyOrders/> },
      

     {
  path: "adminPanel",
  element: <AdminRoute><AdminPanel /></AdminRoute>,
  children: [
    { index: true, element: <Dashboard /> },
    { path: "AddItem", element: <AddItem /> },
    { path: "allProducts", element: <AllProducts /> },
    { path: "AdminOrders", element: <AdminOrders /> },
    
  ],
},

      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
          { path: "/AddItem", element: <AddItem /> },

     
    ],
  },
]);

export default function App() {
  return (
    <Provider store={store}>
      <CartProvider>
        <UserProvider>
          <ProductProvider>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              toastClassName="custom-toast"
              bodyClassName="custom-toast-body"
            />
            <RouterProvider router={routers} />
          </ProductProvider>
        </UserProvider>
      </CartProvider>
    </Provider>
  );
}
