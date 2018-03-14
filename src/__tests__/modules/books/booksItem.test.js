import React from 'react'
import sinon from 'sinon'
import Adapter from 'enzyme-adapter-react-15'
import { shallow, mount } from 'enzyme'
import { configure } from 'enzyme'
import { cloneDeep } from 'lodash'
import BooksItem from '../../../modules/books/booksItem'
import book from '../../../__mocks__/modules/book/book'

configure({ adapter: new Adapter() })

const defaultProps = {
    ...book,
    open: null,
    size: '',
    add: null
}

describe('books item component', () => {
    it('should render compact', () => {
        const wrapper = shallow(<BooksItem { ...defaultProps } />)
        const children = wrapper.children()
        expect(children.find('Header')).toHaveLength(1)
        expect(children.find('Image')).toHaveLength(1)
        expect(children.find('div')).toHaveLength(0)
    })

    it('should render full', () => {
        let props = cloneDeep({ ...defaultProps, size: 'full' })
        const wrapper = shallow(<BooksItem { ...props } />)
        const children = wrapper.children()
        expect(children.find('Header')).toHaveLength(1)
        expect(children.find('Image')).toHaveLength(1)
        expect(children.find('div')).toHaveLength(1)
    })

    it('simulates add click event', () => {
        const onButtonClick = sinon.spy()
        let props = cloneDeep({ ...defaultProps, add: onButtonClick })
        const wrapper = mount((
            <BooksItem { ...props } />
        ))
        wrapper.find('button').simulate('click');
        expect(onButtonClick.calledOnce).toEqual(true)
    })

    it('simulates open click event', () => {
        const onButtonClick = sinon.spy()
        let props = cloneDeep({ ...defaultProps, open: onButtonClick })
        const wrapper = mount((
            <BooksItem { ...props } />
        ))
        wrapper.find('Header').simulate('click');
        expect(onButtonClick.calledOnce).toEqual(true)
    })
})