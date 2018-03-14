import React from 'react'
import BooksActions from '../../../modules/books/_booksActions'
import BOOKS from '../../../modules/books/_booksTypes'
import booksData from '../../../__mocks__/modules/books/books'

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
})

