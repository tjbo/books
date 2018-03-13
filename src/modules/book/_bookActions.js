import BOOK from './_bookTypes'
import { push } from 'react-router-redux'
import axios from 'axios'

const BookActions = {
    open(payload) {
        return (dispatch) => {
            dispatch(push(`book/${payload.id}`))
        }
    },
    get(payload) {
        return async (dispatch, getState) => {

            const url = `https://www.googleapis.com/books/v1/volumes/${payload}?key=AIzaSyDF-cyWMyQz81H2KMu0j9JRgMPKBMhWDm4`

            try {
                dispatch({
                    type: BOOK.GET_REQUESTED
                })

                const response = await axios.get(url, {
                    validateStatus: function (status) {
                        return status === 200
                    }
                })

                if (response.status === 200) {
                    dispatch({
                        type: BOOK.GET_SUCCEEDED,
                        payload: response.data
                    })
                }

            } catch (error) {
                dispatch({
                    type: BOOK.GET_FAILED,
                    payload: 'There was a problem requesting the data.'
                })
                console.error(error)
            }
        }

    }
}

export { BookActions as default }