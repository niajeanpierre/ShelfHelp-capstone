import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./search.css";
import { Form, FormControl, Button } from "react-bootstrap";
import axios from "axios";
import LoadingSpinner from "../../components/loadingSpinner/loadingspinner";
import BookMenu from '../../components/BookMenu'

const Search = () => {
    const { query } = useParams();
    const [radioOption, setRadioOption] = useState("both");
    const [search, setSearch] = useState(query || "");
    const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const searchForBooks = async (search, radioOption) => {
    setBooks([]);
        console.log(`Search by ${radioOption}: ${search}`);

        let apiUrl;

        if (radioOption === "both") {
            apiUrl = `https://openlibrary.org/search.json?q=${search}`;
        } else {
            apiUrl = `https://openlibrary.org/search.json?${radioOption}=${search}`;
        }

        try {
            const response = await axios.get(apiUrl);
          const data = response.data;
            const booksData = data.docs.map((doc) => ({
                author: doc.author_name ? doc.author_name[0] : "Unknown",
                title: doc.title,
                coverI: doc.cover_i,
            }));

            const booksWithCovers = booksData.filter((book) => book.coverI);

          setBooks(booksWithCovers);
          setIsLoading(false);
        } catch (err) {
            console.error("Failed to fetch data:", err);
        }
    };

  const handleSearch = (e) => {
      setIsLoading(true)
        e.preventDefault();
        navigate(`/search/${search}`)
    };

      useEffect(() => {
        if (query) {
            setIsLoading(true)
              searchForBooks(query, radioOption);
          }
      }, [query]);

    return (
        <section className="display landing d-flex flex-column align-items-center w-100">
            <h1>Search</h1>
            <Form className="d-flex align-items-center" onSubmit={handleSearch}>
                <FormControl
                    type="search"
                    className="fs-4 fw-normal px-4 py-1 rounded"
                    placeholder="search books..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button type="submit">Search</Button>

                {["title", "author", "both"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                            inline
                            label={
                                type === "title"
                                    ? "Title"
                                    : type === "author"
                                    ? "Author"
                                    : "Both"
                            }
                            name="group1"
                            type="radio"
                            id={`inline-${type}-1`}
                            checked={radioOption === type}
                            onChange={() => {
                                setRadioOption(type);
                            }}
                        />
                    </div>
                ))}
            </Form>

            <div>
                {isLoading && <LoadingSpinner />}
                {books &&
                    books.map((book, index) => (
                        <div className="mt-3" key={index}>
                            <h4>
                                {book.title} || Author:{book.author}
                            </h4>
                            <img
                                src={`https://covers.openlibrary.org/b/id/${book.coverI}-S.jpg`}
                                alt={`Cover for ${book.title}`}
                        />
                        <BookMenu book={book}/>
                        </div>
                    ))}
            </div>
        </section>
    );
};

export default Search;
