import React, { useState } from "react";
import Job from "./../../Assets/jobs.json";
import Navbar from "../Navbar";


const SaveJobs = () => {
  const [filteredJobs, setFilteredJobs] = useState([
    JSON.parse(localStorage.getItem("Job")),
  ]);
  function deleteClick(event) {
    const value = event.target.innerText;
    setFilteredJobs(
      Job.filter((job) => {
        return job.role === value;
      })
    );
  }
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
            {filteredJobs.map(
              ({ logo, company, position, location, role }) => {
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
                      
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveJobs;
