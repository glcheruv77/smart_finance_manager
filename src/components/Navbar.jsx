import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">AI Finance Manager</div>

      <ul className="nav-links">
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/budget" className={({ isActive }) => isActive ? "active" : ""}>
            Budget Tracker
          </NavLink>
        </li>

        <li>
          <NavLink to="/scanner" className={({ isActive }) => isActive ? "active" : ""}>
            Document Scanner
          </NavLink>
        </li>

        <li>
          <NavLink to="/planner" className={({ isActive }) => isActive ? "active" : ""}>
            Smart Planner
          </NavLink>
        </li>

        <li>
          <NavLink to="/rewards" className={({ isActive }) => isActive ? "active" : ""}>
            Rewards
          </NavLink>
        </li>
      </ul>

      <button
        className="theme-toggle"
        onClick={() => setDarkMode(prev => !prev)}
        aria-label="Toggle dark mode"
      >
        {darkMode ? "🌙" : "☀️"}
      </button>
    </nav>
  );
}
