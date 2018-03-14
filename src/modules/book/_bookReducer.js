import BOOK from './_bookTypes'

export const initialState = {
    isLoading: false,
    book: null,
    error: ''
}

export default function BookReducer(state = initialState, action) {
    const { payload, type } = action
    switch (type) {
        case BOOK.GET_REQUESTED: {
            return {
                book: null,
                isLoading: true,
                error: ''
            }
        }
        case BOOK.GET_SUCCEEDED: {
            return {
                book: payload,
                isLoading: false,
                error: ''
            }
        }
        case BOOK.GET_FAILED: {
            return {
                book: null,
                isLoading: false,
                error: payload
            }
        }
        default: {
            return state
        }
    }
}