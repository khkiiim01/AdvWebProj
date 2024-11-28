import React, { Component } from "react";
import SearchArea from "./SearchArea";
import BookList from "./BookList";

class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            searchField: "",
        };
    }

    searchBook = (e) => {
        e.preventDefault();
        const url = `https://www.googleapis.com/books/v1/volumes?q=${this.state.searchField}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                this.setState({ books: [...(data.items || [])] });
            })
            .catch((error) => console.error("Error fetching books:", error));
    };

    handleSearch = (e) => {
        this.setState({ searchField: e.target.value });
    };

    render() {
        return (
            <div>
                <SearchArea searchBook={this.searchBook} handleSearch={this.handleSearch} />
                <BookList books={this.state.books} />
            </div>
        );
    }
}

export default Books;
