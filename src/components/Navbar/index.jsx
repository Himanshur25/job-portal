import React from "react";
import "./index.css";

const Navbar = () => {
  return (
    <>
      <div className="img">
        <div class="mainpage">
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
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
