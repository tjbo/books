import React from 'react'
import PropTypes from 'prop-types'
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
                        onClick={ open }
                        style={ { cursor: 'pointer' } }
                    >
                        { volumeInfo.title }
                    </Header>
                </Card.Header>
            )
        }
    }

    function renderRemoveButton() {
        if (typeof remove === 'function') {
            return (
                <Button
                    onClick={ remove }
                    content="Remove"
                    color="red"
                    size="tiny"
                    floated="right"
                />
            )
        }
    }

    return (
        <List.Item>
            <Card fluid>
                <Card.Content>
                    { renderThumbnail() }
                    { renderRemoveButton() }
                </Card.Content>
                <Card.Content>
                    { renderTitle() }
                </Card.Content>
            </Card>
        </List.Item >
    )
}

FavoriteBooksItem.propTypes = {
    open: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    volumeInfo: PropTypes.object.isRequired
}