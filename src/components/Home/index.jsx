import React from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import "./index.css";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="banner-img">
        <div className="title">
          <h3>
            Find the <span>Right Job</span> In the
            <br />
            <span> Right Companies</span>
          </h3>
          <div className="small-tagline">
            <p>Got fired..!! Get Ready to be hired</p>
          </div>
        </div>
        <div className="button" data-testid="btn">
          <Link to="/Jobs">Browse Jobs</Link>
        </div>
      </div>
      <div className="social-media" data-testid="images">
        <img src="https://assets.website-files.com/5ec5d86528da2f24250d634c/5ec7175d7e0c401a3e668a1d_facebook-logo.svg" alt="fb" />
        <img src="https://assets.website-files.com/5ec5d86528da2f24250d634c/5ec7175d68c9b0a57ed94925_google-logo.svg" alt="google" />
        <img src="https://assets.website-files.com/5ec5d86528da2f24250d634c/601e13bc333df3521cce5b6a_youtube-logo-jobs-webflow-template.svg" alt="youtube" />
        <img src="https://assets.website-files.com/5ec5d86528da2f24250d634c/601e13bc774d5a00bcbb0baf_linkedin-logo-jobs-webflow-template.svg" alt="linkedin" />
      </div>
    </>
  );
};

export default Home;
