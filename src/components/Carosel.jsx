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
                alt={`${currentSlideIndex + 1}`}
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

        // eslint-disable-next-line
    }, []);

    return (
        <div className="carousel text-center">
            {renderImage()}
            <div className="mt-4">
                <button onClick={() => changeSlide("prev")} className="opacity-50 mx-1 p-2"><i class='bx bxs-left-arrow' ></i></button>
                <button onClick={() => changeSlide("next")} className="opacity-50 mx-1 p-2"><i class='bx bxs-right-arrow' ></i></button>
            </div>
        </div>
    );
};

export default Carousel;