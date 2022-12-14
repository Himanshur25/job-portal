import React, { useState } from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import "./index.css";
import Job from "./../../Assets/jobs.json";
import Filter from "../Filter";
import { MdAddCircleOutline } from "react-icons/md";


const experience = [
  { min: 0, max: 1 },
  { min: 2, max: 3 },
  { min: 4, max: 5 },
  { min: 5, max: 10 },
];

const Jobs = () => {
  const JobData = JSON.parse(localStorage.getItem("item")) || [];
  const [filteredJobs, setFilteredJobs] = useState([...JobData, ...Job]);
  const [popup, setPopup] = useState(false);
  const [searchterm, setSearchTerm] = useState("");
  const [active, setActive] = useState(false);
  function handleJobFilter(event) {
    const value = event.target.innerText;
    event.preventDefault();
    // event.target.style.color = "red";
    setFilteredJobs(
      Job.filter((job) => {
        return job.role === value;
      })
    );
    // setActive(true);
  }
  function saveClick(id, logo, company, position, location, posted) {
    window.localStorage.setItem(
      "Job",
      JSON.stringify(id, logo, company, position, location, posted)
    );
    window.alert("Saved Job Successfully");
  }
  const searchEvent = (event) => {
    const data = event.target.value;
    setSearchTerm(data);
    if (searchterm !== "" || searchterm.length > 2) {
      const filterData = Job.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchterm.toLowerCase());
      });
      setFilteredJobs(filterData);
    } else {
      setFilteredJobs(Job);
    }
  };
  function handleExperienceFilter(checkedState) {
    let filters = [];
    checkedState.forEach((item, index) => {
      if (item === true) {
        const filterS = Job.filter((job) => {
          return (
            job.experience >= experience[index].min &&
            job.experience <= experience[index].max
          );
        });
        filters = [...filters, ...filterS];
      }
    });
    setFilteredJobs(filters);
  }
  return (
    <>
      <Navbar />
      <div className="jobs-for-you">
        <div className="job-background">
          <div className="title">
            <h2>Our Jobs</h2>
          </div>
        </div>
        <div className="job-section">
          <div className="job-page">
            {filteredJobs?.map(
              ({ id, logo, company, position, location, posted,role }) => {
                return (
                  <div className="job-list">
                    <div className="job-card">
                      <div className="job-name">
                        <img
                          src={
                            logo.length > 20
                              ? logo
                              : require(`../../Assets/images/${logo}`)
                          }
                          alt="No image"
                          className="job-profile"
                        />
                        <div className="job-detail">
                          <h4>{company}</h4>
                          <h3>{position}</h3>
                          <div className="category">
                            <p>{location}</p>
                            <p>
                            {role}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="job-posting">
                        <Link to="">Apply Now</Link>
                      </div>
                      <div className="save-button">
                        <Link
                          to="/Jobs"
                        >
                          <MdAddCircleOutline />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>

          <Filter
            setFilteredJobs={setFilteredJobs}
            handleJobFilter={handleJobFilter}
            handleExperienceFilter={handleExperienceFilter}
            searchEvent={searchEvent}
          />
        </div>
      </div>
    </>
  );
};

export default Jobs;
