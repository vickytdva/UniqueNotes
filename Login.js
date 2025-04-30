import React, { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the onLogin function passed from App.js
    onLogin(username);
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

