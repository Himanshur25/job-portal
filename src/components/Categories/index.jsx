import React from 'react'
import './index.css'

const Categories = () => {
  return (
    <>
      <div className="search-box">
        <div className="search">
          <h3>Search Jobs</h3>
          <div className="job-search">
            <input
              type="text"
              className="search-term"
              placeholder="Search Here"
            />
          </div>
        </div>
        <div className="job-category">
          <h4>Categories</h4>
          <ul>
            <li>Frontend</li>
            <li>Backend</li>
            <li>Devops</li>
            <li>Full Stack</li>
            <li>Digital Marketing</li>
          </ul>
        </div>
        <div className="job-category">
          <h4>Salaries</h4>
          <ul className="checkbox">
            <li>
              <input type="checkbox" /> 0-15K
            </li>
            <li>
              <input type="checkbox" /> 15K-30K
            </li>
            <li>
              <input type="checkbox" /> 30K-50K
            </li>
            <li>
              <input type="checkbox" /> 50K-80K
            </li>
            <li>
              <input type="checkbox" /> 80K+
            </li>
          </ul>
        </div>
        <div className="job-category">
          <h4>Experience</h4>
          <ul className="checkbox">
            <li>
              <input type="checkbox" /> 0-1 years
            </li>
            <li>
              <input type="checkbox" /> 1-2 years
            </li>
            <li>
              <input type="checkbox" /> 2-3 years
            </li>
            <li>
              <input type="checkbox" /> 3+ years
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Categories;
