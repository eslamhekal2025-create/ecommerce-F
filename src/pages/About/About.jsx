import { Link } from "react-router-dom";
import "./About.css";
import {
  FaShippingFast,
  FaShieldAlt,
  FaUndo,
  FaHeadset,
} from "react-icons/fa";

export default function About() {
  return (
    <div className="about">

      {/* Hero */}
      <section className="hero">
        <h1>Welcome to TechStore</h1>
        <p>
          Discover premium electronics with unbeatable prices,
          fast delivery, and trusted service.
        </p>

        <button>Shop Now</button>
      </section>

      {/* About */}
      <section className="about-section">

        <div className="left">
          <img
            src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=900"
            alt=""
          />
        </div>

        <div className="right">
          <h2>Who We Are</h2>

          <p>
            We are an online marketplace offering laptops, phones,
            tablets, TVs, accessories, and much more.
          </p>

          <p>
            Our mission is to provide the best shopping experience
            through high-quality products and excellent customer support.
          </p>
        </div>

      </section>

      {/* Features */}
      <section className="features">

        <div className="card">
          <FaShippingFast />
          <h3>Fast Delivery</h3>
          <p>Quick shipping worldwide.</p>
        </div>

        <div className="card">
          <FaShieldAlt />
          <h3>Secure Payment</h3>
          <p>100% safe payment methods.</p>
        </div>

        <div className="card">
          <FaUndo />
          <h3>Easy Returns</h3>
          <p>Return products within 14 days.</p>
        </div>

        <div className="card">
          <FaHeadset />
          <h3>24/7 Support</h3>
          <p>Always here to help you.</p>
        </div>

      </section>

      {/* Stats */}
      <section className="stats">

        <div>
          <h2>15K+</h2>
          <span>Products</span>
        </div>

        <div>
          <h2>50K+</h2>
          <span>Customers</span>
        </div>

        <div>
          <h2>99%</h2>
          <span>Satisfaction</span>
        </div>

        <div>
          <h2>24/7</h2>
          <span>Support</span>
        </div>

      </section>

      {/* CTA */}

      <section className="cta">

        <h2>Ready to Start Shopping?</h2>

        <Link to={"/allProducts"}>
                    <button>
    Explore Products</button>

        </Link>

      </section>

    </div>
  );
}