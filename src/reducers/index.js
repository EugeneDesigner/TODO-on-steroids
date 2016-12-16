import {combineReducers} from 'redux'
import todos from './todos'
import flashMessages from './flashMessages'
import auth from './auth'

export default combineReducers({
  flashMessages,
  todos,
  auth
})
