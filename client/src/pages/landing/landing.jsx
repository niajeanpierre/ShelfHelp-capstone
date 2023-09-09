import React from "react";
import '../landing/landing.css'
import bookImage from "../../images/bookImage.png"
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const directToSearch = (e) => {
    e.preventDefault();
    navigate(`/search`)
  }

    return (
        <section className="display landing d-flex justify-content-center w-100">
            <div className="d-flex align-items-end">
                <img
                    src={bookImage}
                    alt="hand holding a stack of books"
                    className="h-75 mw-100 mx-5"
                />
            </div>
            <div className="d-flex flex-column justify-content-center mx-5 mw-50">
                <h1 className="app-name display-4 display-xs-6 display-sm-5 display-md-3 display-lg-2">
                    SHELF HELP
                </h1>
                <h4 className="fs-4 fw-normal">
                    What you've read, what you want to read, all in one place.
                </h4>
                <div className="d-flex justify-content-center">
                    <button onClick={directToSearch} className="landing-button">
                        search books
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Landing;
