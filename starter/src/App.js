import "./App.css";
import { useState } from "react";
import BookShelf from "./components/BookShelf";
import BookshelfPage from "./pages/BookshelfPage";
import SearchPage from "./pages/SearchPage";
import {Routes, Route} from "react-router";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route element={<SearchPage />} path="/search" exact />
          <Route element={<BookshelfPage />} path="/" exact />
      </Routes>
    </div>
  );
}

export default App;
