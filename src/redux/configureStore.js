import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import DevTools from '../components/DevTools'
import {Map} from 'immutable'



export default function (initialState = Map()) {
  const store = createStore(rootReducer,  compose(
    applyMiddleware(thunk),
    DevTools.instrument()
    )
  )


  return store

}
