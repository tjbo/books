import React from 'react'
import Adapter from 'enzyme-adapter-react-15'
import { configure } from 'enzyme'
import { shallow } from 'enzyme'
import { createMockStore } from 'redux-test-utils'
import BooksContainer from '../../../modules/books/_booksContainer'
import booksData from '../../../__mocks__/modules/books/books'

configure({ adapter: new Adapter() })

const shallowWithStore = (component, store) => {
    const context = {
        store
    }
    return shallow(component, { context })
}

const defaultState = {
    books: [],
    error: '',
    isLoading: false,
    view: 'list',
    orderBy: 'asc',
    searchTerm: ''
}

describe('books container', () => {
    it('should render isLoading', () => {
        const testState = {
            books: {
                ...defaultState,
                isLoading: true
            }
        }

        const store = createMockStore(testState)
        const component = shallowWithStore(<BooksContainer />, store)

        expect(typeof component).toBe('object')
        expect(component.dive().find('Segment')).toHaveLength(2)
        expect(component.dive().find('Search')).toHaveLength(1)
        expect(component.dive().find('Select')).toHaveLength(2)
        expect(component.dive().find('Container')).toHaveLength(3)
        expect(component.dive().find('Loading')).toHaveLength(1)
    })

    it('should render many books', () => {
        const testState = {
            books: {
                ...defaultState,
                books: booksData.items
            }
        }
        const store = createMockStore(testState)

        const component = shallowWithStore(<BooksContainer />, store)

        expect(component.dive().find('Segment')).toHaveLength(2)
        expect(component.dive().find('Search')).toHaveLength(1)
        expect(component.dive().find('Select')).toHaveLength(2)
        expect(component.dive().find('Container')).toHaveLength(4)
        expect(component.dive().find('Loading')).toHaveLength(0)
        expect(component.dive().find('BooksItem')).toHaveLength(10)
    })

})