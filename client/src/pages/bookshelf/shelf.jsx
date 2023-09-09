import React from "react";
import BookDisplay from "../../components/BookDisplay";
import "../bookshelf/shelf.css";
import cover from "../../images/cover.png";

const Shelf = () => {
    const books = [
        {
            title: "Harry Potter and the Philosopher's stone",
            author: "JK Rowling",
            cover: cover,
            category: "read",
        },
        {
            title: "Harry Potter and the Chamber of Secrets",
            author: "JK Rowling",
            cover: cover,
            category: "read",
        },
        {
            title: "Harry Potter and the Prisoner of Azkaban",
            author: "JK Rowling",
            cover: cover,
            category: "read",
        },
        {
            title: "Harry Potter and the Goblet of Fire",
            author: "JK Rowling",
            cover: cover,
            category: "read",
        },
        {
            title: "Harry Potter and the Order of the Phoenix",
            author: "JK Rowling",
            cover: cover,
            category: "read",
        },
        {
            title: "Harry Potter and the Half-Blood Prince",
            author: "JK Rowling",
            cover: cover,
            category: "read",
        },
        {
            title: "Harry Potter and the Deathly Hallows",
            author: "JK Rowling",
            cover: cover,
            category: "reading",
        },
    ];

    const readingBooks = books.filter((book) => book.category === "reading");
    const readBooks = books.filter((book) => book.category === "read");

    return (
        <section className="display bookShelf">
            <div className="d-flex flex-column">
                <h2 className="shelf-heading mt-1 mx-2 fst-italic fw-normal">
                    Currently reading...
                </h2>
                <div className="reading mt-2 d-flex flex-wrap">
                    {readingBooks.map((book, i) => (
                        <div
                            key={i}
                            className="text-center col-sm-2 col-lg-1 mx-4"
                        >
                            <BookDisplay
                                cover={book.cover}
                                title={book.title}
                                author={book.author}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="read mt-2">
                <h2 className="shelf-heading mt-1 mx-2 fst-italic fw-normal">
                    On the shelf...
                </h2>
                <div className="reading mt-2 d-flex flex-wrap">
                    {readBooks.map((book, i) => (
                        <div
                            key={i}
                            className="text-center col-lg-1 col-md-2 col-6 mx-4"
                        >
                            <BookDisplay
                                key={i}
                                cover={book.cover}
                                title={book.title}
                                author={book.author}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Shelf;
