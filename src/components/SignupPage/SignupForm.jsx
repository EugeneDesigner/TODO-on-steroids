import React, {Component, PropTypes } from 'react'
import classnames from 'classnames'
import validateInput from '../../../shared/validations/signup'
import TextFieldGroup from '../../common/TextFieldGroup'



export default class SignupForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: {},
      isLoading: false
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

onChange(e) {
  this.setState({
    [e.target.name]: e.target.value
  })
}

isValid() {
  const { errors, isValid } = validateInput(this.state)

  if (!isValid ) {
    this.setState({ errors })
  }

  return isValid
}
onSubmit(e) {
  e.preventDefault()
  this.setState({ errors: {}, isLoading: true })


  if (this.isValid()) {
    this.props.userSignupRequest(this.state).then(
      () => {
        this.props.addFlashMessage({
          type: 'success',
          text: 'You signed up successfully'
        })
        this.context.router.push('/')
      },
      ({ data }) => this.setState({ errors: data, isLoading: false })
    )

  }
}

render() {
      const { errors } = this.state
  return (
    <form onSubmit={this.onSubmit}>
      <TextFieldGroup
        error = {errors.username}
        label = "Username"
        onChange = {this.onChange}
        value = {this.state.username}
        field = "username"
        />
      <TextFieldGroup
        error = {errors.email}
        label = "Email"
        onChange = {this.onChange}
        value = {this.state.email}
        field = "email"
        type = "email"
        />
        <TextFieldGroup
          error = {errors.password}
          label = "Password"
          onChange = {this.onChange}
          value = {this.state.password}
          field = "password"
          type = "password"
          />
        <TextFieldGroup
          error = {errors.passwordConfirmation}
          label = "Password Confirmation"
          onChange = {this.onChange}
          value = {this.state.passwordConfirmation}
          field = "passwordConfirmation"
          type = "password"
          />


      <div className="form__group">
        <button disabled={this.state.isLoading} className="form__button" type="submit">Sign up </button>
      </div>




    </form>
  )
}
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
}

SignupForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}
