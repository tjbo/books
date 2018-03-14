import FAVORITE_BOOKS from '../../../modules/favoriteBooks/_favoriteBooksTypes'
import { default as reducer, initialState } from '../../../modules/favoriteBooks/_favoriteBooksReducer'
import bookData from '../../../__mocks__/modules/favoriteBooks/favoriteBook'

describe('favorite books reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            {
                ...initialState
            }
        )
    })

    it('should set loading to true', () => {
        expect(reducer(undefined, {
            type: FAVORITE_BOOKS.GET_REQUESTED
        })).toEqual(
            {
                ...initialState,
                isLoading: true
            }
        )
    })

    it('should set loading to false', () => {
        expect(reducer(undefined, {
            type: FAVORITE_BOOKS.GET_SUCCEEDED,
        })).toEqual(
            {
                ...initialState,
                isLoading: false
            }
        )
    })

    it('should set an error message', () => {
        expect(reducer({ isLoading: true }, {
            type: FAVORITE_BOOKS.GET_FAILED,
            payload: 'you messed it up'
        })).toEqual(
            {
                ...initialState,
                error: 'you messed it up',
                isLoading: false
            }
        )
    })

    it('should add a book to the books map', () => {
        expect(reducer(undefined, {
            type: FAVORITE_BOOKS.ADD,
            payload: bookData
        })).toEqual(
            {
                favorites: new Map([[bookData.id, bookData]])
            }
        )
    })

    it('should remove a book from the books map', () => {
        expect(reducer({ ...initialState, favorites: new Map([[bookData.id, bookData]]) }, {
            type: FAVORITE_BOOKS.REMOVE,
            payload: {
                id: bookData.id
            }
        })).toEqual({
            favorites: new Map()
        })
    })
})