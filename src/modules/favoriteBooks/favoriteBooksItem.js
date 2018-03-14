import React from 'react'
import { Card, List, Image, Button } from 'semantic-ui-react'

export default function FavoriteBooksItem({ volumeInfo, remove }) {

    function renderThumbnail() {
        if (volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail) {
            return (
                <Image src={ volumeInfo.imageLinks.thumbnail } size="mini" floated="left" />
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
                    { volumeInfo.title }
                </Card.Content>
            </Card>
        </List.Item >
    )
}