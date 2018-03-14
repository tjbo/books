import React from 'react'
import FavoriteBooksActions from '../../../modules/favoriteBooks/_favoriteBooksActions'
import FAVORITE_BOOKS from '../../../modules/favoriteBooks/_favoriteBooksTypes'
import bookData from '../../../__mocks__/modules/favoriteBooks/favoriteBook'

describe('favorite books actions', () => {
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
})

