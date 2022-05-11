import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as BooksAPI from "../BooksAPI";
import BookShelf from "../components/BookShelf";

const SearchPage = ({ shelvedBooks, onShelfChange }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const getSearch = async (search) => {
        let results = await BooksAPI.search(search, 20);
        if (results["error"]) {
          // Note: I would usually put the error the server returned here.
          // But the demo api does not return a sensible error message.
          // So instead I am hard coding a not found.
          setSearchError("No books found with that search.");
          setSearchResults([]);
        } else {
          setSearchError("");
          results = results.map((book) => {
            const knownBooks = shelvedBooks.filter(
              (sbook) => sbook.id === book.id
            );
            if (knownBooks.length === 1)
              return { ...book, shelf: knownBooks[0].shelf };
            return book;
          });
          setSearchResults(results);
        }
      };
      getSearch(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, shelvedBooks]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="search-books-results">
        {searchError !== "" && (
          <div className="search-error">{searchError}</div>
        )}

        {searchQuery !== "" && (
          <ol className="books-grid">
            <BookShelf
              books={searchResults}
              name="Search results"
              onShelfChange={onShelfChange}
            />
          </ol>
        )}
      </div>
    </div>
  );
};

export default SearchPage;

SearchPage.propTypes = {
  onShelfChange: PropTypes.func,
  shelvedBooks: PropTypes.arrayOf(PropTypes.object),
};
