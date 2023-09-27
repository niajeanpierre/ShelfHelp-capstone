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
  const book = location.state?.book;
  const [myNote, setMyNote] = useState({ ...book });

  useEffect(() => {
    // Fetch book data based on the book ID or title if needed

    // Retrieve saved content from local storage when the component mounts
    const savedContent = localStorage.getItem('savedContent');
    if (savedContent) {
      const parsedContent = JSON.parse(savedContent);
      setBookTitle(parsedContent.bookTitle);
      setBookCover(parsedContent.bookCover);
      setReview(parsedContent.review);
      setQuotes(parsedContent.quotes);
      setNotes(parsedContent.notes);
      setNote(parsedContent.note);
    }
  }, [book]);


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
  const saveContent = () => {
    // Create an object with the data you want to save
    const contentToSave = {
      bookTitle,
      bookCover,
      review,
      quotes,
      notes,
      note,
    };

    localStorage.setItem('savedContent', JSON.stringify(contentToSave));

    alert('Content saved successfully!');
  };


  return (
    <div className="note-page-container display">
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
        <ul className="note-list">
          {notes.map((note, index) => (
            <li key={index}>
              {note}
              <button onClick={() => deleteNote(index)}>Delete</button>
            </li>
          ))}
        </ul>
        <button className="publish-button" onClick={addNote}>
          Publish
        </button>
      </div>
    </div>
  );
};


export default NotePage;
