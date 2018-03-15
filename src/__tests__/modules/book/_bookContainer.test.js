import React from 'react'
import Adapter from 'enzyme-adapter-react-15'
import { configure } from 'enzyme'
import { shallow } from 'enzyme'
import { createMockStore } from 'redux-test-utils'
import BookContainer from '../../../modules/book/_bookContainer'
import book from '../../../__mocks__/modules/book/book'

configure({ adapter: new Adapter() })

const shallowWithStore = (component, store) => {
    const context = {
        store
    }
    return shallow(component, { context })
}

const ownProps = {
    match: {
        params: {
            id: 'someid1234'
        }
    }
}

const defaultState = {
    book: null,
    isLoading: false,
    id: '',
}

describe('book container', () => {
    it('should render isLoading', () => {
        const testState = {
            book: {
                ...defaultState,
                isLoading: true
            }
        }

        const store = createMockStore(testState)
        const component = shallowWithStore(<BookContainer { ...ownProps } />, store)

        expect(component.dive().find('Container')).toHaveLength(1)
        expect(component.dive().find('Button')).toHaveLength(1)
        expect(component.dive().find('Loading')).toHaveLength(1)
        expect(component.dive().find('Message')).toHaveLength(0)
        expect(component.dive().find('BooksItem')).toHaveLength(0)
    })

    it('should render a book', () => {
        const testState = {
            book: {
                ...defaultState,
                isLoading: false,
                book: book
            }
        }

        const store = createMockStore(testState)
        const component = shallowWithStore(<BookContainer { ...ownProps } />, store)

        expect(component.dive().find('Container')).toHaveLength(1)
        expect(component.dive().find('Button')).toHaveLength(1)
        expect(component.dive().find('Loading')).toHaveLength(0)
        expect(component.dive().find('Message')).toHaveLength(0)
        expect(component.dive().find('BooksItem')).toHaveLength(1)
    })

    it('should render an error', () => {
        const testState = {
            book: {
                ...defaultState,
                isLoading: false,
                error: 'some error thing'
            }
        }
        const store = createMockStore(testState)
        const component = shallowWithStore(<BookContainer { ...ownProps } />, store)

        expect(component.dive().find('Container')).toHaveLength(1)
        expect(component.dive().find('Button')).toHaveLength(1)
        expect(component.dive().find('Loading')).toHaveLength(0)
        expect(component.dive().find('Message')).toHaveLength(1)
        expect(component.dive().find('BooksItem')).toHaveLength(0)
    })
})