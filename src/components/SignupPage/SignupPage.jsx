import React, { Component, PropTypes } from 'react'
import SignupForm from './SignupForm'
import { connect } from 'react-redux'
import { userSignupRequest, isUserExists } from '../../actions/signupActions'
import { addFlashMessage } from '../../actions/flashMessages'
import Transition from 'react-addons-css-transition-group'

class SignupPage extends Component {
render() {

  const { userSignupRequest, addFlashMessage, isUserExists } = this.props
  return (
    <Transition
      component="section"
      transitionName="form-animate"
      transitionAppear={true}
      transitionAppearTimeout={600}

      >
      <SignupForm userSignupRequest={userSignupRequest} addFlashMessage={addFlashMessage} isUserExists={isUserExists}  key="1"/>
    </Transition>
  )
}
}

SignupPage.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  isUserExists: PropTypes.func.isRequired
}

export default connect(null, { userSignupRequest, addFlashMessage, isUserExists } )(SignupPage)
