import React from 'react'
import { Link } from 'react-router'

export default class EntryRoute extends React.Component {
  render() {
    return (
      <div className="main-container">
        <nav>
            <span className="links-holder"><Link to="/register" className="navigation" activeStyle={{ fontWeight: 'bold'}}> <span className="register">Register</span></Link></span>
            <span className="links-holder"><Link to="/priorities" className="navigation" activeStyle={{ fontWeight: 'bold'}}> <span className="first">Rank Tasks</span> <span className="second">Rank now!</span></Link></span>
            <span className="links-holder"><Link to="/" className="navigation" activeStyle={{ fontWeight: 'bold' }}><span className="first">Set Tasks</span> <span className="second">Set now!</span></Link></span>

        </nav>
        {this.props.children}
      </div>
    )
  }

}
