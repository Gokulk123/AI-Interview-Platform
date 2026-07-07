import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/dashboard">
          🤖 AI Interview Platform
        </Link>

        <button className="btn btn-outline-light" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
