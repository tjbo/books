import React from 'react'
import { List, Image, Button } from 'semantic-ui-react'

export default function FavoriteBooksItem({ volumeInfo, remove }) {
    return (
        <List.Item>
            <Image src={ volumeInfo.imageLinks.thumbnail } size="mini" />
            { volumeInfo.title }
            <List.Content floated="right">
                <Button onClick={ remove } >Remove</Button>
            </List.Content>
        </List.Item>
    )
}