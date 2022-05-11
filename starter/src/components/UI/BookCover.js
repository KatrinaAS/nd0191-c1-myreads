import PropTypes from "prop-types";
import noCover from "../../icons/noCover.png";

const BookCover = ({ book }) => {
  const imageLink = book.imageLinks ? book.imageLinks.thumbnail : noCover;
  return (
    <div
      className="book-cover"
      style={{
        width: 128,
        height: 192,
        backgroundImage: `url("${imageLink}")`,
      }}
    />
  );
};
export default BookCover;

BookCover.propTypes = {
  book: PropTypes.object.isRequired,
};
