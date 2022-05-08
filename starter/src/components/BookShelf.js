import Book from "./Book";
const BookShelf = ({name, books}) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{name}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map( book => <li key={book.title}><Book book={book} /> </li>)}
                </ol>
            </div>
        </div>
    )
}

export default BookShelf;
