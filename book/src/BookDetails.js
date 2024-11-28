import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./BookDetails.module.css";

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // 책 정보 상태
    const [book, setBook] = useState(null);

    // 리뷰 상태
    const [reviews, setReviews] = useState([]); // 리뷰 목록
    const [reviewText, setReviewText] = useState(""); // 새로운 리뷰 텍스트
    const [editIndex, setEditIndex] = useState(null); // 수정 중인 리뷰 인덱스

    useEffect(() => {
        // Google Books API 호출
        fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setBook(data.volumeInfo);
            })
            .catch((error) => console.error("Error fetching book details:", error));
    }, [id]);

    // 리뷰 추가
    const addReview = () => {
        if (reviewText.trim() === "") return; // 빈 리뷰 방지

        if (editIndex !== null) {
            // 수정 모드일 때
            const updatedReviews = [...reviews];
            updatedReviews[editIndex] = reviewText;
            setReviews(updatedReviews);
            setEditIndex(null);
        } else {
            // 새 리뷰 추가
            setReviews([...reviews, reviewText]);
        }

        setReviewText(""); // 입력창 초기화
    };

    // 리뷰 수정
    const editReview = (index) => {
        setReviewText(reviews[index]); // 수정할 리뷰 텍스트 입력창에 표시
        setEditIndex(index); // 수정 모드로 전환
    };

    // 리뷰 삭제
    const deleteReview = (index) => {
        const updatedReviews = reviews.filter((_, i) => i !== index);
        setReviews(updatedReviews);
    };

    if (!book) {
        return <p>Loading...</p>;
    }

    return (
        <div className={styles.bookDetails}>
            
            {book.imageLinks?.thumbnail && (
                <img src={book.imageLinks.thumbnail} alt={book.title} />
            )}
            <h1>{book.title}</h1>
            <h3>Author: {book.authors?.join(", ") || "Unknown Author"}</h3>
            <p>Published Date: {book.publishedDate || "Unknown Date"}</p>
            {book.description ? (
                <div
                    dangerouslySetInnerHTML={{ __html: book.description }}
                />
            ) : (
                <p>No description available.</p>
            )}
            <button onClick={() => navigate("/")}>Back to List</button>

            {/* 리뷰 작성 및 관리 */}
            <div className={styles.reviewsSection}>
                <h2>Reviews</h2>
                <div className={styles.reviewInput}>
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Write your review here..."
                    />
                    <button onClick={addReview}>
                        {editIndex !== null ? "Update Review" : "Add Review"}
                    </button>
                </div>
                <ul className={styles.reviewList}>
                    {reviews.map((review, index) => (
                        <li key={index} className={styles.reviewItem}>
                            <p>{review}</p>
                            <div className={styles.reviewActions}>
                                <button onClick={() => editReview(index)}>Edit</button>
                                <button onClick={() => deleteReview(index)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default BookDetails;
