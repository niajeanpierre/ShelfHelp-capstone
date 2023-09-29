import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./search.css";
import { Form, FormControl, Button, Card, ListGroup } from "react-bootstrap";
import axios from "axios";
import LoadingSpinner from "../../components/loadingSpinner/loadingspinner";
import BookMenu from "../../components/BookMenu";
import StarRating from "../rating/ratingPage";
const Search = () => {
  const navigate = useNavigate();
  const { query } = useParams();
  const [radioOption, setRadioOption] = useState("");
  const [bothChecked, setBothChecked] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredBooks, setFilteredBooks] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const searchSearch = () => {
    axios
      .get(
        `https://openlibrary.org/search.json?q=${
          query === undefined ? "tolkien" : query
        }`
      )
      .then((response) => {
        // Handle the API response here
        // console.log("API Response:", response.data);
        let hasImage = response.data.docs.filter((book) =>
          book.hasOwnProperty("cover_i")
        );
        // console.log(hasImage);
        setFilteredBooks(hasImage);
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle errors here
        console.error("API Error:", error);
      });
  };
  const searchQuery = () => {
    axios
      .get(
        `https://openlibrary.org/search.json?q=${
          query === "" ? "tolkien" : query
        }`
      )
      .then((response) => {
        // Handle the API response here
        // console.log("API Response:", response.data);
        let hasImage = response.data.docs.filter((book) =>
          book.hasOwnProperty("cover_i")
        );
        // console.log(hasImage);

        setFilteredBooks(hasImage);
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle errors here
        console.error("API Error:", error);
      });
  };

  const searchForBoth = () => {
    setIsLoading(true);
    // console.log(`searching for both is: ${bothChecked}: ${search}  `, query);
    if (query) {
      searchQuery();
    } else {
      searchSearch();
    }
  };
  const searchForRadioOption = () => {
    setIsLoading(true);

    // console.log(`searching for ${radioOption}: ${search}`);
    axios
      .get(`https://openlibrary.org/search.json?${radioOption}=${search}`)
      .then((response) => {
        // Handle the API response here
        // console.log("API Response:", response.data);
        let hasImage = response.data.docs.filter((book) =>
          book.hasOwnProperty("cover_i")
        );
        // console.log(hasImage);

        setFilteredBooks(hasImage);
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle errors here
        console.error("API Error:", error);
      });
  };
  const handleNavigate = () => {
    navigate(`/search/${search}`);
  };
  const handleSearch = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (bothChecked) {
      searchForBoth();
    }
    if (!bothChecked) {
      searchForRadioOption();
    }
  };
  // useEffect(() => {

  // }, []);

  useEffect(() => {
    // console.log(`setting search: ${search} to query: ${query}`);
    query && setSearch(query);

    handleSearch();

    // console.log("query: ", query, " search: ", search);
  }, [query, radioOption]);
  return (
    <section className="display">
      <h1>Search</h1>
      <Form className="d-flex align-items-center" onSubmit={handleNavigate}>
        <FormControl
          type="search"
          className="searchParams1 nav-search"
          placeholder="search books..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={handleNavigate}>Search</Button>

        {["title", "author"].map((type) => (
          <div key={`inline-${type}`} className="mb-3">
            <Form.Check
              inline
              label={type === "title" ? "Title" : "Author"}
              name={type}
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

      <div className="bookCard">
        {isLoading && <LoadingSpinner />}

        {filteredBooks ? (
          filteredBooks.map((book, index) => (
            <Card className="singleBook" key={index} style={{ width: "16rem" }}>
              <Card.Img
                variant="top"
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={`Cover for ${book.title}`}
              />
              <Card.Body>
                <Card.Title>"{book.title}"</Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>by {book.author_name}</ListGroup.Item>
                <ListGroup.Item>
                  <BookMenu book={book} />
                </ListGroup.Item>
                <ListGroup.Item>
                  <StarRating />
                </ListGroup.Item>
              </ListGroup>
              {/* <Card.Body>
                  <Card.Link href="#">Card Link</Card.Link>
                  <Card.Link href="#">Another Link</Card.Link>
                </Card.Body> */}
            </Card>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </section>
  );
};

export default Search;
