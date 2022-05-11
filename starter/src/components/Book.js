import PropTypes from "prop-types";
import BookCover from "./UI/BookCover";
import { Link } from "react-router-dom";

const Book = ({ book, onShelfChange }) => {
  const shelfHandler = (event) => {
    if (onShelfChange) {
      onShelfChange({ ...book, shelf: event.target.value });
    }
  };
  return (
    <div className="book">
      <div className="book-top">
        <Link to={`/details/${book.id}`}>
          <BookCover book={book} />
        </Link>
        <div className="book-shelf-changer">
          <select
            value={book.shelf ? book.shelf : "none"}
            onChange={shelfHandler}
          >
            <option value="moveTo" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">
        {book.authors ? book.authors.join(", ") : "Unknown"}
      </div>
    </div>
  );
};

export default Book;

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onShelfChange: PropTypes.func,
};
