import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // Retrieve token from localStorage
  const token = localStorage.getItem('token'); 
  console.log("Current token:", token);

  // Fetch notes 
  useEffect(() => {
    if (!token) {
      console.error("No token found, please log in.");
      return;
    }

    axios.get('http://localhost:5205/api/notes', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching notes:', error.response ? error.response.data : error.message);
      });
  }, [token]);

  // Handle adding a new note
  const handleAddNote = () => {
    if (!newNote.title || !newNote.content) {
      console.error("Note title and content are required");
      return;
    }

    const note = {
      title: newNote.title,
      content: newNote.content,
    };

    if (!token) {
      console.error("No token found, please log in.");
      return;
    }

    axios.post('http://localhost:5205/api/notes', note, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setNotes((prevNotes) => [...prevNotes, response.data]);
        setNewNote({ title: '', content: '' });
      })
      .catch((error) => {
        console.error('Error adding note:', error.response ? error.response.data : error.message);
      });
  };

  // Handle deleting a note
  const handleDeleteNote = (id) => {
    if (!token) {
      console.error("No token found, please log in.");
      return;
    }

    axios.delete(`http://localhost:5205/api/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting note:', error.response ? error.response.data : error.message);
      });
  };

  // Handle date filtering
  const handleDateFilter = async () => {
    if (!token) {
      console.error("No token found, please log in.");
      return;
    }

    try {
      const response = await axios.get('http://localhost:5205/api/notes/filter', {
        params: { fromDate, toDate },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(response.data);
    } catch (error) {
      console.error("Error filtering notes:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h2>Notes</h2>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
        />
        <button onClick={handleAddNote}>Add Note</button>
      </div>

      <div>
        <h3>Filter Notes by Date</h3>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
        <button onClick={handleDateFilter}>Filter</button>
      </div>

      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notes;
