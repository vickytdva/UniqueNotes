import React, { useState } from 'react';
import Login from './Login';
import Notes from './Notes'; 
import Header from './Header';
import SearchBar from './SearchBar';
import DateFilter from './DateFilter';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [notes, setNotes] = useState([]);
  
  // Handle login
  const handleLogin = async (username) => {
    try {
      const response = await fetch('http://localhost:5205/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) throw new Error('Login failed');

      const data = await response.json();
      localStorage.setItem('token', data.token);
      setToken(data.token);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  // Handle search by title
  const handleSearch = async (query) => {
    try {
      const response = await fetch(`http://localhost:5205/notes/search?title=${query}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error searching notes:', error);
    }
  };

  // Handle date filter
  const handleFilter = async (fromDate, toDate) => {
    try {
      const response = await fetch(`http://localhost:5205/notes/filter?fromDate=${fromDate}&toDate=${toDate}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error filtering notes:', error);
    }
  };

  return (
    <div className="App">
      {token ? (
        <>
          <Header onLogout={handleLogout} />
          <SearchBar onSearch={handleSearch} />
          <DateFilter onFilter={handleFilter} />
          <Notes notes={notes} />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
