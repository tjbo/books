import BOOK from './_bookTypes'
const initialState = {
    isLoading: false,
    book: null
}

export default function BookReducer(state = initialState, action) {
    const { payload, type } = action
    switch (type) {
        case BOOK.OPEN: {
            return {
                id: payload
            }
        }
        case BOOK.GET_REQUESTED: {
            return {
                book: '',
                isLoading: true
            }
        }
        case BOOK.GET_SUCCEEDED: {
            return {
                book: payload,
                isLoading: false
            }
        }
        default: {
            return state
        }
    }
}