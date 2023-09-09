import React from "react";

const BookDisplay = ({ cover, title, author }) => {
    return (
        <div className="d-flex flex-column align-items-center w-100">
            <img src={cover} alt={`${title} cover`} height="200rem" />
            <div className="w-75 d-block">
                <h4 className="fs-6">{title}</h4>
                <p className="fs-6">{author}</p>
            </div>
        </div>
    );
};

export default BookDisplay;
