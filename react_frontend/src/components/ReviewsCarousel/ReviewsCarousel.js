import React, { useState } from "react";
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from "./ReviewsCarouselMessages";
import "./ReviewsCarousel.css";

const getBrowserLanguage = () => {
    const lang = navigator.language || navigator.userLanguage;
    return lang.startsWith("es") ? "es" : "en";
};

const ReviewsCarousel = () => {
    const [index, setIndex] = useState(0);
    const locale = getBrowserLanguage();

    const reviews = [
        {
            id: 1,
            nombre: "Sofía",
            fecha: <FormattedMessage id="review_1_date" />,
            comentario: <FormattedMessage id="review_1_comment" />,
            calificacion: 5,
        },
        {
            id: 2,
            nombre: "Carlos",
            fecha: <FormattedMessage id="review_2_date" />,
            comentario: <FormattedMessage id="review_2_comment" />,
            calificacion: 4,
        },
    ];

    const siguienteReview = () => {
        setIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    };

    const anteriorReview = () => {
        setIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
    };

    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            <div className="reviews-carousel">
                <h3><FormattedMessage id="user_reviews" /></h3>
                <div className="review-card">
                    <h4>{reviews[index].nombre}</h4>
                    <p>{reviews[index].fecha}</p>
                    <p>{reviews[index].comentario}</p>
                    <p>{"⭐".repeat(reviews[index].calificacion)}</p>
                </div>
                <div className="carousel-buttons">
                    <button onClick={anteriorReview}>❮</button>
                    <button onClick={siguienteReview}>❯</button>
                </div>
            </div>
        </IntlProvider>
    );
};

export default ReviewsCarousel;
