import book from './modules/book/_bookReducer'
import books from './modules/books/_booksReducer'
import favoriteBooks from './modules/favoriteBooks/_favoriteBooksReducer'

const Reducer = {
    book,
    books,
    favoriteBooks
}

export { Reducer as default }