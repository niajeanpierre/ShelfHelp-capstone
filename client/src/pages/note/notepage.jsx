import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./NotePage.css";
import BookMenu from "../../components/BookMenu";
import axios from "axios";

const NotePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const book = location.state?.book || {};
    const [myNote, setMyNote] = useState({
        ...book,
        review: book.review || "",
        quotes: book.quotes || "",
        notes: book.notes || ""
    });

    const handleChange = (field, value) => {
        setMyNote(prev => ({ ...prev, [field]: value }));
    };

    const addCategory = (newCategory) => {
        setMyNote(prevState => ({
            ...prevState,
            category: newCategory,
        }));
    };

    const addNote = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    try {
        const checkDuplicates = await axios.get(
            import.meta.env.VITE_NODE_ENV === "production"
            ? import.meta.env.VITE_API_URL + `/book/${encodeURIComponent(myNote.title)}`
            : `http://localhost:3001/api/book/${encodeURIComponent(myNote.title)}`,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        if (checkDuplicates.data) {
            if (
                checkDuplicates.data.author === myNote.author &&
                checkDuplicates.data.category === myNote.category &&
                checkDuplicates.data.notes === myNote.notes &&
                checkDuplicates.data.quotes === myNote.quotes &&
                checkDuplicates.data.review === myNote.review
            ) {
                alert("You have that book on your shelf with the same details!");
                console.error("A book with the exact same details already exists.");
                return;
            } else {
                const updateResponse = await axios.put(
                    import.meta.env.VITE_NODE_ENV === "production"
                    ? import.meta.env.VITE_API_URL + `/book/${encodeURIComponent(myNote.title)}`
                    :`http://localhost:3001/api/book/${encodeURIComponent(myNote.title)}`,
                    myNote,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                if (updateResponse.status === 200) {
                    console.log("Book successfully updated in MongoDB.");
                    navigate("/shelf");
                } else {
                    console.log("Failed to update the book.");
                }
                return;
            }
        }

        const response = await axios.post(
            import.meta.env.VITE_NODE_ENV === "production"
            ? import.meta.env.VITE_API_URL + `/book`
            : "http://localhost:3001/api/book",
            myNote,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 201) {
            console.log("Book successfully saved to MongoDB.");
            navigate("/shelf");
        } else {
            console.log("Failed to save the book.");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
};

    const deleteNote = async (event) => {
      event.preventDefault();
              const token = localStorage.getItem("token");

        try {
            const response = await axios.delete(
                import.meta.env.VITE_NODE_ENV === "production"
                ? import.meta.env.VITE_API_URL + `/book/${encodeURIComponent(myNote.title)}`
                : `http://localhost:3001/api/book/${encodeURIComponent(
                    myNote.title
                )}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.status === 204) {
                console.log("Book deleted book.");
                navigate("/tbr");
            } else {
                console.log("Failed to delete the book.");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <div className="note-page-container display">
            <div className="note-page position-relative">
                <h1>Notes</h1>
                <i
                    onClick={deleteNote}
                    className="fa fa-times hover position-absolute top-0 end-0 text-danger fs-3 m-2"
                    aria-hidden="true"
                ></i>
                <div className="book-section">
                    <h2>
                        <span className="fst-italic">{myNote.title} </span>
                        by {myNote.author}
                    </h2>
                </div>
                <div className="sections">
                    <div className="section">
                        <h2>Review</h2>
                        <textarea
                            value={myNote.review}
                            onChange={(e) => handleChange("review", e.target.value)}
                            placeholder="Write your review here..."
                        />
                    </div>
                    <div className="section">
                        <h2>Quotes</h2>
                        <textarea
                            value={myNote.quotes}
                            onChange={(e) => handleChange("quotes", e.target.value)}
                            placeholder="Add quotes here..."
                        />
                    </div>
                    <div className="section">
                        <h2>Notes</h2>
                        <textarea
                            value={myNote.notes}
                            onChange={(e) => handleChange("notes", e.target.value)}
                            placeholder="Take notes here..."
                        />
                    </div>
                </div>
                <BookMenu book={myNote} addCategory={addCategory} />
                <button className="publish-button" onClick={addNote}>
                    Publish
                </button>
            </div>
        </div>
    );
};

export default NotePage;
