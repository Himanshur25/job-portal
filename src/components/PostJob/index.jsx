import React from "react";
import { useState } from "react";
import Navbar from "../Navbar";
import "./index.css";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const [company, setCompany] = useState("");
  const [logo, setLogo] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");

const navigate=useNavigate();
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onabort = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };
  const handleImg = (e) => {
    const file = e.target.files[0];
    getBase64(file).then((base64) => {
      localStorage["logo"] = base64;
      setLogo(base64);
    });
  };

  const handleSubmitButton = (e) => {
      const jobPost = {
        company,
        position,
        salary,
        experience,
        role,
        location,
        logo
      };
    e.preventDefault();
    if (company === "") {
      window.alert("Enter name");
    } else if (position === "") {
      window.alert("Enter position");
    } else if (experience === "") {
      window.alert("Enter Experience");
    } else if (salary === "") window.alert("Enter Salary");
    else {
      let savedItem = [];
      if (localStorage.getItem("item")) {
        savedItem = JSON.parse(localStorage.getItem("item"));
      }
      localStorage.setItem("item", JSON.stringify([...savedItem, {jobPost}]));
      window.alert("Form Submitted Successfully");
      navigate("/Jobs");
    }
  };
  return (
    <div>
      <Navbar />

      <div className="job-background">
        <div className="title">
          <h2>Post a Job</h2>
        </div>
      </div>
      <div className="container">
        <header className="header">
          <h1 className="post-job">Fill the form </h1>
        </header>
        <form>
          <div className="form-group">
            <label id="name-label" htmlFor="name">
              Company Name
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter Company Name"
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label id="name-label" htmlFor="name">
              Enter Job Location
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter Job Location"
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label id="logo-label" htmlFor="logo">
              Company logo
            </label>
            <label>
              <input
                type="file"
                id="myFile"
                name="filename"
                onChange={handleImg}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>What position are you posting for?</label>
            <select
              id="dropdown"
              name="role"
              className="form-control"
              onChange={(e) => setPosition(e.target.value)}
              required
            >
              <option disabled selected value>
                Select position
              </option>
              <option>Frontend</option>
              <option>Backend</option>
              <option>Full Stack</option>
              <option>Devops</option>
              <option>Digital Marketing</option>
            </select>
          </div>
          <div className="form-group">
            <label id="name-label" htmlFor="name">
              Enter Job Role
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter Job Role"
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>

          <div
            className="form-group"
            onChange={(e) => setExperience(e.target.value)}
          >
            <label>Experience </label>
            <label>
              <input
                name="user-recommend"
                value="0-1 Year"
                type="radio"
                className="input-radio"
              />
              0-1 Year
            </label>
            <label>
              <input
                name="user-recommend"
                value=" 2-3 Years"
                type="radio"
                className="input-radio"
              />
              2-3 Years
            </label>
            <label>
              <input
                name="user-recommend"
                value=" 4-5 Years"
                type="radio"
                className="input-radio"
              />
              4-5 Years
            </label>
            <label>
              <input
                name="user-recommend"
                value="5+ Years"
                type="radio"
                className="input-radio"
              />
              5+ Years
            </label>
          </div>

          <div className="form-group">
            <label>Salary</label>
            <select
              className="form-control"
              onChange={(e) => setSalary(e.target.value)}
              required
            >
              <option disabled selected value>
                Select Salary
              </option>
              <option value="0-15K">0-15K</option>
              <option value="15-30K">15-30K</option>
              <option value="30K-50K">30K-50K</option>
              <option value="50K-80K">50K-80K</option>
              <option value="80K+">80K+</option>
            </select>
          </div>
          <div className="form-group">
            <button type="submit" className="submit-button" onClick={handleSubmitButton}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
