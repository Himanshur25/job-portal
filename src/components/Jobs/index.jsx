import React from "react";
import Navbar from "../Navbar";
import "./index.css";
import Job from "./../../Assets/jobs.json";

const Jobs = () => {
  return (
    <>
      <Navbar />
      <div className="job-background">
        <div className="title">
          <h2>Jobs For You</h2>
        </div>
      </div>

      {Job.map(({ logo, company, position, location, posted, contract }) => {
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
                    <p> {posted}</p>
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
    </>
  );
};

export default Jobs;
