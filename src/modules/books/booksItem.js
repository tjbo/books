import React from 'react'
import { Button, Card, Image, Header } from 'semantic-ui-react'

export default function BooksItemLarge({ volumeInfo, open, add, size = 'compact' }) {
    function renderPreviewLink() {
        if (volumeInfo.previewLink) {
            return (
                <Card.Content>
                    <a href={ volumeInfo.previewLink } target="_blank">Preview</a>
                </Card.Content>
            )
        }
    }

    function renderThumbnail() {
        if (volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail) {
            return (
                <Image
                    size="small"
                    src={ volumeInfo.imageLinks.thumbnail }
                    floated="left"
                />
            )
        }
    }

    function renderDescription() {
        if (volumeInfo.description && size === 'full') {
            return (
                <Card.Content>
                    <div dangerouslySetInnerHTML={ { __html: volumeInfo.description } }></div>
                </Card.Content>
            )
        }
    }

    function renderTitle() {
        if (volumeInfo.title && typeof open === 'function') {
            return (
                <Card.Header>
                    <Header
                        as="h3"
                        color="blue"
                        onClick={ open() }
                        style={ { cursor: 'pointer' } }
                    >
                        { volumeInfo.title }
                    </Header>
                </Card.Header>
            )
        } else {
            return (
                <Card.Header>
                    <Header as="h3">{ volumeInfo.title }</Header>
                </Card.Header>
            )
        }
    }

    function renderRating() {
        if (volumeInfo.averageRating) {
            return (
                <Card.Meta>
                    Avg Rating: { volumeInfo.averageRating }
                </Card.Meta>
            )
        }
    }

    function renderAuthors() {
        if (volumeInfo.authors) {
            return (
                <Card.Meta>
                    { volumeInfo.authors && volumeInfo.authors.join(',') }
                </Card.Meta>
            )
        }
    }

    function renderDate() {
        if (volumeInfo.publishedDate) {
            return (
                <Card.Meta>
                    Published: { volumeInfo.publishedDate }
                </Card.Meta>
            )
        }
    }

    return (
        <Card fluid>
            <Card.Content>
                { renderThumbnail() }
                { renderDescription() }
            </Card.Content>
            <Card.Content>
                { renderTitle() }
                { renderAuthors() }
                { renderDate() }
                { renderRating() }
                { renderPreviewLink() }
            </Card.Content>
            <Card.Description>
                <Button onClick={ add }
                    floated={ (size === 'full' ? 'right' : 'left') }
                    color="green"
                    style={ { margin: '15px' } }
                >
                    Add
                </Button>
            </Card.Description>
        </Card >
    )
}