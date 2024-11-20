
import React from "react";
import BookCard from "./BookCard";

const BookList = (props) => {
    return (
        <div className="list">
            {props.books.map((book, i) => (
                <BookCard
                    key={i}
                    image={book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150"} // 기본 이미지 설정
                    title={book.volumeInfo.title}
                    author={book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown Author"} // 저자 정보 없을 경우 처리
                    published={book.volumeInfo.publishedDate || "Unknown Date"} // 발행일 정보 없을 경우 처리
                />
            ))}
        </div>
    );
};

export default BookList;
