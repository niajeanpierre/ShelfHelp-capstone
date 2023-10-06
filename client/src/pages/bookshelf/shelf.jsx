import React, { useState, useEffect } from "react";
import axios from "axios";
import ShelfDisplay from "../../components/ShelfDisplay";
import "../bookshelf/shelf.css";

const Shelf = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token')
            try {
                const response = await axios.get(
                    import.meta.env.VITE_NODE_ENV === "production"
                    ? import.meta.env.VITE_API_URL + `/book`
                    : "http://localhost:3001/api/book", {headers: {
                        authorization: `Bearer ${token}`,
                      }}
                );
                setBooks(response.data);
            } catch (error) {
                console.error("An error occurred while fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    const readingBooks = books.filter((book) => book.category === "reading");
    const readBooks = books.filter((book) => book.category === "read");

    return (
        <section className="display bookShelf">
            <div className="d-flex flex-column">
                <h2 className="shelf-heading mt-5 mx-5 fst-italic fw-normal">
                    Currently reading...
                </h2>
                <div className="reading mt-2 d-flex flex-wrap">
                    {readingBooks.map((book, i) => (
                        <div
                            key={i}
                            className="text-center d-flex  flex-column align-items-center col-sm-2 col-lg-1 mx-5 mt-3"
                        >
                            <ShelfDisplay book={book} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="read mt-2">
                <h2 className="shelf-heading mt-5 mx-5 fst-italic fw-normal">
                    On the shelf...
                </h2>
                <div className="reading mt-2 d-flex flex-wrap">
                    {readBooks.map((book, i) => (
                        <div
                            key={i}
                            className="text-center d-flex  flex-column align-items-center col-sm-2 col-lg-1 mx-5 mt-3"
                        >
                            <ShelfDisplay book={book} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Shelf;
