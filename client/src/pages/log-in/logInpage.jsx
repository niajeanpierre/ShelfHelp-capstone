import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3001/api/auth/signin",
                {
                    username: username,
                    password: password,
                }
            );
            console.log(response);

            const token = response.data.token;
            const user = response.data.username;
            console.log(user);

            // Store the token in localStorage (you can also use cookies or sessionStorage)
            localStorage.setItem("token", token);
            localStorage.setItem("user", user);

            // Set the user state with the user data
            setUsername(user);

            setLoggedIn(true);
            setError("");
        } catch (error) {
            setLoggedIn(false);
            setError("Invalid username or password");
        }
    };

    const handleLogout = () => {
        // Clear the token from localStorage (or cookies/sessionStorage)
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setLoggedIn(false);
        setUsername("");
        setPassword("");
    };

    useEffect(() => {
        // Check if a token is stored in localStorage when the component mounts
        const storedToken = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        if (storedToken) {
            setLoggedIn(true);
            setUsername(user);
        }
    }, []);

    return (
        <div className="login-page">
            <div className="login-container d-flex flex-column align-items-center">
                {loggedIn ? (
                    <>
                        <p>Welcome, {username}!</p>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <div className="login-page display w-100">
                        <div className="login-container d-flex flex-column align-items-center">
                            <h1>Login</h1>
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
                            <button onClick={handleLogin}>Login</button>
                            <p>
                                Don't have an account?{" "}
                                <Link to="/register">Register here</Link>
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
