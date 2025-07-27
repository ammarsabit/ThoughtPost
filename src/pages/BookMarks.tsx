import React from "react";
import NavBar from "../components/NavBar";

const BookMarks = () => {
  return (
    <div>
      <NavBar />
      <div className=" gradient-text">
        <h1 className="text-center mb-3 fs-1 fw-bold">Bookmarked</h1>
      </div>
    </div>
  );
};

export default BookMarks;
