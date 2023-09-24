import React, { useEffect } from "react";
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
import NotePage from "./pages/note/NotePage";
import BookInfo from "./pages/bookInfo/bookInfo";


function UseLocationEffect() {
    const location = useLocation();

    useEffect(() => {
        const isLandingPage = location.pathname === "/";

        const display = document.querySelector(".display");
        display.classList.toggle("landing-background", isLandingPage);
    }, [location]);

    return null;
}

function App() {
    return (
        <Router>
            <div className="App">
                <UseLocationEffect />
                <Navigation />
                <Routes>
                    <Route path="/" exact element={<Landing />} />
                    <Route path="/shelf" element={<Shelf />} />
                    <Route path="/tbr" element={<TBR />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/search/:query" element={<Search />} />
                    <Route path="/note/:title" element={<NotePage />} />
                    <Route path="/book/:title" element={<BookInfo />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
