import FAVORITE_BOOKS from './_favoriteBooksTypes'

export const initialState = {
    error: '',
    favorites: new Map(),
    isLoading: false
}

export default function FavoriteBooksReducer(state = initialState, action) {
    const { payload, type } = action

    switch (type) {
        case FAVORITE_BOOKS.GET_REQUESTED: {
            return {
                error: '',
                favorites: new Map(),
                isLoading: true
            }
        }
        case FAVORITE_BOOKS.GET_SUCCEEDED: {
            return {
                ...state,
                isLoading: false
            }
        }
        case FAVORITE_BOOKS.GET_FAILED: {
            return {
                error: payload,
                favorites: new Map(),
                isLoading: false
            }
        }
        case FAVORITE_BOOKS.ADD: {
            return {
                ...state,
                favorites: new Map([...state.favorites, [payload.id, payload]])
            }
        }
        case FAVORITE_BOOKS.REMOVE: {
            const newMap = new Map([...state.favorites])
            newMap.delete(payload.id)
            return {
                ...state,
                favorites: newMap
            }
        }
        default: {
            return state
        }
    }
}