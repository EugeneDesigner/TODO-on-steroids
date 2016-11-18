import React from 'react'
import ReactDOM from 'react-dom'
import {List, Map} from 'immutable'
import {compose, createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers/reducer'
import {TodoAppContainer} from './components/TodoApp'
import './index.css'


const createStoreDevTools = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore)

const store = createStoreDevTools(reducer)

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


ReactDOM.render(
  <Provider store={store}>
    <TodoAppContainer />
  </Provider>,
  document.getElementById('app')
)
