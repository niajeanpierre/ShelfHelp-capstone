import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import cover from "../../images/cover.png";
import "./search.css";
import { Form, FormControl, Button } from "react-bootstrap";
import axios from "axios";
import LoadingSpinner from "../../components/loadingSpinner/loadingspinner";
const Search = () => {
  const navigate = useNavigate();
  const { query } = useParams();
  const [radioOption, setRadioOption] = useState("");
  const [bothChecked, setBothChecked] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredBooks, setFilteredBooks] = useState();
  const [isLoading, setIsLoading] = useState(false);

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
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  const searchForBoth = () => {
    setIsLoading(true);
    console.log(`searching for both is: ${bothChecked}: ${search}`);
    axios
      .get(`https://openlibrary.org/search.json?q=${search}`)
      .then((response) => {
        // Handle the API response here
        console.log("API Response:", response.data);
        let hasImage = response.data.docs.filter((book) =>
          book.hasOwnProperty("cover_i")
        );

        setFilteredBooks(hasImage);
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle errors here
        console.error("API Error:", error);
      });
  };
  const searchForRadioOption = () => {
    setIsLoading(true);

    console.log(`searching for ${radioOption}: ${search}`);
    axios
      .get(`https://openlibrary.org/search.json?${radioOption}=${search}`)
      .then((response) => {
        // Handle the API response here
        console.log("API Response:", response.data);
        let hasImage = response.data.docs.filter((book) =>
          book.hasOwnProperty("cover_i")
        );

        setFilteredBooks(hasImage);
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle errors here
        console.error("API Error:", error);
      });
  };

  const handleSearch = (e) => {
    if (e) {
      e.preventDefault();
    }
    navigate(`/search/${search}`);

    if (bothChecked) {
      searchForBoth();
    }
    if (!bothChecked) {
      searchForRadioOption();
    }
  };
  useEffect(() => {
    console.log(radioOption);
    console.log(search);
    console.log("query: ", query, " search: ", search);
  }, [radioOption, search, filteredBooks]);

  useEffect(() => {
    query && setSearch(query);

    console.log("query: ", query, " search: ", search);
    // handleSearch();
  }, [query]);
  console.log(filter);
  return (
    <section className="display">
      <h1>Search</h1>
      <Form className="d-flex align-items-center" onSubmit={handleSearch}>
        <FormControl
          type="search"
          className="searchParams1 nav-search"
          placeholder="search books..."
          // value={search}
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
              onChange={() => {
                setRadioOption(type);
                setBothChecked(false);
              }}
            />
          </div>
        ))}
        <div className="mb-3">
          <Form.Check
            inline
            label="Both"
            name="group1"
            type="checkbox"
            id="inline-both-1"
            checked={bothChecked}
            onChange={() => {
              if (radioOption !== "") {
                setRadioOption("");
                setBothChecked(!bothChecked);
              }
            }}
          />
        </div>
      </Form>

      <div>
        {isLoading && <LoadingSpinner />}
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
