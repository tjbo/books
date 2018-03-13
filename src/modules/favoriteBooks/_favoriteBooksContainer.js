import React from 'react'
import { connect } from 'react-redux'
import { List, Sticky } from 'semantic-ui-react'
import FavoriteBooksItem from './favoriteBooksItem'
import FavoritesActions from './_favoriteBooksActions'

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
                        remove={ () => this.props.remove(favorite[1]) }
                    />
                )
            })
        )
    }

    renderDefaultMessage() {
        return <List.Item>Nothing to display</List.Item>
    }

    renderList() {
        if (this.props.error) {
            return <div>{ this.props.error }</div>
        } else if (this.props.isLoading) {
            return <div>Loading</div>
        } else {
            return (
                <List divided relaxed verticalAlign="middle">
                    <List.Header>My Fav Books</List.Header>
                    {
                        (this.props.favorites.size > 0 ? this.renderFavouriteBooks() : this.renderDefaultMessage())
                    }
                </List>
            )
        }
    }

    render() {
        return (
            <div style={ { position: 'fixed', top: 0 } }>
                { this.renderList() }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        favorites: state.favoriteBooks.favorites,
        error: state.favoriteBooks.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        remove(payload) {
            dispatch(FavoritesActions.remove(payload))
        },
        getAll(payload) {
            dispatch(FavoritesActions.getAll())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteBooks)