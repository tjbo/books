import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { List, Container, Message } from 'semantic-ui-react'
import FavoriteBooksItem from './favoriteBooksItem'
import FavoritesActions from './_favoriteBooksActions'
import BookActions from '../book/_bookActions'
import Loading from '../../common/loading'

class FavoriteBooksContainer extends React.Component {
    componentWillMount() {
        this.props.get()
    }

    renderFavorite(favorite) {
        const props = {
            ...favorite[1],
            key: favorite[0],
            open: () => this.props.open(favorite[1]),
            remove: () => this.props.remove(favorite[1])
        }
        return <FavoriteBooksItem { ...props } />
    }

    renderFavorites() {
        return (
            Array.from(this.props.favorites).map(favorite => this.renderFavorite(favorite))
        )
    }

    renderMessage() {
        if (this.props.error) {
            return (
                <List.Item>
                    <Message negative>{ this.props.error }</Message>
                </List.Item>
            )
        } else if (this.props.isLoading) {
            return (
                <List.Item>
                    <Loading />
                </List.Item>
            )
        } else {
            return (
                <List.Item>
                    <Message size="small" info>No favorites added.</Message>
                </List.Item>
            )
        }
    }

    render() {
        return (
            <Container>
                <List divided relaxed verticalAlign="middle">
                    <List.Header>Favorites</List.Header>
                    {
                        (this.props.favorites.size > 0 ? this.renderFavorites() : this.renderMessage())
                    }
                </List>
            </Container>
        )
    }
}

FavoriteBooksContainer.propTypes = {
    error: PropTypes.string,
    favorites: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    get: PropTypes.func.isRequired,
    open: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired

}

function mapStateToProps(state) {
    return {
        favorites: state.favoriteBooks.favorites,
        error: state.favoriteBooks.error,
        isLoading: state.favoriteBooks.isLoading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        remove(payload) {
            dispatch(FavoritesActions.remove(payload))
        },
        get(payload) {
            dispatch(FavoritesActions.get())
        },
        open(payload) {
            dispatch(BookActions.open(payload))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteBooksContainer)