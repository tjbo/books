import React from 'react'
import { compose, createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { Container, Grid, Rail, Segment } from 'semantic-ui-react'
import queryString from 'query-string'
import Header from './common/header'

// source
import Modules from './modules'
import Reducer from './reducer'

// history for the router
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
// as well as intercepting and dispathcing async actions
let middleware = [thunkMiddleware, routerMiddleware(history)]

// if we are in development, this logs redux actions/state into the console
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger)
}

// create the store, and add the middleware
const store = createStore(
    combineReducers({
        ...Reducer,
        router: routerReducer
    }),
    compose(
        applyMiddleware(...middleware),
        window.devToolsExtension ? window.devToolsExtension() : (f) => f,
    )
)

// this updates the url hash after any state change
store.subscribe(() => {
    const state = store.getState()
    const { orderBy, searchTerm, view } = state.books
    let favorites = Array.from(state.favoriteBooks.favorites).map(favorite => favorite[0])
    favorites = queryString.stringify({ favorites }, { arrayFormat: 'bracket' })
    window.location.hash = `searchTerm=${searchTerm}&orderBy=${orderBy}&view=${view}&${favorites}`
})

export default function App() {
    return (
        <Provider store={ store }>
            <ConnectedRouter history={ history }>
                <Container style={ { height: '100%' } } >
                    <Header />
                    <Grid centered relaxed columns={ 2 } style={ { height: '100%' } }>
                        <Grid.Row style={ { height: '100%' } }>
                            <Grid.Column width={ 10 } style={ { marginTop: '3em' } }>
                                <Switch>
                                    <Route exact path="/" component={ Modules.Books } />
                                    <Route exact path="/book/:id" component={ Modules.Book } />
                                </Switch>
                            </Grid.Column>
                            <Grid.Column width={ 6 } style={ { marginTop: '3em' } }>
                                <Modules.FavoriteBooks />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </ConnectedRouter>
        </Provider>
    )
}