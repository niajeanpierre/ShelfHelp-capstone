import React from "react";
import cover from "../../images/cover.png";
import BookDisplay from "../../components/ShelfDisplay";


const TBR = () => {


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
      category: "reading",
    },
    {
      title: "Harry Potter and the Deathly Hallows",
      author: "JK Rowling",
      cover: cover,
      category: "tbr",
    },
  ];

  const tbrBooks = books.filter((book) => book.category === "tbr");

  return (
    <section className="display tbr">
            <div className="d-flex flex-column">
                <h2 className="shelf-heading mt-1 mx-2 fst-italic fw-normal">
                    To be read...
                </h2>
                <div className="reading mt-2 d-flex flex-wrap">
                    {tbrBooks.map((book, i) => (
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
        </section>
    );
};

export default TBR;
