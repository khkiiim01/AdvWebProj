
import React from "react";

const BookCard = (props) => {
    return (
        <div className="card-container">
            <img src={props.image} alt={props.title} /> {/* 기본 이미지가 이미 설정된 상태 */}
            <div className="desc">
                <h2>{props.title}</h2>
                <h3>{props.author}</h3>
                <p>{props.published}</p>
            </div>
        </div>
    );
};

export default BookCard;
