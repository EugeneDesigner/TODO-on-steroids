import React from 'react'
import { Route, IndexRedirect, IndexRoute } from 'react-router'
import { TodoAppContainer } from './components/TodoApp'
import { isUserSignedIn }  from './redux/models/user'
import MyPageContainer from './components/MyPage'
import EntryRoute from './components/EntryRoute'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import Register from './components/Register'
import authenticate from '../utils/authenticate'


const routes= (

  <Route path="/" component={EntryRoute}>

    <IndexRoute component={TodoAppContainer} />
    <Route component={MyPageContainer} path="/priorities"/>
    <Route component={Register} path='/register'>
      <IndexRedirect to="signup" />
      <Route component={LoginPage} path="login"/>
      <Route component={SignupPage} path="signup"/>
    </Route>
  </Route>
)

export default routes
