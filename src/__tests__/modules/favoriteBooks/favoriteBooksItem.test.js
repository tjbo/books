import React from 'react'
import sinon from 'sinon'
import Adapter from 'enzyme-adapter-react-15'
import { shallow, mount } from 'enzyme'
import { configure } from 'enzyme'
import { cloneDeep } from 'lodash'
import FavoriteBooksItem from '../../../modules/favoriteBooks/favoriteBooksItem'
import favoriteBookData from '../../../__mocks__/modules/favoriteBooks/favoriteBook'

configure({ adapter: new Adapter() })

const defaultProps = {
    ...favoriteBookData,
    open: () => { },
    remove: () => { }
}

describe('books item component', () => {
    it('should render a book', () => {
        const wrapper = shallow(<FavoriteBooksItem { ...defaultProps } />)
        const children = wrapper.children()
        expect(children.find('Image')).toHaveLength(1)
        const mounted = mount(<FavoriteBooksItem { ...defaultProps } />)
        expect(mounted.find('.item')).toHaveLength(1)
    })

    it('simulates remove click event', () => {
        const onButtonClick = sinon.spy()
        let props = cloneDeep({ ...defaultProps, remove: onButtonClick })
        const wrapper = mount((
            <FavoriteBooksItem { ...props } />
        ))
        wrapper.find('button').simulate('click')
        expect(onButtonClick.calledOnce).toEqual(true)
    })

})