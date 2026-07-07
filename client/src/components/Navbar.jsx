import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        <Link className="navbar-brand" to="/">
          Blog Management
        </Link>

        <div className="collapse navbar-collapse">

          <ul className="navbar-nav me-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}

            {user?.role === "Author" && (
              <li className="nav-item">
                <Link className="nav-link" to="/author-dashboard">
                  Author Dashboard
                </Link>
              </li>
            )}

            {user?.role === "Reader" && (
              <li className="nav-item">
                <Link className="nav-link" to="/reader-dashboard">
                  Reader Dashboard
                </Link>
              </li>
            )}

            {user?.role === "Admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin-dashboard">
                  Admin Dashboard
                </Link>
              </li>
            )}

          </ul>

          {user && (
            <>
              <span className="text-white me-3">
                Welcome, {user.name}
              </span>

              <button
                className="btn btn-danger"
                onClick={logout}
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;