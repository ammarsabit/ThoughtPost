import { Link } from "react-router";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img
            src="ThoughtPost_Logo_with_Gradient_Icon1.png"
            alt="logo"
            width={120}
          />
        </Link>

        <Link className="nav-link active" to="/">
          Home
        </Link>
        <Link className="nav-link" to="/bookmarks">
          Bookmarks
        </Link>

        <Link to="/createblog">
          <button className="btn">Create New Blog</button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
