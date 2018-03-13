import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'

export default function BooksItemSmall({ volumeInfo, id, open, add, remove, view }) {
    function handleImageLoaded() {
        console.log('loaded')
    }

    function renderThumbnail() {
        // some google API data doesn't have thumbnails, so we have to check for it
        if (volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail) {
            return (
                <Image
                    size='small'
                    src={ volumeInfo.imageLinks.thumbnail }
                    onLoad={ handleImageLoaded }
                />
            )
        }
    }

    return (
        <Card>
            <Card.Content>
                { renderThumbnail() }
            </Card.Content>
            <Card.Content>
                <Card.Header>
                    <div onClick={ open() }>{ volumeInfo.title }</div>
                </Card.Header>
                <Card.Meta>
                    { volumeInfo.authors && volumeInfo.authors.join(',') }
                </Card.Meta>
                <Card.Meta>
                    Published: { volumeInfo.publishedDate }
                </Card.Meta>
            </Card.Content>
            <Card.Description>
                <Button onClick={ add }> Add </Button>
                { volumeInfo.averageRating }
            </Card.Description>
        </Card>
    )
}