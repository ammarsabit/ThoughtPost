import { Link } from "react-router";
import logo from "../assets/ThoughtPost_Logo.png";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="logo" width={120} />
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
