import React from "react";
import BookCard from "./BookCard";

const BookList = (props) => {
    return (
        <div className="list">
            {props.books.map((book, i) => (
                <BookCard
                    key={i}
                    id={book.id} // 책 ID 전달
                    image={book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150"}
                    title={book.volumeInfo.title}
                    author={book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown Author"}
                    published={book.volumeInfo.publishedDate || "Unknown Date"}
                />
            ))}
        </div>
    );
};

export default BookList;
