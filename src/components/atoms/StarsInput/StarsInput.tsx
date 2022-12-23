import { useState } from "react";
import { ReactComponent as Star } from "../../../assets/Icons/star.svg";

import "./StarsInput.scss";

interface StarsInputProps {
  ratingSetter?: any;
}

const StarsInput = ({ ratingSetter = () => {} }: StarsInputProps) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="d-flex star-rating-input m-0 p-0">
      {[...Array(5)].map((star: any, idx) => {
        const ratingValue = idx + 1;
        return (
          <label key={idx}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => {
                setRating(ratingValue);
                ratingSetter(ratingValue);
              }}
            />
            <Star
              fill={ratingValue <= (hover || rating) ? "#003b50" : "none"}
              className={`star px-1`}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarsInput;
