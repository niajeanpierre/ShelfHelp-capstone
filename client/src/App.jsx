import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import Landing from "./pages/landing/landing";
import Shelf from "./pages/bookshelf/shelf";
import TBR from "./pages/tbr/tbr";
import Navigation from "./components/Navigation";
import Search from "./pages/search/search";
import "./App.css";
import NotePage from "./pages/note/notepage";
import LoginPage from "./pages/log-in/logInpage";
import RegisterPage from "./pages/register/registeruser";
import SignUpNav from "./components/SignUpNav";
import BookInfo from "./pages/bookInfo/bookInfo";
import About from "./pages/about/about";

function UseLocationEffect() {
    const location = useLocation();
    return null;
}

function App() {
    const [LoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState('');

useEffect(() => {
    const checkUserSession = () => {
        const token = localStorage.getItem("token");

        if (token) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    };

    checkUserSession();
}, []);

    useEffect(() => {
        // Check if a token is stored in localStorage when the component mounts
        const storedToken = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        if (storedToken) {
            setLoggedIn(true);
            setUser(user);
        }
    }, []);

    return (
        <Router>
            <div className="App">
                <UseLocationEffect />
                {LoggedIn ? (
                    <Navigation setLoggedIn={setLoggedIn} />
                ) : (
                    <SignUpNav setLoggedIn={setLoggedIn} />
                )}
                <Routes>
                    <Route path="/" exact element={<Landing />} />
                    <Route path="/shelf" element={<Shelf />} />
                    <Route path="/tbr" element={<TBR />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/search/:query" element={<Search />} />
                    <Route path="/note/:title" element={<NotePage />} />
                    <Route
                        path="/login"
                        element={
                            <LoginPage
                                setLoggedIn={setLoggedIn}
                                setUser={setUser}
                            />
                        }
                    />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/book/:title" element={<BookInfo />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
