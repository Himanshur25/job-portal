import React from "react";
import Navbar from "../Navbar";
import "./index.css";
import Job from "./../../Assets/jobs.json";
import Categories from "../Categories";

const relativeTime = new Intl.RelativeTimeFormat("en", {
  style: "long",
  numeric: "auto",
});


const Jobs = () => {
  return (
    <>
      <Navbar />
      <div className="job-background">
        <div className="title">
          <h2>Our Jobs</h2>
        </div>
      </div>
      <div className="job-section">
        <div className="job-page">
          {Job.map(({ logo, company, position, location, posted }) => {
            return (
              <div className="job-list">
                <div className="job-card">
                  <div className="job-name">
                    <img
                      src={require(`../../Assets/images/${logo}`)}
                      alt="No image"
                      className="job-profile"
                    />
                    <div className="job-detail">
                      <h4>{company}</h4>
                      <h3>{position}</h3>
                      <div className="category">
                        <p>{location}</p>
                        <p>
                          {relativeTime.format(
                            new Date(posted).getMonth() - new Date().getMonth(),
                            "month"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="job-posting">
                    <a href="">Apply Now</a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      <Categories/>
      </div>
    </>
  );
};

export default Jobs;
