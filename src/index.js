import React from 'react'
import { render } from 'react-dom'
import {fromJS, Map, List} from 'immutable'
import configureStore from './redux/configureStore'
import {loadState, saveState} from './redux/localStorage'
import {Provider} from 'react-redux'
import { Router, browserHistory } from 'react-router'
import routes from './routes'
import './styles/index.scss'
import throttle from 'lodash/throttle'
import setAuthorizationToken from '../utils/setAuthorizationToken'
import jwtDecode from 'jwt-decode'
import {setCurrentUser} from './actions/loginActions'
import authenticate from '../utils/authenticate'


  const initialState = fromJS(window.__INITIAL_STATE__) || fromJS(loadState())
const store = configureStore(initialState)

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








store.subscribe(throttle(() => {
  saveState({
    todos: store.getState().todos.get('todos'),
    filter: 'all'
  })
}, 1000))

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken)
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)))

}






render(
    <Provider store={store}>
    <Router history={browserHistory}>
    {routes}
    </Router>
    </Provider>,
  document.getElementById('app')
)
