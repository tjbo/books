import FAVORITE_BOOKS from './_favoriteBooksTypes'

const initialState = {
    isLoading: false,
    favorites: new Map()
}

export default function FavoriteBooksReducer(state = initialState, action) {
    const { payload, type } = action

    switch (type) {
        case FAVORITE_BOOKS.GET_REQUESTED: {
            return {
                isLoading: true,
                favorites: new Map(),
                error: ''
            }
        }
        case FAVORITE_BOOKS.GET_FAILED: {
            return {
                isLoading: false,
                favorites: new Map(),
                error: payload
            }
        }
        case FAVORITE_BOOKS.ADD: {
            return {
                favorites: new Map([...state.favorites, [payload.id, payload]])
            }
        }
        case FAVORITE_BOOKS.REMOVE: {
            const newMap = new Map([...state.favorites])
            newMap.delete(payload.id)
            return {
                favorites: newMap
            }
        }
        default: {
            return state
        }
    }
}