import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BookMenu = ({ book, addCategory }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [displayValue, setDisplayValue] = useState("Add to Shelf");

    useEffect(() => {
        if (location.pathname.startsWith("/search/")) {
            setDisplayValue("Add to Shelf");
        } else {
            setDisplayValue("Update Status");
        }
    }, [location.pathname]);

    const handleCategoryChange = async (e) => {
        const newCategory = e.target.value;
        let newBook = {
            username: book.username,
            author: book.author,
            title: book.title,
            cover: book.coverI,
            category: newCategory,
        };

        console.log("newbook", newBook);
        const token = localStorage.getItem("token");

        if (location.pathname.startsWith("/search")) {
            try {
                const response = await axios.post(
                    "http://localhost:3001/api/book",
                    newBook,
                    {
                        headers: {
                            authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (response.status === 200) {
                    console.log("Book successfully saved to MongoDB.");
                    if (newCategory === "read") {
                        navigate(`/note/${book.title}`, {
                            state: { book: newBook },
                        });
                    } else if (newCategory === "reading") {
                        navigate("/shelf");
                    } else if (newCategory === "tbr") {
                        navigate("/tbr");
                    } else {
                        alert("Error");
                    }
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        } else if (location.pathname.startsWith("/note")) {
            addCategory(newCategory);
        }
    };

    return (
        <div className="">
            <select
                className="book-menu px-4 fs-5 fw-normal rounded"
                value={book.category || ""}
                onChange={handleCategoryChange}
            >
                <option value="" disabled>
                    {displayValue}
                </option>
                <option value="tbr">Want to Read</option>
                <option value="reading">Reading</option>
                <option value="read">Read</option>
            </select>
        </div>
    );
};

export default BookMenu;
