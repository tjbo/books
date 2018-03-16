import axios from 'axios'
import { push } from 'react-router-redux'
import config from '../../config'
import BOOK from './_bookTypes'

const BookActions = {
    open(payload) {
        return (dispatch) => {
            dispatch(push(`/book/${payload.id}`))
        }
    },
    get(payload) {
        return async (dispatch, getState) => {
            dispatch({
                type: BOOK.GET_REQUESTED
            })

            const url = `https://www.googleapis.com/books/v1/volumes/${payload}?key=${config.apiKey1}`

            try {
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
            }
        }

    }
}

export { BookActions as default }