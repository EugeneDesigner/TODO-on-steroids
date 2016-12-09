import {combineReducers} from 'redux-immutable'
import reducer from './reducer'
import flashMessages from './flashMessages'

export default combineReducers({
  flashMessages,
  reducer
})
