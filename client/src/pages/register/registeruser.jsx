import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);

  const handleRegister = async () => {
    const user = await axios.post(
      "http://localhost:3001/api/auth/signup", {
        username: username,
        password: password
      }
    )
    console.log(user)
    if (user.status === 200) {
      setRegistrationSuccessful(true);
    }
  };

  return (
      <div className="register-page display">
          <div className="register-container d-flex flex-column align-items-center">
              <h1>Register</h1>
              {registrationSuccessful ? (
                  <div>
                      <p>
                          Registration successful! You can now{" "}
                          <Link to="/login">log in</Link>.
                      </p>
                  </div>
              ) : (
                  <div className="d-flex flex-column align-items-center w-100">
                      <input
                          className="w-25"
                          type="text"
                          placeholder="Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                      />
                      <input
                          className="w-25"
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                      />
                      <input
                          className="w-25"
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
