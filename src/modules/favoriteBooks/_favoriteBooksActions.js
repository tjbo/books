import FAVORITE_BOOKS from './_favoriteBooksTypes'
import config from '../../config'
import axios from 'axios'
import queryString from 'query-string'
import booksActions from '../books/_booksActions'

const FavoriteBooksActions = {
    getAll() {
        return async (dispatch, getState) => {

            const routerState = getState().router.location.hash
            const params = queryString.parse(getState().router.location.hash, { arrayFormat: 'bracket' })

            if (params.favorites) {
                dispatch({
                    type: FAVORITE_BOOKS.GET_REQUESTED
                })

                const requests = []

                for (let favorite of params.favorites) {
                    const url = `https://www.googleapis.com/books/v1/volumes/${favorite}?key=${config.apiKey}`
                    requests.push(await axios.get(url, {
                        validateStatus: function (status) {
                            return status === 200
                        }
                    }))
                }

                try {
                    const allResponses = await Promise.all(requests)

                    for (let response of allResponses) {
                        if (response.status === 200) {
                            dispatch(this.add(response.data))
                        }
                    }

                    dispatch({
                        type: FAVORITE_BOOKS.GET_SUCCEEDED
                    })

                } catch (error) {
                    dispatch({
                        type: FAVORITE_BOOKS.GET_FAILED,
                        payload: 'There was a problem requesting the data.'
                    })
                }
            }
        }
    },
    add(payload) {
        return {
            type: FAVORITE_BOOKS.ADD,
            payload
        }
    },
    remove(payload) {
        return {
            type: FAVORITE_BOOKS.REMOVE,
            payload
        }
    }
}

export { FavoriteBooksActions as default }