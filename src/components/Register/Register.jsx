import React, { Component } from 'react'
import { Link} from 'react-router'


export default class Register extends Component {
  render() {

    return (
      <div className="input-form">
        <div className="input-form__links">
          <Link to="/register/signup" activeStyle={{ backgroundColor: '#c41e5a'}} >Sign Up</Link>
          <Link to="/register/login" activeStyle={{ backgroundColor: '#c41e5a'}}>Log In</Link>
        </div>
      {this.props.children}

      </div>
    )
  }
}
