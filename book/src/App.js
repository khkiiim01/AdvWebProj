import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Books from "./Books";
import BookDetails from "./BookDetails"; // 책 상세 정보 컴포넌트
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router basename="AdvWebProj">
        <div className="App">
          <Header />
          <Routes>
            {/* 책 검색 페이지 */}
            <Route path="/" element={<Books />} />

            {/* 책 상세 정보 페이지 */}
            <Route path="/details/:id" element={<BookDetails />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
