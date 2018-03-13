import BOOK from './_bookTypes'

export const initialState = {
    book: null,
    error: '',
    isLoading: false
}

export default function BookReducer(state = initialState, action) {
    const { payload, type } = action
    switch (type) {
        case BOOK.GET_REQUESTED: {
            return {
                book: null,
                error: '',
                isLoading: true
            }
        }
        case BOOK.GET_SUCCEEDED: {
            return {
                book: payload,
                error: '',
                isLoading: false
            }
        }
        case BOOK.GET_FAILED: {
            return {
                book: null,
                error: payload,
                isLoading: false
            }
        }
        default: {
            return state
        }
    }
}