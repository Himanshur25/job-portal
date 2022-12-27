import React, { useState } from "react";
import "./index.css";
const StarRating = ({ onChange }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  function handleMouseLeave() {
    setHover(rating);
    onChange(rating);
  }
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={
              index <= (hover || rating) ? "on rate-button" : "off rate-button"
            }
            onClick={() => {
              setRating(index);
            }}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="">&#9733;</div>
          </button>
        );
      })}
    </div>
  );
};
export default StarRating;
