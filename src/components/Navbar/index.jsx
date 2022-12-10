import React from "react";
import "./index.css";

const Navbar = () => {
  return (
    <>
      <div class="main-page">
        <nav id="navbar">
          <h1 class="logo">
            Job<span>Hunt</span>
          </h1>
          <ul>
            <li>
              <a href="/Home">Home</a>
            </li>
            <li>
              <a href="/Jobs">Jobs</a>
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
