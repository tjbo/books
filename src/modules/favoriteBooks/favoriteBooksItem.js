import React from 'react'
import { List, Image, Button } from 'semantic-ui-react'

export default function FavoriteBooksItem({ volumeInfo, remove }) {

    function renderThumbnail() {
        if (volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail) {
            return (
                <Image src={ volumeInfo.imageLinks.thumbnail } size="mini" />
            )
        }
    }

    return (
        <List.Item>
            { renderThumbnail() }
            <List.Content floated="right">
                <Button onClick={ remove } >Remove</Button>
            </List.Content>
            <List.Content>
                { volumeInfo.title }
            </List.Content>
        </List.Item>
    )
}