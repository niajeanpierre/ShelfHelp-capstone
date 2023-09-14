import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import cover from "../../images/cover.png";
import "./search.css";
import { Form, FormControl, Button } from "react-bootstrap";
import axios from "axios";
const Search = () => {
  const navigate = useNavigate();
  const { query } = useParams();
  const [radioOption, setRadioOption] = useState("title");
  const [search, setSearch] = useState("");
  const [filteredBooks, setFilteredBooks] = useState();

  console.log(query);

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

  const filter = books.filter((book) =>
    book[radioOption].toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .get(`https://openlibrary.org/search.json?${radioOption}=${search}`)
      .then((response) => {
        // Handle the API response here
        console.log("API Response:", response.data);
        setFilteredBooks(response.data.docs);
      })
      .catch((error) => {
        // Handle errors here
        console.error("API Error:", error);
      });
  };
  useEffect(() => {
    console.log(radioOption);
    console.log(search);
  }, [radioOption, search, filteredBooks]);

  useEffect(() => {
    if (query !== undefined) {
      setSearch(query);
    }
  }, [query]);
  console.log(filter);
  return (
    <section className="display">
      <h1>Search</h1>
      <Form className="d-flex align-items-center">
        <FormControl
          type="search"
          className="searchParams1 nav-search w-100"
          placeholder="search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>

        {["title", "author"].map((type) => (
          <div key={`inline-${type}`} className="mb-3">
            <Form.Check
              inline
              label={type === "title" ? "Title" : "Author"}
              name="group1"
              type="radio"
              id={`inline-${type}-1`}
              checked={radioOption === type}
              onChange={() => setRadioOption(type)}
            />
          </div>
        ))}
      </Form>

      <div>
        {filteredBooks
          ? filteredBooks.map((book, index) => (
              <div key={index}>
                <h4>
                  {book.title} || Author:{book.author_name}
                </h4>
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`}
                  alt={`Cover for ${book.title}`}
                />
              </div>
            ))
          : filter.map((book, index) => (
              <div key={index}>
                <h4>
                  {book.title} || Author:{book.author}
                </h4>
                {/* <img src={book.cover} alt={`Cover for ${book.title}`} /> */}
              </div>
            ))}
      </div>
    </section>
  );
};

export default Search;
