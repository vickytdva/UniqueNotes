import React from 'react';

function Header({ onLogout }) {
  return (
    <header className="app-header">
      <h1>UniqueNotes</h1>
      <button onClick={onLogout}>Logout</button>
    </header>
  );
}

export default Header;
