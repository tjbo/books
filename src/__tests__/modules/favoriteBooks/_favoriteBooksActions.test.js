import configureMockStore from 'redux-mock-store'
import FavoriteBooksActions from '../../../modules/favoriteBooks/_favoriteBooksActions'
import FAVORITE_BOOKS from '../../../modules/favoriteBooks/_favoriteBooksTypes'
import bookData from '../../../__mocks__/modules/favoriteBooks/favoriteBook'
import MockAdapter from 'axios-mock-adapter'
import thunk from 'redux-thunk'
import axios from 'axios'

const mockStore = configureMockStore([thunk])

const initialState = {
    book: {
        isLoading: false,
        book: null,
        error: ''
    },
    router: {
        location: {
            hash: '#searchTerm=tao&orderBy=newest&view=list&favorites[]=4SeRLcKdG0YC'
        }
    }
}

describe('favorite books actions', () => {
    let store, mock

    beforeEach((function () {
        mock = new MockAdapter(axios)
        store = mockStore(initialState)
    }))

    it('should create an action to add', () => {
        const expectedAction = {
            type: FAVORITE_BOOKS.ADD,
            payload: bookData
        }
        expect(FavoriteBooksActions.add(bookData)).toEqual(expectedAction)
    })

    it('should create an action to remove', () => {
        const expectedAction = {
            type: FAVORITE_BOOKS.REMOVE,
            payload: bookData
        }
        expect(FavoriteBooksActions.remove(bookData)).toEqual(expectedAction)
    })

    it('the request resolves successfully and fires the action', (done) => {
        mock.onGet()
            .reply(() => {
                return new Promise((resolve, reject) => {
                    resolve([200, { ...bookData }])
                })
            })

        store.dispatch(FavoriteBooksActions.get()).then((response) => {
            let expectedActions = [
                {
                    type: FAVORITE_BOOKS.GET_REQUESTED
                },
                {
                    type: FAVORITE_BOOKS.ADD,
                    payload: bookData
                },
                {
                    type: FAVORITE_BOOKS.GET_SUCCEEDED,
                }
            ]

            expect(store.getActions()).toEqual(expectedActions)
            done()
        })
    })

    it('error should dispatch', (done) => {
        mock.onGet()
            .networkError()

        store.dispatch(FavoriteBooksActions.get()).then((response) => {
            let expectedActions = [
                {
                    type: FAVORITE_BOOKS.GET_REQUESTED
                },
                {
                    type: FAVORITE_BOOKS.GET_FAILED,
                    payload: 'There was a problem requesting the data.'
                }
            ]

            expect(store.getActions()).toEqual(expectedActions)
            done()
        })
    })
})