import React from "react";
import {Link} from "react-router-dom"
import "./index.css";

const Navbar = () => {
  return (
    <>
      <div className="main-page">
        <nav id="navbar">
          <h1 className="logo">
            Job<span>Hunt</span>
          </h1>

          <ul>
            <li>
              <Link to="/Home">Home</Link>
            </li>
            <li>
              <Link to="/Jobs">Jobs</Link>
            </li>
            <li>
              <Link to="/Postjob">Post Job</Link>
            </li>
            <li>
              <Link to="/Savejob">Saved Job</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
