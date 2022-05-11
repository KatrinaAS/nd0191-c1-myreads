import PropTypes from "prop-types";
import Book from "./Book";
const BookShelf = ({ name, books, onShelfChange }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <Book book={book} onShelfChange={onShelfChange} />{" "}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;

BookShelf.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string,
  onShelfChange: PropTypes.func,
};
