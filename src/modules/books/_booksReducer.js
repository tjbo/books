import BOOKS from './_booksTypes'
import { sortBy } from 'lodash'
import queryString from 'query-string'

// get initial state from URL
const { searchTerm = '', orderBy = 'asc', view = 'list' } = queryString.parse(window.location.hash)

export const initialState = {
    books: [],
    cancelableRequest: null,
    error: '',
    isLoading: false,
    orderBy,
    searchTerm,
    view
}

export function sortBooks(books, orderBy) {
    function sort(key) {
        return sortBy(books, [(book) => {
            return book.volumeInfo[key]
        }])
    }

    if (!orderBy) {
        return books
    } else if (orderBy === 'asc') {
        return sort('title')
    } else if (orderBy === 'desc') {
        return sort('title').reverse()
    } else if (orderBy === 'oldest') {
        return sort('publishedDate')
    } else if (orderBy === 'newest') {
        return sort('publishedDate').reverse()
    }
}

export default function BooksReducer(state = initialState, action) {
    const { payload, type } = action

    switch (type) {
        case BOOKS.GET_REQUESTED: {
            return {
                ...state,
                books: [],
                error: '',
                isLoading: true,
                cancelableRequest: payload // tracks the current request, if a new one comes, we cancel in the get() action 
            }
        }
        case BOOKS.GET_SUCCEEDED: {
            return {
                ...state,
                books: sortBooks(payload.books, state.orderBy),
                error: '',
                isLoading: false
            }
        }
        case BOOKS.GET_FAILED: {
            return {
                ...state,
                books: [],
                error: payload,
                isLoading: false
            }
        }
        case BOOKS.SET_SEARCH_TERM: {
            return {
                ...state,
                searchTerm: payload
            }
        }
        case BOOKS.SET_ORDER_BY: {
            return {
                ...state,
                books: sortBooks(state.books, payload),
                orderBy: payload
            }
        }
        case BOOKS.SET_VIEW: {
            return {
                ...state,
                view: payload
            }
        }
        default: {
            return state
        }
    }
}
