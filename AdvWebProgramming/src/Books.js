import React, {Component} from 'react';
import SearchArea from './SearchArea';
import request from 'superagent';
import BookList from './BookList';

class Books extends Component {

    constructor(props){
        super(props);
        this.state = {
            books: [],
            searchField: ''
        }
    }

    searchBook = (e) => {
        e.preventDefault();
    
        const xhr = new XMLHttpRequest();
        const url = `https://www.googleapis.com/books/v1/volumes?q=${this.state.searchField}`;
    
        xhr.open("GET", url, true); // 비동기 요청 설정
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                console.log(data); // 받아온 데이터 출력 (디버그용)
                this.setState({ books: [...(data.items || [])] }); // books 상태에 API 응답 데이터 저장
            } else if (xhr.readyState === 4) {
                console.error("Error fetching books:", xhr.statusText);
            }
        };
        xhr.send(); // 요청 전송
    }
    


    handleSearch = (e) => {
        console.log(e.target.value); // 디버그용
        this.setState({ searchField: e.target.value })
    }

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
