import React from 'react'
import configureMockStore from 'redux-mock-store'
import BookActions from '../../../modules/book/_bookActions'
import BOOK from '../../../modules/book/_bookTypes'
import bookData from '../../../__mocks__/modules/book/book'
import MockAdapter from 'axios-mock-adapter'
import thunk from 'redux-thunk'
import config from '../../../config'

var axios = require('axios');

const mockStore = configureMockStore([thunk])

const initialState = {
    book: {
        isLoading: false,
        book: null,
        error: ''
    }
}

describe('books actions', () => {
    let store, mock

    beforeEach(function () {
        mock = new MockAdapter(axios)
        store = mockStore(initialState)
    })

    it('the request resolves successfully and fires the action', (done) => {
        mock.onGet()
            .reply(() => {
                return new Promise((resolve, reject) => {
                    resolve([200, { ...bookData }])
                })
            })

        store.dispatch(BookActions.get()).then((response) => {
            let expectedActions = [
                {
                    type: BOOK.GET_REQUESTED
                },
                {
                    type: BOOK.GET_SUCCEEDED,
                    payload: bookData
                }]

            expect(store.getActions()).toEqual(expectedActions)
            done()
        })
    })

    it('the request fails at the network, but fires an failure action', (done) => {
        mock.onGet()
            .networkError()

        store.dispatch(BookActions.get()).then((response) => {
            let expectedActions = [
                {
                    type: BOOK.GET_REQUESTED
                },
                {
                    type: BOOK.GET_FAILED,
                    payload: 'There was a problem requesting the data.'
                }
            ]

            expect(store.getActions()).toEqual(expectedActions)
            done()
        })
    })
})

