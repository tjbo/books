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
        store,
    };
    return shallow(component, { context });
}

describe('books container', () => {
    it("should render isLoading", () => {
        const testState = {
            books: {
                books: [],
                isLoading: true

            }
        }
        const store = createMockStore(testState)
        const component = shallowWithStore(<BooksContainer />, store);

        expect(typeof component).toBe('object')
        expect(component.dive().find('Segment')).toHaveLength(2)
        expect(component.dive().find('Search')).toHaveLength(1)
        expect(component.dive().find('Select')).toHaveLength(2)
        expect(component.dive().find('Container')).toHaveLength(3)
        expect(component.dive().find('Loading')).toHaveLength(1)
    })

    it("should render many books", () => {
        const testState = {
            books: {
                books: booksData.items,
                isLoading: false

            }
        }
        const store = createMockStore(testState)
        const component = shallowWithStore(<BooksContainer />, store);

        expect(typeof component).toBe('object')
        expect(component.dive().find('Segment')).toHaveLength(2)
        expect(component.dive().find('Search')).toHaveLength(1)
        expect(component.dive().find('Select')).toHaveLength(2)
        expect(component.dive().find('Container')).toHaveLength(4)
        expect(component.dive().find('Loading')).toHaveLength(0)
    })

})