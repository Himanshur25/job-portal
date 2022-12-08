import React from "react";
import "./index.css";

const Navbar = () => {
  return (
    <>
      <div class="main-page">
        <nav id="navbar">
          <h1 class="logo">Job-O-Phobia</h1>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Jobs</a>
            </li>
            <li>
              <a href="#">Companies</a>
            </li>

            <li>
              <a href="#">Post Job</a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
