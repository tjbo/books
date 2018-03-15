import configureMockStore from 'redux-mock-store'
import BooksActions from '../../../modules/books/_booksActions'
import BOOKS from '../../../modules/books/_booksTypes'
import MockAdapter from 'axios-mock-adapter'
import thunk from 'redux-thunk'
import axios from 'axios'
import books from '../../../__mocks__/modules/books/books'

// not sure if this is the best way to mock this token, first time I've really used it. ;)
// if I continue to use jest, I'd revist this to make sure I've done it correctly
jest.unmock('axios')

const mockedAxios = require('axios')

// even after mocking it, I was still having problems, and it turns out it's a bug with axios
// so this is a hack to make the test pass... would probably have to submit a PR to axios to fix this properly, or 
// re-code the way cancel tokens are assigned and tracked to make this test pass

// https://github.com/axios/axios/issues/978
// https://github.com/axios/axios/issues/993

const cancel = function () {
}

const token = {
    promise: new Promise(() => { }, () => { }),
    throwIfRequested: function throwIfRequested(error) {
        return
    }
}

mockedAxios.CancelToken.source = function () {
    return {
        cancel,
        token
    }
}

const mockStore = configureMockStore([thunk])

const initialState = {
    books: {
        books: [],
        cancelableRequest: null,
        error: '',
        isLoading: false,
        orderBy: 'asc',
        searchTerm: 'test',
        view: 'list'
    }
}

describe('books actions', () => {
    let mock, store

    beforeEach((function () {
        mock = new MockAdapter(mockedAxios, { delayResponse: 2000 })
        store = mockStore(initialState)
    }))

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

    it('the request resolves successfully and fires the action', (done) => {
        mock.onGet()
            .reply(() => {
                return new Promise((resolve, reject) => {
                    resolve([200, books])
                })
            })

        store.dispatch(BooksActions.get()).then((response) => {

            var CancelToken = mockedAxios.CancelToken
            var source = CancelToken.source()

            let expectedActions = [
                {
                    type: BOOKS.GET_REQUESTED,
                    payload: source
                },
                {
                    type: BOOKS.GET_SUCCEEDED,
                    payload: {
                        books: books.items
                    }
                }
            ]

            expect(store.getActions()).toEqual(expectedActions)
            done()
        })
    })

    it('error should dispatch', (done) => {
        mock.onGet()
            .networkError()

        store.dispatch(BooksActions.get()).then((response) => {
            var CancelToken = mockedAxios.CancelToken
            var source = CancelToken.source()

            let expectedActions = [
                {
                    type: BOOKS.GET_REQUESTED,
                    payload: source
                },
                {
                    type: BOOKS.GET_FAILED,
                    payload: 'There was a problem requesting the data.'
                }
            ]

            expect(store.getActions()).toEqual(expectedActions)
            done()
        })
    })

})