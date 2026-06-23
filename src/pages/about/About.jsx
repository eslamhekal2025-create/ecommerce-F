import "./about.css";

export default function About() {
  return (
    <section className="about">
      <div className="about-header">
        <h1>About Our Store</h1>
        <p>
          We provide high-quality products with competitive prices and fast
          delivery to ensure the best shopping experience for our customers.
        </p>
      </div>

      <div className="about-cards">
        <div className="card">
          <h3>🚚 Fast Delivery</h3>
          <p>
            Quick and reliable shipping to get your orders delivered on time.
          </p>
        </div>

        <div className="card">
          <h3>⭐ Premium Quality</h3>
          <p>
            Carefully selected products that meet the highest quality standards.
          </p>
        </div>

        <div className="card">
          <h3>🔒 Secure Payments</h3>
          <p>
            Safe and secure payment methods to protect your transactions.
          </p>
        </div>

        <div className="card">
          <h3>💬 Customer Support</h3>
          <p>
            Dedicated support team ready to assist you whenever you need help.
          </p>
        </div>
      </div>

      <div className="about-story">
        <h2>Our Story</h2>
        <p>
          Founded with a passion for providing exceptional products and
          customer service, our mission is to make online shopping simple,
          affordable, and enjoyable for everyone.
        </p>
      </div>

      <div className="about-stats">
        <div className="stat">
          <h2>10K+</h2>
          <span>Happy Customers</span>
        </div>

        <div className="stat">
          <h2>500+</h2>
          <span>Products</span>
        </div>

        <div className="stat">
          <h2>99%</h2>
          <span>Positive Reviews</span>
        </div>
      </div>
    </section>
  );
}