import React from 'react'
import PropTypes from 'prop-types'
import Loadable from 'react-loadable'
import Loading from '../src/common/loading'

const PageLoading = (props) => {
    if (props === props.pastDelay) {
        return (
            <div style={ { position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 } }>
                <Loading />
            </div>
        )
    } else {
        return null
    }
}

PageLoading.propTypes = {
    pastDelay: PropTypes.bool.isRequired
}

function moduleChunker(options) {
    return Loadable({
        delay: 1,
        loading: PageLoading,
        ...options,
    })
}

const Modules = {
    Book: moduleChunker({
        loader: () => import('./modules/book/_bookContainer')
    }),
    Books: moduleChunker({
        loader: () => import('./modules/books/_booksContainer')
    }),
    FavoriteBooks: moduleChunker({
        loader: () => import('./modules/favoriteBooks/_favoriteBooksContainer')
    })
}

export { Modules as default }
