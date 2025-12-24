import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-page">
      {/* ===================== HERO ===================== */}
      <section className="hero-section">
        <h1>Smarter Finance, Simplified.</h1>
        <p>
          AI Finance Manager is your personal finance copilot — helping you
          budget, save, and reach your goals with intelligent insights.
        </p>

        <div className="hero-btns">
          <Link to="/budget" className="cta-btn">
            Get Started Free
          </Link>
          <Link
            to="/planner"
            className="cta-btn"
            style={{ background: "#4CAF50" }}
          >
            Try the Smart Planner
          </Link>
        </div>
      </section>

      {/* ===================== FEATURES ===================== */}
      <section className="features">
        <div className="feature-card">
          <i className="fa-solid fa-bullseye"></i>
          <h3>AI Smart Planner</h3>
          <p>
            Automatically generate realistic financial goals and get AI-driven
            insights to stay on track.
          </p>
        </div>

        <div className="feature-card">
          <i className="fa-solid fa-file-invoice"></i>
          <h3>Document Scanner</h3>
          <p>
            Scan receipts and PDFs automatically. Extract totals from invoices
            or bank statements using AI OCR.
          </p>
        </div>

        <div className="feature-card">
          <i className="fa-solid fa-chart-pie"></i>
          <h3>Visual Budget Tracker</h3>
          <p>
            Track income and expenses visually with dynamic charts, and let AI
            identify spending patterns.
          </p>
        </div>
      </section>

      {/* ===================== PRICING ===================== */}
      <section className="pricing">
        <h2>Plans that Grow with You</h2>

        <div className="pricing-cards">
          <div className="plan">
            <h3>Free Plan</h3>
            <p>Get started at no cost</p>
            <ul>
              <li>✓ Expense & Income Tracking</li>
              <li>✓ Unlimited AI scans</li>
              <li>✓ Smart Planner Access</li>
              <li>✓ Rewards & Badges</li>
            </ul>
            <p className="price">$0/mo</p>
          </div>

          <div className="plan">
            <h3>Pro Plan</h3>
            <p>For dedicated savers</p>
            <ul>
              <li>✓ Everything in Free</li>
              <li>✓ Cloud Sync + Analytics</li>
              <li>✓ Advanced AI Insights</li>
              <li>✓ Export Reports</li>
            </ul>
            <p className="price">$7.99/mo</p>
          </div>

          <div className="plan">
            <h3>Enterprise</h3>
            <p>For financial advisors</p>
            <ul>
              <li>✓ Team Dashboards</li>
              <li>✓ API Integrations</li>
              <li>✓ Custom Reporting</li>
              <li>✓ Priority Support</li>
            </ul>
            <p className="price">Contact Us</p>
          </div>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer>
        <p>© 2025 AI Finance Manager | Finance-as-a-Service for Everyone</p>
      </footer>
    </div>
  );
};

export default Home;
