import React, { Component } from 'react'
import LoginForm from './LoginForm'
import Transition from 'react-addons-css-transition-group'


export default class LoginPage extends Component {
  render()  {
    return (
      <Transition
        component="section"
        transitionName="form-animate"
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={600}
        >
          <LoginForm key="2"/>
      </Transition>
    )
  }
}
