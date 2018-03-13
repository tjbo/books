import BOOKS from '../../../modules/books/_booksTypes'
import booksData from '../../../__mocks__/modules/books/books'
import { default as reducer, initialState, sortBooks } from '../../../modules/books/_booksReducer'

describe('books reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            {
                ...initialState
            }
        )
    })

    it('should set requesting state', () => {
        expect(reducer(undefined, {
            type: BOOKS.GET_REQUESTED,
            payload: null
        })).toEqual({
            ...initialState,
            isLoading: true
        })
    })

    it('should set a books array', () => {
        expect(reducer(undefined, {
            type: BOOKS.GET_SUCCEEDED,
            payload: {
                books: booksData.items
            }
        })).toEqual({
            ...initialState,
            books: sortBooks(booksData.items, 'asc')
        })
    })

    it('should set an error message', () => {
        expect(reducer(undefined, {
            type: BOOKS.GET_FAILED,
            payload: 'there was some error'
        })).toEqual({
            ...initialState,
            error: 'there was some error'
        })
    })

    it('should set  a search term', () => {
        expect(reducer(undefined, {
            type: BOOKS.SET_SEARCH_TERM,
            payload: 'test term'
        })).toEqual({
            ...initialState,
            searchTerm: 'test term'
        })
    })

    it('should sort the books properly', () => {
        expect(reducer({ ...initialState, books: sortBooks(booksData.items) }, {
            type: BOOKS.SET_ORDER_BY,
            payload: 'desc'
        })).toEqual({
            ...initialState,
            orderBy: 'desc',
            books: sortBooks(booksData.items, 'desc')
        })
    })

    it('should set the view properly', () => {
        expect(reducer(undefined, {
            type: BOOKS.SET_VIEW,
            payload: 'list'
        })).toEqual({
            ...initialState,
            view: 'list'
        })
    })
})