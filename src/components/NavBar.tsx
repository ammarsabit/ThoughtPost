import { Link } from "react-router";
import { useAtom } from "jotai";
import { themeAtom } from "../App";
import { IoMoonSharp } from "react-icons/io5";
import { IoIosSunny } from "react-icons/io";
import logo_dark from "../assets/ThoughtPost_Logo_Dark.png";
import logo_light from "../assets/ThoughtPost_Logo_Light.png";

const NavBar = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  return (
    <div className="navbar">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          {theme === "light" ? (
            <img src={logo_light} alt="logo" width={120} />
          ) : (
            <img src={logo_dark} alt="logo" width={120} />
          )}
        </Link>

        <Link className="nav-link active" to="/">
          Home
        </Link>
        <Link className="nav-link" to="/bookmarks">
          Saved
        </Link>

        <Link to="/createblog">
          <button className="btn btn-dark px-3">Post a Blog</button>
        </Link>
        {theme === "light" ? (
          <IoMoonSharp
            size={40}
            color="black"
            onClick={() => setTheme("dark")}
            className="cursor-pointer"
          />
        ) : (
          <IoIosSunny
            size={40}
            color="orange"
            onClick={() => setTheme("light")}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default NavBar;
