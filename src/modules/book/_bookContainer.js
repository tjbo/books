import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Button, Container } from 'semantic-ui-react'
import BookActions from './_bookActions'
import FavoriteActions from '../favoriteBooks/_favoriteBooksActions'
import BooksItem from '../books/booksItem'
import Loading from '../../common/loading'

class BookContainer extends React.Component {
    componentWillMount() {
        this.props.get(this.props.id)
    }

    renderBook() {
        if (this.props.isLoading) {
            return <Loading />
        } else if (this.props.book) {
            const props = {
                ...this.props.book,
                add: () => this.props.add(this.props.book),
                size: 'full'
            }
            return <BooksItem { ...props } />
        }
    }

    render() {
        return (
            <Container>
                <Button onClick={ () => this.props.goBack() }>Go Back</Button>
                { this.renderBook() }
            </Container>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        book: state.book.book,
        isLoading: state.book.isLoading,
        id: ownProps.match.params.id
    }
}

function mapDispatchToProps(dispatch) {
    return {
        get(payload) {
            dispatch(BookActions.get(payload))
        },
        add(payload) {
            dispatch(FavoriteActions.add(payload))
        },
        goBack() {
            dispatch(push('/'))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookContainer)