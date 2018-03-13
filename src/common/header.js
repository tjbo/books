import React from 'react'
import { Container, Menu } from 'semantic-ui-react'

const Header = () => {
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu inverted>
                    <Menu.Item>
                        MyFavBooks.com
                    </Menu.Item>
                </Menu>
            </Container>
        </Menu>
    )
}

export { Header as default }