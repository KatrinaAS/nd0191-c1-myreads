import "./App.css";
import BookshelfPage from "./pages/BookshelfPage";
import SearchPage from "./pages/SearchPage";
import { Routes, Route } from "react-router";
import { useEffect, useState } from "react";
import * as BooksAPI from "./BooksAPI";
import DetailsPage from "./pages/DetailsPage";

function App() {
  const [books, setBooks] = useState(null);

  const onShelfChange = (book) => {
    const updateShelf = async (book) => {
      await BooksAPI.update(book, book.shelf);
    };
    updateShelf(book);
    if (books.filter((b) => b.id === book.id).length > 0) {
      setBooks((prev) => prev.map((b) => (b.id === book.id ? book : b)));
    } else {
      setBooks((prev) => [...prev, book]);
    }
  };
  useEffect(() => {
    const getBooks = async () => {
      const resp = await BooksAPI.getAll();
      setBooks(resp);
    };
    getBooks();
  }, []);
  return (
    <div className="app">
      <Routes>
        <Route
          element={
            <SearchPage onShelfChange={onShelfChange} shelvedBooks={books} />
          }
          path="/search"
          exact
        />
        <Route
          element={
            <BookshelfPage onShelfChange={onShelfChange} books={books} />
          }
          path="/"
          exact
        />
        <Route
          element={<DetailsPage onShelfChange={onShelfChange} />}
          path="/details/:id"
        />
      </Routes>
    </div>
  );
}

export default App;
