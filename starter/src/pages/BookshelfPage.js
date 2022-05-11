import PropTypes from "prop-types";
import BookShelf from "../components/BookShelf";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const BookshelfPage = ({ books, onShelfChange }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      {books == null && (
        <div className="books-loading">
          <LoadingSpinner />
        </div>
      )}
      {books != null && (
        <div className="list-books-content">
          <div>
            <BookShelf
              name="Currently Reading"
              onShelfChange={onShelfChange}
              books={books.filter((book) => book.shelf === "currentlyReading")}
            />
            <BookShelf
              name="Want to Read"
              onShelfChange={onShelfChange}
              books={books.filter((book) => book.shelf === "wantToRead")}
            />
            <BookShelf
              name="Read"
              onShelfChange={onShelfChange}
              books={books.filter((book) => book.shelf === "read")}
            />
          </div>
        </div>
      )}
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

export default BookshelfPage;

BookshelfPage.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object),
  onShelfChange: PropTypes.func,
};
