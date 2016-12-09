import React, {Component} from 'react'
import SignupForm from './SignupForm'
import { connect } from 'react-redux'
import { userSignupRequest } from '../../actions/signupActions'
import { addFlashMessage } from '../../actions/flashMessages'

class SignupPage extends Component {
render() {
  const {userSignupRequest, addFlashMessage } = this.props
  return (
    <div className="signup">
        <div>
          <h1>Sign Up</h1>
          <SignupForm userSignupRequest={userSignupRequest} addFlashMessage={addFlashMessage}/>
        </div>
    </div>
  )
}
}

SignupPage.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
}

export default connect((state) => { return {} }, {userSignupRequest} )(SignupPage)
