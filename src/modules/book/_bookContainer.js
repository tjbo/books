import React from 'react'
import { connect } from 'react-redux'
import { Button, Card, Image } from 'semantic-ui-react'
import BookActions from './_bookActions'
import FavoriteActions from '../favoriteBooks/_favoriteBooksActions'
import { push } from 'react-router-redux'
import Loading from '../../common/loading'

class BookContainer extends React.Component {
    componentWillMount() {
        this.props.get(this.props.id)
    }

    renderThumbnail() {
        const { volumeInfo } = this.props.book

        // some google API data doesn't have thumbnails, so we have to check for it
        if (volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail) {
            return (
                <Image
                    size='small'
                    src={ volumeInfo.imageLinks.thumbnail }
                    floated='left'
                />
            )
        }
    }

    renderBook() {
        if (this.props.isLoading) {
            return <Loading />
        } else if (this.props.book) {
            const { volumeInfo } = this.props.book
            return (
                <Card fluid>
                    <Card.Content>
                        { this.renderThumbnail() }
                        <div dangerouslySetInnerHTML={ { __html: volumeInfo.description } }></div>
                    </Card.Content>
                    <Card.Content>
                        <Card.Header>
                            { volumeInfo.title }
                        </Card.Header>
                        <Card.Meta>
                            { volumeInfo.authors && volumeInfo.authors.join(',') }
                        </Card.Meta>
                        <Card.Meta>
                            Published: { volumeInfo.publishedDate }
                        </Card.Meta>
                    </Card.Content>
                    <Card.Description>
                        <Button onClick={ () => this.props.add(this.props.book) }> Add </Button>
                        { volumeInfo.averageRating }
                    </Card.Description>
                </Card>
            )
        }
    }

    render() {
        return (
            <div>
                <Button onClick={ () => this.props.goBack() }>Go Back</Button>
                { this.renderBook() }
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    console.log(ownProps)
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