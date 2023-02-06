import React, { useState } from "react";
import Navbar from "../Navbar";

const SaveJobs = () => {
  const jobs = [JSON.parse(localStorage.getItem("Job"))];
  return (
    <div>
      <Navbar />
      <div className="jobs-for-you">
        <div className="job-background">
          <div className="title">
            <h2>Saved Jobs</h2>
          </div>
        </div>
        <div className="job-section">
          <div className="job-page">
            {jobs.map(({ logo, company, position, location, role }) => {
              return (
                <div className="job-list">
                  <div className="job-card">
                    <div className="job-name">
                      <img
                        src={require(`../../Assets/images/${logo}`)}
                        alt="logo"
                        className="job-profile"
                      />
                      <div className="job-detail">
                        <h4>{company}</h4>
                        <h3>{position}</h3>
                        <div className="category">
                          <p>{location}</p>
                          <p>{role}</p>
                        </div>
                      </div>
                    </div>
                    <div className="job-posting">
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveJobs;
