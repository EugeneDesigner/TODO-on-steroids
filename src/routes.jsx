import React from 'react'
import {Route, IndexRedirect} from 'react-router'
import {TodoAppContainer} from './components/TodoApp'
import {isUserSignedIn}   from './redux/models/user'
import MyPageContainer from './components/MyPage'
import EntryRoute from './components/EntryRoute'
import LoginPage from './components/LoginPage'

function requireAuth(nextState, transition, cb) {
  setTimeOut(() => {
    if (!isUserSignedIn(store.getState())) {
      transition('/')
    }

    cb()
  }, 0)
}

const routes= (

  <Route path="/" component={EntryRoute}>

    <Route component={TodoAppContainer} path="/main" />
    <Route component={MyPageContainer} path="/priorities"/>
    <Route component={LoginPage} path="/login"/>
  </Route>
)

export default routes
