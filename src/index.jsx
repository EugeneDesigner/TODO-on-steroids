import React from 'react'
import { render } from 'react-dom'
import {List, Map} from 'immutable'
import {compose, createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers/reducer'
import { Router, browserHistory } from 'react-router'
import routes from './routes'



let initialState = window.__INITIAL_STATE__

// const createStoreDevTools = compose(
//   window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore)

const store = createStore(reducer, initialState)


store.dispatch({
  type: 'SET_STATE',
  state: {
    todos: [
      {id: 1, text: 'Shopping', status: 'active', editing: false},
      {id: 2, text: 'Go see Paul', status: 'active', editing: false},
      {id: 3, text: 'Finish work', status: 'active', editing: false},
    ],
  filter: 'all'
  }
})



render(
    <Provider store={store}>
    <Router routes={routes} history={browserHistory}/>
    </Provider>,
  document.getElementById('app')
)
