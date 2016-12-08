import React, { Component } from 'react'



export default class LoginForm extends Component {
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

  onSubmit(e) {
    e.preventDefault()
  }

  onChange(e) {
    this.setState({ [e.target.name]:  e.target.value })
  }


  render() {
    const {errors, identifier, password, isLoading } = this.state
    return (
      <form onSumbit={this.onSubmit}>
        <h1>Login</h1>
        <TextFieldGroup
          field="identifier"
          label="Username / Email"
          value={identifier}
          error={errors.identifier}
          onChange={this.onChange}
          />

          <TextFieldGroup
            field="password"
            label="password"
            value={password}
            error={errors.password}
            onChange={this.onChange}
            type="password"
            />
          <div><button disabled={isLoading}>Login</button></div>
      </form>
    )
  }
}
