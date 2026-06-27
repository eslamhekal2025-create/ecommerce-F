import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { useCart } from "../../context/CartContext.jsx";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState(null);

  const { cart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");

    // لو عندك بيانات مستخدم مخزنة
    localStorage.removeItem("user");

    setToken(null);
    setOpen(false);

    navigate("/login");
  };

  return (
    <header>
      <nav>
        <Link to="/" className="logo">
          E-Shop
        </Link>

        {/* Desktop Menu */}
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/allProducts">Products</Link>
          </li>

          <li>
            <Link to="/Cart" className="cart">
              <FiShoppingCart />
              <span>{cart.totalItems}</span>
              Cart
            </Link>
          </li>
 <li>
            <Link to="/adminPanel" className="cart">
             Admin-Panel
            </Link>
          </li>



          {token ? (
            <>
              <li>
                <Link to="/MyOrders">My Orders</Link>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="logout-btn"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>

        {/* Mobile Toggle */}
        <button
          className="mobile-btn"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <ul className="mobile-menu">
          <li>
            <Link to="/" onClick={() => setOpen(false)}>
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/allProducts"
              onClick={() => setOpen(false)}
            >
              Products
            </Link>
          </li>

          <li>
            <Link
              to="/Cart"
              onClick={() => setOpen(false)}
            >
              Cart ({cart.totalItems})
            </Link>
          </li>

          {token ? (
            <>
              <li>
                <Link
                  to="/MyOrders"
                  onClick={() => setOpen(false)}
                >
                  My Orders
                </Link>
              </li>

              <li>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      )}
    </header>
  );
}