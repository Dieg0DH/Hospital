import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "./NavBar.css";

const NavBar = () => {
  const { user, handleLogout } = useUser();
  
  const scrollToSection = (sectionId) => {
    if (sectionId === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    } else {
      const section = document.getElementById(`section-${sectionId}`);
      if (section) {
        const navbarHeight = 80;
        const sectionTop = section.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: sectionTop,
          behavior: "smooth"
        });
      }
    }
  };

  return (
    <nav className="navbar">
      {/* Left navbar */}
      <div className="navbar-brand">
        <Link
          to="/"
          className="brand-main"
          onClick={() => scrollToSection("home")}
        >
          PAPI's MEDICAL CARE
        </Link>
        <span className="brand-subtitle">
          Positive And Professional Integrated Care
        </span>
      </div>
      
      {/* Center navbar */}
      <div className="navbar-center">
        <div className="navbar-nav">
          <Link to="/" onClick={() => scrollToSection("home")}>
            Home
          </Link>
          <Link to="/" onClick={() => scrollToSection("about")}>
            About
          </Link>
          <Link to="/" onClick={() => scrollToSection("services")}>
            Services
          </Link>
          <Link to="/appointments">Appointments</Link>
        </div>
      </div>
      
      {/* Right navbar */}
      <div className="navbar-right">
        {user ? (
          <div className="user-section">
            <span className="user-greeting">Welcome, {user.name}</span>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/register" className="register-btn">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;