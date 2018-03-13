import React from 'react'
import { Loader } from 'semantic-ui-react'

function LoadingIcon() {
    const styles = {
        position: 'absolute',
        transform: 'translate("-50%", "- 50%")',
        left: '50%',
        top: '50%'
    }


    return (
        <Loader style={ styles } active inline='centered' />
    )
}

export default class Loading extends React.Component {
    constructor() {
        super()
        this.state = { isShowing: false, timer: null }
    }

    componentDidMount() {
        // delays the loader from showing
        this.timer = setTimeout(() => {
            this.setState({ isShowing: true })
        }, 50)
    }

    componentWillUnmount() {
        clearTimeout(this.timer)
    }

    render() {
        if (this.state.isShowing === true) {
            return <div><LoadingIcon /></div>
        } else {
            return null
        }
    }
}