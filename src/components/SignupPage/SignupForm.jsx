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
      isLoading: false,
      invalid: false
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.checkUserExists = this.checkUserExists.bind(this)
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


checkUserExists(e) {
  const field = e.target.name,
        val = e.target.value;
  if (val !== '') {
    this.props.isUserExists(val).then(res => {
        if (res.data.user) {
          erros[field] = 'There is user with such ' + field
          let invalid = true
        } else {
          errors[field] = ''
          invalid = false
        }
        this.setState({ errors, invalid })
    })
  }

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
        this.context.router.push('/main')
      },
      ({ error }) => this.setState({ errors: error.response.data, isLoading: false })
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
        checkUserExists = {this.checkUserExists}
        value = {this.state.username}
        field = "username"
        />
      <TextFieldGroup
        error = {errors.email}
        label = "Email"
        onChange = {this.onChange}
        checkUserExists = {this.checkUserExists}
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
        <button disabled={this.state.isLoading || this.state.invalid} className="form__button" type="submit">Sign up </button>
      </div>




    </form>
  )
}
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  isUserExists: PropTypes.func.isRequired
}

SignupForm.contextTypes = {
  router: PropTypes.object.isRequired
}
