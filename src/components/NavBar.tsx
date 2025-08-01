import { Link, NavLink } from "react-router";
import { useAtom } from "jotai";
import { themeAtom } from "../States/AtomStates";
import { IoIosSunny } from "react-icons/io";
import { BsMoonStarsFill } from "react-icons/bs";
import logo_dark from "../assets/ThoughtPost_Logo_Dark.png";
import logo_light from "../assets/ThoughtPost_Logo_Light.png";
import { formActionAtom } from "../States/AtomStates";

const NavBar = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  const [, setFormAction] = useAtom(formActionAtom);
  return (
    <div className={`navbar`}>
      <div className="d-flex container-fluid">
        <Link to="/" className="navbar-brand">
          {theme === "light" ? (
            <img src={logo_light} alt="logo" width={120} />
          ) : (
            <img src={logo_dark} alt="logo" width={120} />
          )}
        </Link>

        <ul
          className="d-flex"
          style={{ fontFamily: "K2D, sans-serif", fontWeight: "600" }}
        >
          <li className="align-self-center list-unstyled mx-4 ">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li className="align-self-center list-unstyled mx-4">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to="/about"
            >
              About
            </NavLink>
          </li>
          <li className="align-self-center list-unstyled mx-4">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to="/bookmarks"
            >
              Saved
            </NavLink>
          </li>
        </ul>

        <div>
          <button
            className="btn btn-dark px-3"
            onClick={() => setFormAction(true)}
          >
            Post a Blog
          </button>
          {theme === "light" ? (
            <BsMoonStarsFill
              size={30}
              color="black"
              onClick={() => setTheme("dark")}
              className="cursor-pointer mx-3"
            />
          ) : (
            <IoIosSunny
              size={40}
              color="orange"
              onClick={() => setTheme("light")}
              className="cursor-pointer mx-3"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
