import { useState } from "react";
import "./index.css";
const experience = [
  { min: 0, max: 1 },
  { min: 2, max: 3 },
  { min: 4, max: 5 },
  { min: 5, max: 10 },
];

const Filter = ({
  setFilteredJobs,
  handleJobFilter,
  handleExperienceFilter,
  searchEvent,
}) => {
  const [checkedState, setCheckedState] = useState(
    new Array(experience.length).fill(false)
  );

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
    handleExperienceFilter(updatedCheckedState);
  };
  return (
    <>
      <div className="filter-page">
        <div className="search-box">
          <div className="search">
            <h3>Search Jobs</h3>
            <div className="job-search">
              <input
                type="text"
                className="search-term"
                placeholder="Search Here"
                onChange={searchEvent}
              />
            </div>
          </div>
          <div className="filter">
            <div className="job-category">
              <h4>Categories</h4>
              <ul>
                <li onClick={handleJobFilter}>Frontend</li>
                <li onClick={handleJobFilter}>Backend</li>
                <li onClick={handleJobFilter}>Devops</li>
                <li onClick={handleJobFilter}>Full Stack</li>
                <li onClick={handleJobFilter}>Digital Marketing</li>
              </ul>
            </div>

            <div className="job-category">
              <h4>Experience</h4>
              <ul className="checkbox">
                <li>
                  <input
                    name="0-1"
                    type="checkbox"
                    checked={checkedState[0]}
                    onChange={() => handleOnChange(0)}
                  />
                  0-1 year
                </li>
                <li>
                  <input
                    name="2-3"
                    type="checkbox"
                    checked={checkedState[1]}
                    onChange={() => handleOnChange(1)}
                  />
                  2-3 year
                </li>
                <li>
                  <input
                    name="4-5"
                    type="checkbox"
                    checked={checkedState[2]}
                    onChange={() => handleOnChange(2)}
                  />
                  4-5 year
                </li>
                <li>
                  <input
                    name="4-5"
                    type="checkbox"
                    checked={checkedState[3]}
                    onChange={() => handleOnChange(3)}
                  />
                  5+ year
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
