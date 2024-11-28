import React from "react";
import { useNavigate } from "react-router-dom";

const BookCard = ({ id, image, title, author, published }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/details/${id}`);
    };

    return (
        <div className="card-container" onClick={handleCardClick}>
            <img src={image} alt={title} />
            <div className="desc">
                <h2>{title}</h2>
                <h3>{author}</h3>
                <p>{published}</p>
            </div>
        </div>
    );
};

export default BookCard;
