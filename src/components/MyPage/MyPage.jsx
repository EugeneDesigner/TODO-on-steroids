import React, { Component, PropTypes } from 'react'
import {connect}                      from 'react-redux'
import DevTools                       from '../DevTools'
import {Link}                           from 'react-router'
import Container                      from './Container'
import {toJS}                           from 'Immutable'

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
    console.log(this.getActive().toJS())
    return (

      <section className="organizer">

          <h1 className="organizer__headline">Rank your tasks</h1>

        {this.getActive() ?
          <ul className="organizer__priorityList">
          {this.getActive().map(item =>
            <li>{item.get('text')}</li>
          )}
          </ul>

        : <ul className="organizer__priorityList"><li>Here your actual tasks will be displayed</li></ul>

      }

      <Container cards={this.getActive().toJS()}/>
    </section>


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
