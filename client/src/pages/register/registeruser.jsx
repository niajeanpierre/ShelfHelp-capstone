import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);

  const handleRegister = () => {
    // Implement your registration logic here, e.g., sending data to a server.
    // For this example, we'll assume successful registration.
    setRegistrationSuccessful(true);
  };

  return (
    <div className="register-page">
      <div className="register-container">
      <h1>Register</h1>
      {registrationSuccessful ? (
        <div>
          <p>Registration successful! You can now <Link to="/login">log in</Link>.</p>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={handleRegister}>Register</button>
        </div>
      )}
    </div>
    </div>
  );
};

export default RegisterPage;
