import React from 'react'
import Adapter from 'enzyme-adapter-react-15'
import { configure } from 'enzyme'
import { shallow } from 'enzyme'
import { createMockStore } from 'redux-test-utils'
import FavoriteBooksContainer from '../../../modules/favoriteBooks/_favoriteBooksContainer'
import books from '../../../__mocks__/modules/books/books'

configure({ adapter: new Adapter() })

const shallowWithStore = (component, store) => {
    const context = {
        store
    }
    return shallow(component, { context })
}

const defaultState = {
    favorites: new Map(),
    error: '',
    isLoading: false
}

describe('favorite books container', () => {
    it('should render isLoading', () => {
        const testState = {
            favoriteBooks: {
                ...defaultState,
                isLoading: true
            }
        }

        const store = createMockStore(testState)
        const component = shallowWithStore(<FavoriteBooksContainer />, store)

        expect(component.dive().find('Container')).toHaveLength(1)
        expect(component.dive().find('Loading')).toHaveLength(1)
        expect(component.dive().find('Message')).toHaveLength(0)
        expect(component.dive().find('FavoriteBooksItem')).toHaveLength(0)
    })

    it('should render a favorite', () => {
        const testState = {
            favoriteBooks: {
                ...defaultState,
                isLoading: false,
                favorites: new Map(books.items.map((i) => [i.id, i]))
            }
        }

        const store = createMockStore(testState)
        const component = shallowWithStore(<FavoriteBooksContainer />, store)

        expect(component.dive().find('Container')).toHaveLength(1)
        expect(component.dive().find('Loading')).toHaveLength(0)
        expect(component.dive().find('Message')).toHaveLength(0)
        expect(component.dive().find('FavoriteBooksItem')).toHaveLength(10)
    })

    it('should no favorites', () => {
        const testState = {
            favoriteBooks: {
                ...defaultState
            }
        }

        const store = createMockStore(testState)
        const component = shallowWithStore(<FavoriteBooksContainer />, store)

        expect(component.dive().find('Container')).toHaveLength(1)
        expect(component.dive().find('Loading')).toHaveLength(0)
        expect(component.dive().find('Message')).toHaveLength(1)
        expect(component.dive().find('FavoriteBooksItem')).toHaveLength(0)
    })

    it('should render an error', () => {
        const testState = {
            favoriteBooks: {
                ...defaultState,
                isLoading: false,
                error: 'some error thing'
            }
        }
        const store = createMockStore(testState)
        const component = shallowWithStore(<FavoriteBooksContainer />, store)

        expect(component.dive().find('Container')).toHaveLength(1)
        expect(component.dive().find('Loading')).toHaveLength(0)
        expect(component.dive().find('Message')).toHaveLength(1)
        expect(component.dive().find('BooksItem')).toHaveLength(0)
    })
})