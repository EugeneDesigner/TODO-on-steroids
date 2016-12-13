import {combineReducers} from 'redux-immutable'
import todos from './todos'
import flashMessages from './flashMessages'
import filter from './filter'
import auth from './auth'

export default combineReducers({
  flashMessages,
  todos,
  filter,
  auth
})
