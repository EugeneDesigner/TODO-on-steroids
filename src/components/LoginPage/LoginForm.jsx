import React, { Component, PropTypes } from 'react'
import TextFieldGroup from '../../common/TextFieldGroup'
import validateInput from '../../../shared/validations/login'
import {connect} from 'react-redux'
import { login } from '../../actions/loginActions'

class LoginForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state)

    if (!isValid) {
      this.setState({ errors })
    }

    return isValid
  }

  onSubmit(e) {
    e.preventDefault()
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true })
      this.props.login(this.state).then(
        (res) => this.context.router.push('/main'),
        (err) => this.setState({ errors: err.response.data.errors, isLoading: false})
      )
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]:  e.target.value })
  }


  render() {
    const {errors, identifier, password, isLoading } = this.state
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Login</h1>

        { errors.form && <div className="alert__danger">{errors.form}</div>}
        <TextFieldGroup
          field="identifier"
          value={identifier}
          error={errors.identifier}
          onChange={this.onChange}
          placeholder='Username/Email'
          />



          <TextFieldGroup
            field="password"
            value={password}
            error={errors.password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
            />
          <div className="form__button"><button disabled={isLoading} type="submit">Login</button></div>
      </form>
    )
  }
}

LoginForm.propTypes = {
  login:  PropTypes.func.isRequired
}

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired
}

export default connect(null, { login })(LoginForm)
