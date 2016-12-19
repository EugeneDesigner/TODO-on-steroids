import React, { Component, PropTypes } from 'react'
import {connect}                      from 'react-redux'
import DevTools                       from '../DevTools'
import {Link}                           from 'react-router'
import Container                      from './Container'
import {toJS}                           from 'Immutable'
import Transition                       from 'react-addons-css-transition-group'

export class MyPage extends Component {
  constructor(props) {
    super(props)
    this.getActive = this.getActive.bind(this)
  }

getActive() {
  if (this.props.todos) {
    return this.props.todos.filter(
      (item) => item.get('status') === 'active'
    )
  }
}





  render() {
    return (
      <Transition
        component="section"
        className="organizer"
        transitionName="form-animate"
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={600}
        >
          <h1 className="organizer__headline">Rank your tasks</h1>

        {this.getActive() ?
          <ul key="3" className="organizer__priorityList">
          {this.getActive().map(item =>
            <li>{item.get('text')}</li>
          )}
          </ul>

        : <ul className="organizer__priorityList"><li>Here your actual tasks will be displayed</li></ul>

      }

      <Container cards={this.getActive().toJS()}/>
    </Transition>


    )
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos.get('todos')
  }
}

const MyPageContainer = connect(mapStateToProps)(MyPage)
export default MyPageContainer
