import FAVORITE_BOOKS from './_favoriteBooksTypes'
import config from '../../config'
import axios from 'axios'
import queryString from 'query-string'

const FavoriteBooksActions = {
    get() {
        return async (dispatch, getState) => {

            const paramsFromRouter = queryString.parse(getState().router.location.hash, { arrayFormat: 'bracket' })

            if (paramsFromRouter.favorites) {

                try {
                    const requests = []

                    dispatch({
                        type: FAVORITE_BOOKS.GET_REQUESTED
                    })

                    for (let favorite of paramsFromRouter.favorites) {
                        const url = `https://www.googleapis.com/books/v1/volumes/${favorite}?key=${config.apiKey2}`
                        requests.push(await axios.get(url, {
                            validateStatus: function (status) {
                                return status === 200
                            }
                        }))
                    }

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