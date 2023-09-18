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
    return (
      <section className="display landing d-flex flex-column align-items-center w-100">

            <h1>Search</h1>
            <Form className="d-flex align-items-center" onSubmit={handleSearch}>
                <FormControl
                    type="search"
                    className="searchParams1 nav-search w-100"
                    placeholder="search books..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button type="submit">Search</Button>

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
                {filteredBooks &&
                    filteredBooks.map((book, index) => (
                        <div key={index}>
                            <h4>
                                {book.title} || Author:{book.author_name}
                            </h4>
                            <img
                                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`}
                                alt={`Cover for ${book.title}`}
                            />
                        </div>
                    ))}
            </div>
        </section>
    );
};

export default Search;
