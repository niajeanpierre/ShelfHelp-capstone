import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ShelfDisplay = ({ book }) => {
    const navigate = useNavigate();
    const [hover, setHover] = useState(false);

    const directToNote = () => {
        const { category, title } = book;
        if (category === "tbr" || category === "reading") {
            navigate(`/note/${book.title}`, { state: { book } });
        } else if (category === "read") {
            navigate(`/book/${book.title}`);
        } else {
            alert("Error");
        }
    };

    const handleMouseEnter = () => {
        setHover(true);
    };

    const handleMouseLeave = () => {
        setHover(false);
    };

    return (
        <div
            onClick={directToNote}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="d-flex flex-column align-items-center w-100 hover"
        >
            <img
                src={`http://covers.openlibrary.org/b/id/${book.cover}-L.jpg`}
                alt={`${book.title} cover`}
                height="200rem"
                width="150rem"
            />
            <div className="w-100 d-block">
                <h4 className="fs-5">{book.title}</h4>
            </div>
        </div>
    );
};

export default ShelfDisplay;
