
import BOOKS from './_booksTypes'
import axios from 'axios'
import queryString from 'query-string'
import shortid from 'shortid'

const BooksActions = {
    init() {
        return (dispatch, getState) => {
            const { searchTerm, orderBy, view } = queryString.parse(getState().router.location.hash)
            dispatch({
                type: BOOKS.INIT,
                payload: {
                    searchTerm, orderBy, view
                }
            })
            dispatch(this.get())
        }
    },
    get() {
        return async (dispatch, getState) => {
            const state = getState().books

            if (state.searchTerm) {

                // the request will be "stale" as this triggers on keypress in searchbar, so just cancel the last request 
                if (state.cancelableRequest) {
                    state.cancelableRequest()
                }

                // make a new cancelToken for each request
                const CancelToken = axios.CancelToken
                const url = `https://www.googleapis.com/books/v1/volumes?q=${state.searchTerm}&key=AIzaSyDF-cyWMyQz81H2KMu0j9JRgMPKBMhWDm4`

                try {
                    const response = await axios.get(url, {
                        cancelToken: new CancelToken(function executor(cancelFunction) {
                            dispatch({
                                type: BOOKS.GET_REQUESTED,
                                payload: cancelFunction
                            })
                        }),
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
                        console.error(error)
                    }
                }
            }
        }
    },
    setOrderBy(payload) {
        return (dispatch) => {
            dispatch({
                type: BOOKS.SET_ORDER_BY,
                payload
            })
        }
    },
    setSearchTerm(payload) {
        return (dispatch) => {
            dispatch({
                type: BOOKS.SET_SEARCH_TERM,
                payload
            })
            dispatch(this.get())
        }
    },
    setView(payload) {
        return (dispatch) => {
            dispatch({
                type: BOOKS.SET_VIEW,
                payload
            })
        }
    }
}

export { BooksActions as default }