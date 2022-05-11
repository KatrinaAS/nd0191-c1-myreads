import PropTypes from "prop-types";
import "./DetailsPage.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import * as BooksAPI from "../BooksAPI";
import BookCover from "../components/UI/BookCover";

const DetailsPage = ({ onShelfChange }) => {
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");
  const { id } = useParams();
  const history = useNavigate();

  const shelfHandler = (event) => {
    const newBook = { ...book, shelf: event.target.value };
    if (onShelfChange) {
      onShelfChange(newBook);
    }
    setBook(newBook);
  };
  useEffect(() => {
    const getBook = async () => {
      try {
        const results = await BooksAPI.get(id);
        console.log(results);
        if (results["error"]) {
          setError(results.error);
        } else {
          setBook(results);
          setError("");
        }
      } catch (e) {
        setError("Unable to load book.");
      }
    };
    getBook();
  }, [id]);
  return (
    <div className="book-detail">
      <div className="book-detail-title">
        <button className="close-details" onClick={() => history(-1)}>
          Close
        </button>
        <h1>Details</h1>
      </div>
      <div className="details-content">
        {book === null && error === "" && (
          <div className="details-loading">
            <LoadingSpinner />
          </div>
        )}
        {error && <div className="details-error">{error}</div>}
        {book !== null && (
          <div>
            <div className="details-header">
              <div className="book">
                <div className="book-top">
                  <BookCover book={book} />
                  <div className="book-shelf-changer">
                    <select
                      value={book.shelf ? book.shelf : "none"}
                      onChange={shelfHandler}
                    >
                      <option value="moveTo" disabled>
                        Move to...
                      </option>
                      <option value="currentlyReading">
                        Currently Reading
                      </option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="details-sidepanel">
                <h1>{book.title}</h1>
                <h4>By {book.authors.join(", ")}</h4>
                <h3>{book.subtitle}</h3>
              </div>
            </div>
            <div className="details-description">{book.description}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsPage;

DetailsPage.propTypes = {
  onShelfChange: PropTypes.func,
};
