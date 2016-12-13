import React from 'react'
import { Route, IndexRedirect } from 'react-router'
import { TodoAppContainer } from './components/TodoApp'
import { isUserSignedIn }  from './redux/models/user'
import MyPageContainer from './components/MyPage'
import EntryRoute from './components/EntryRoute'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import authenticate from '../utils/authenticate'


const routes= (

  <Route path="/" component={EntryRoute}>

    <Route component={TodoAppContainer} path="/main" />
    <Route component={authenticate(MyPageContainer)} path="/priorities"/>
    <Route component={LoginPage} path="/login"/>
    <Route component={SignupPage} path="/signup"/>
  </Route>
)

export default routes
