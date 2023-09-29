import React, { useState } from "react";
import Rating from "../../components/Rating/Rating";

const StarRating = () => {
  const [rating, setRating] = useState(0);
  return (
    <>
      <div className="row">
        <div className="col text-center">
          <Rating rating={rating} onRating={(rate) => setRating(rate)} />
          <p>Rating - {rating}</p>
        </div>
      </div>
    </>
  );
};

export default StarRating;
