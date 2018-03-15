import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Button, Container } from 'semantic-ui-react'
import BookActions from './_bookActions'
import BooksItem from '../books/booksItem'
import FavoriteActions from '../favoriteBooks/_favoriteBooksActions'
import Loading from '../../common/loading'

class BookContainer extends React.Component {
    componentDidMount() {
        this.props.get(this.props.id)
    }

    componentWillUpdate(nextProps) {
        if (nextProps.id !== this.props.id) {
            this.props.get(nextProps.id)
        }
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
                <Button
                    labelPosition="left"
                    icon="left chevron"
                    content="Back"
                    color="blue"
                    onClick={ () => this.props.goBack() }
                />
                { this.renderBook() }
            </Container>
        )
    }
}

BookContainer.propTypes = {
    add: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired,
    get: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
}

function mapStateToProps(state, ownProps) {
    return {
        book: state.book.book,
        isLoading: state.book.isLoading,
        id: ownProps.match.params.id // the id here is coming from the router
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