import React from "react";
import ruby from  "../../images/ruby.png"
import kendall from "../../images/kendall.png";
import nia from "../../images/nia.png";
import mackenzie from "../../images/mackenzie.png"


const About = () => {
    return (
        <section className="display d-flex flex-column justify-content-center align-items-center w-75 mx-auto mt-5">
            <h1>About Us</h1>
            <div className="d-flex gap-5">
                <div className="d-flex flex-column w-25">
                    <img src={ruby} height={200} className="about-photos" />
                    <p>
                        <span className="fw-bold fs-4">Hi! I'm Ruby. </span> I'm
                        a Montana based mom to 3 kids and a newbie to the world
                        of web development. When I'm not looking for an extra
                        curly brace, I enjoy cooking, creating various forms of
                        art and participating in Pink Gloves Boxing.
                    </p>
                </div>
                <div className="d-flex flex-column w-25">
                    <img src={kendall} height={200} className="about-photos" />
                    <p>
                        <spa className="fw-bold fs-4">Hey, I'm Kendall</spa>- a
                        web developer living in Chicago, IL. Outside of work you
                        can find me biking with my husband, watching a Chicago
                        Fire game, or reading on my balcony with my cats, Bogie
                        and Pickles.{" "}
                    </p>
                </div>
                <div className="d-flex flex-column w-25">
                    <img src={nia} height={200} className="about-photos" />
                    <p>
                        <span className="fw-bold fs-4">Hi, I'm Nia.</span> A
                        visionary, problem solver, and an innovator. I’m from a
                        Atlanta, GA. Prior to becoming a web developer I use to
                        be an mathematics educator. Outside of work, I enjoy
                        reading and collecting sneakers.
                    </p>
                </div>
                <div className="d-flex flex-column w-25">
                    <img src={mackenzie} height={200} />
                    <p>
                        <span className="fw-bold fs-4">Hi, I'm Mackenzie</span>, I am from Beaufort SC. I
                        enjoy spending time with my family, my dogs, and
                        parrots.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
