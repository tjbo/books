import BOOK from '../../../modules/book/_bookTypes'
import bookData from '../../../__mocks__/modules/book/book'
import { default as reducer, initialState } from '../../../modules/book/_bookReducer'

describe('book reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            {
                ...initialState
            }
        )
    })

    it('should set isLoading to true', () => {
        expect(reducer(undefined, {
            type: BOOK.GET_REQUESTED
        })).toEqual(
            {
                ...initialState,
                isLoading: true
            }
        )
    })

    it('should set a book', () => {
        expect(reducer(undefined, {
            type: BOOK.GET_SUCCEEDED,
            payload: bookData
        })).toEqual(
            {
                ...initialState,
                isLoading: false,
                book: bookData
            }
        )
    })

    it('should set an error message', () => {
        expect(reducer(undefined, {
            type: BOOK.GET_FAILED,
            payload: 'error thing'
        })).toEqual(
            {
                ...initialState,
                error: 'error thing'
            }
        )
    })
})