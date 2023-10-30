import React, { useState, useEffect } from "react";
import carousel1 from "../static/images/Property 1=Frame 8.png"
import carousel2 from "../static/images/Property 1=Frame 8-1.png"

const Carousel = () => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    const images = [
        carousel1,
        carousel2,
    ];

    const renderImage = () => {
        return (
            <img
                src={images[currentSlideIndex]}
                className={currentSlideIndex === 0 ? "fade-in" : "fade-out"}
                alt={`Image ${currentSlideIndex + 1}`}
            />
        );
    };

    const changeSlide = (direction) => {
        if (direction === "next") {
            setCurrentSlideIndex((currentSlideIndex + 1) % images.length);
        } else if (direction === "prev") {
            setCurrentSlideIndex((currentSlideIndex - 1 + images.length) % images.length);
        }
    };

    // Automatically change the slide after 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            changeSlide("next");
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="carousel">
            {renderImage()}
            <button onClick={() => changeSlide("prev")}>Prev</button>
            <button onClick={() => changeSlide("next")}>Next</button>
        </div>
    );
};

export default Carousel;