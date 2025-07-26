import React from "react";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="container-fluid">
        <a href="#" className="navbar-brand">
          <img
            src="ThoughtPost_Logo_with_Gradient_Icon1.png"
            alt="logo"
            width={120}
            // height={90}
            
            
          />
        </a>
        <a className="nav-link active" href="#">Home</a>
        <a className="nav-link" href="#">Bookmarks</a>
        <button className="btn">Create New Blog</button>
      </div>
    </div>
  );
};

export default NavBar;
