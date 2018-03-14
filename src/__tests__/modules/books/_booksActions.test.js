import React from 'react'
import configureMockStore from 'redux-mock-store'
import BooksActions from '../../../modules/books/_booksActions'
import BOOKS from '../../../modules/books/_booksTypes'
import booksData from '../../../__mocks__/modules/books/books'
import MockAdapter from 'axios-mock-adapter'
import thunk from 'redux-thunk'
import config from '../../../config'
var axios = require('axios');

const mockStore = configureMockStore([thunk])

const initialState = {
    books: {
        searchTerm: 'something'
    }
}

const store = mockStore(initialState)

describe('books actions', () => {
    it('should create an action to setOrderBy', () => {
        const expectedAction = {
            type: BOOKS.SET_ORDER_BY,
            payload: 'oldest'
        }
        expect(BooksActions.setOrderBy('oldest')).toEqual(expectedAction)
    })

    it('should create an action to setSearchTerm', () => {
        const expectedAction = {
            type: BOOKS.SET_SEARCH_TERM,
            payload: 'something'
        }
        expect(BooksActions.setSearchTerm('something')).toEqual(expectedAction)
    })

    it('should create an action to setView', () => {
        const expectedAction = {
            type: BOOKS.SET_VIEW,
            payload: 'grid'
        }
        expect(BooksActions.setView('grid')).toEqual(expectedAction)
    })

    // let instance, mock

    // beforeEach(function () {
    //     jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    //     mock = new MockAdapter(axios, { delayResponse: 5000 })
    // })

    // it.only('the request resolves successfully and fires the action', (done) => {
    //     // I should match the call here, but since it only has one get, ok
    //     const request = mock.onGet()
    //         .reply(function (response) {
    //             return new Promise(function (resolve, reject) {
    //                 console.log('res', response)


    //                 resolve([200, { items: booksData.items }]);
    //             })
    //         })

    //     store.dispatch(BooksActions.get()).then((response) => {

    //         let expectedActions = [
    //             {
    //                 "payload": request.config.CancelToken,

    //                 "type": "BOOKS_GET_REQUESTED"
    //             },
    //             {
    //                 type: 'BOOKS_GET_SUCCEEDED',
    //                 payload: {
    //                     books: booksData.items
    //                 }
    //             }]

    //         expect(store.getActions()[1]).toEqual(expectedActions[1])
    //         console.log(response)
    //         done()


    //     })
    // })
})

