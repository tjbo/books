import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'

export default function BooksItemLarge({ volumeInfo, id, open, add, remove, view }) {
    function handleImageLoaded() {
        console.log('loaded')
    }

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
                    onLoad={ handleImageLoaded }
                    floated="left"
                />
            )
        }
    }

    function renderDescription() {
        if (volumeInfo.description) {
            return (
                <Card.Content>
                    <div dangerouslySetInnerHTML={ { __html: volumeInfo.description } }></div>
                </Card.Content>
            )
        }
    }
    function renderTitle() {
        if (volumeInfo.title) {
            return (
                <Card.Header>
                    <div onClick={ open() } style={ { color: 'blue' } }>{ volumeInfo.title }</div>
                </Card.Header>
            )
        }
    }

    return (
        <Card>
            <Card.Content>
                { renderThumbnail() }
                { renderDescription() }
            </Card.Content>
            <Card.Content>
                { renderTitle() }
                <Card.Meta>
                    { volumeInfo.authors && volumeInfo.authors.join(',') }
                </Card.Meta>
                <Card.Meta>
                    Published: { volumeInfo.publishedDate }
                </Card.Meta>
                { renderPreviewLink() }
            </Card.Content>
            <Card.Description>
                <Button onClick={ add }> Add </Button>
                { volumeInfo.averageRating }
            </Card.Description>
        </Card>
    )
}