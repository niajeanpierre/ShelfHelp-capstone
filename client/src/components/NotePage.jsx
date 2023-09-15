import React, { useState, useEffect } from 'react';
import './NotePage.css'; 
const NotePage = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [bookCover, setBookCover] = useState('');
  const [review, setReview] = useState('');
  const [quotes, setQuotes] = useState('');
  const [note, setNote] = useState('');

  // Function to fetch book cover based on the book title
  const fetchBookCover = async () => {
    if (bookTitle.trim() !== '') {
      try {
        const response = await fetch(
          `https://your-book-api-url.com/search?title=${encodeURIComponent(bookTitle)}`
        );

        if (!response.ok) {
          throw new Error('Book not found');
        }

        const data = await response.json();
        if (data.coverUrl) {
          setBookCover(data.coverUrl);
        } else {
          setBookCover('');
        }
      } catch (error) {
        console.error(error);
        setBookCover('');
      }
    } else {
      setBookCover('');
    }
  };

  useEffect(() => {
    fetchBookCover();
  }, [bookTitle]);

  const addNote = () => {
    if (newNote.trim() !== '') {
      setNotes([...notes, newNote]);
      setNewNote('');
    }
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  const publish = () => {
    // Implement your publishing logic here (e.g., sending data to an API).
    alert('Published!'); // Replace with your logic.
  };

  return (
    <div className="note-page-container">
      <div className="note-page">
      <h1>Notes</h1>
      <div className="book-section">
        <input
          type="text"
          placeholder="Book Title"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
        />
        {bookCover && <img src={bookCover} alt="Book Cover" />}
      </div>
      <div className="sections">
        <div className="section">
          <h2>Review</h2>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review here..."
          />
        </div>
        <div className="section">
          <h2>Quotes</h2>
          <textarea
            value={quotes}
            onChange={(e) => setQuotes(e.target.value)}
            placeholder="Add quotes here..."
          />
        </div>
        <div className="section">
          <h2>Notes</h2>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Take notes here..."
          />
        </div>
      </div>
      <div className="note-form">
        <input
          type="text"
          placeholder="Add a new note"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button onClick={addNote}>Add</button>
      </div>
      <ul className="note-list">
        {notes.map((note, index) => (
          <li key={index}>
            {note}
            <button onClick={() => deleteNote(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <button className="publish-button" onClick={publish}>
        Publish
      </button>
    </div>
    </div>
  );
};

export default NotePage;