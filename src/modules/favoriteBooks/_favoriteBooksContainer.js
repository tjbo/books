import React from 'react'
import { connect } from 'react-redux'
import { List, Container, Message } from 'semantic-ui-react'
import FavoriteBooksItem from './favoriteBooksItem'
import FavoritesActions from './_favoriteBooksActions'
import BookActions from '../book/_bookActions'
import Loading from '../../common/loading'

class FavoriteBooks extends React.Component {
    componentWillMount() {
        this.props.getAll()
    }

    renderFavouriteBooks() {
        return (
            Array.from(this.props.favorites).map(favorite => {
                return (
                    <FavoriteBooksItem
                        { ...favorite[1] }
                        open={ () => this.props.open.bind(this, favorite[1]) }
                        key={ favorite[0] }
                        remove={ () => this.props.remove(favorite[1]) }
                    />
                )
            })
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
            return <List.Item><Loading /></List.Item>
        } else {
            return (
                <List.Item>
                    <Message size="small" info>No favorites added.</Message>
                </List.Item>
            )
        }
    }

    renderList() {
        return (
            <List divided relaxed verticalAlign="middle">
                <List.Header>Favorites</List.Header>
                {
                    (this.props.favorites.size > 0 ? this.renderFavouriteBooks() : this.renderMessage())
                }
            </List>
        )
    }

    render() {
        return (
            <Container>
                { this.renderList() }
            </Container>
        )
    }
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
        getAll(payload) {
            dispatch(FavoritesActions.getAll())
        },
        open(payload) {
            dispatch(BookActions.open(payload))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteBooks)