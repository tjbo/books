import axios from 'axios'
import config from '../../config'
import BOOKS from './_booksTypes'

const BooksActions = {
    get() {
        return async (dispatch, getState) => {
            const state = getState().books

            if (state.searchTerm) {

                // the request will be "stale" as this triggers on every keypress in searchbar, so cancel the last request 
                if (state.cancelableRequest) {
                    state.cancelableRequest.cancel()
                }

                const url = `https://www.googleapis.com/books/v1/volumes?q=${state.searchTerm}&key=${config.apiKey1}`

                var CancelToken = axios.CancelToken
                var source = CancelToken.source()

                try {

                    dispatch({
                        type: BOOKS.GET_REQUESTED,
                        payload: source
                    })

                    const response = await axios.get(url, {
                        // make a new cancelToken for each request
                        cancelToken: source.token,
                        validateStatus: function (status) {
                            return status === 200
                        }
                    })

                    if (response.status === 200) {
                        dispatch({
                            type: BOOKS.GET_SUCCEEDED,
                            payload: {
                                books: response.data.items
                            }
                        })
                    }
                } catch (error) {
                    if (!axios.isCancel(error)) {
                        dispatch({
                            type: BOOKS.GET_FAILED,
                            payload: 'There was a problem requesting the data.'
                        })
                    }
                }
            }
        }
    },
    setOrderBy(payload) {
        return {
            type: BOOKS.SET_ORDER_BY,
            payload
        }
    },
    setSearchTerm(payload) {
        return {
            type: BOOKS.SET_SEARCH_TERM,
            payload
        }
    },
    setView(payload) {
        return {
            type: BOOKS.SET_VIEW,
            payload
        }
    }
}

export { BooksActions as default }