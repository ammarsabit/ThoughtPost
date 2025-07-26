import React from "react";

interface Props {
  onNew: () => void;
}

const NavBar = ({ onNew }: Props) => {
  return (
    <div className="navbar">
      <div className="container-fluid">
        <a href="#" className="navbar-brand">
          <img
            src="ThoughtPost_Logo_with_Gradient_Icon1.png"
            alt="logo"
            width={120}
          />
        </a>
        <a className="nav-link active" href="#">
          Home
        </a>
        <a className="nav-link" href="#">
          Bookmarks
        </a>
        <button className="btn" onClick={() => onNew()}>
          Create New Blog
        </button>
      </div>
    </div>
  );
};

export default NavBar;
