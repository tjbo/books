import React from 'react'
import { Card, Header, List, Image, Button } from 'semantic-ui-react'

export default function FavoriteBooksItem({ volumeInfo, remove, open }) {

    function renderThumbnail() {
        if (volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail) {
            return (
                <Image src={ volumeInfo.imageLinks.thumbnail } size="mini" floated="left" />
            )
        }
    }

    function renderTitle() {
        if (volumeInfo.title) {
            return (
                <Card.Header>
                    <Header
                        as="h5"
                        color="blue"
                        onClick={ open() }
                        style={ { cursor: 'pointer' } }
                    >
                        { volumeInfo.title }
                    </Header>
                </Card.Header>
            )
        }
    }

    return (
        <List.Item>
            <Card fluid>
                <Card.Content>
                    { renderThumbnail() }
                    <Button
                        onClick={ remove }
                        color="red"
                        size="tiny"
                        floated="right"
                    >
                        Remove
                </Button>
                </Card.Content>
                <Card.Content>
                    { renderTitle() }
                </Card.Content>
            </Card>
        </List.Item >
    )
}