import React, { Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'



export default class Header extends Component {
  constructor(props) {
    super(props)

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.handleKeyPress       = this.handleKeyPress.bind(this)
  }

  handleKeyPress(e) {
    if (e.key === 'Enter' && this.refs.addTodoInput.value !== '') {
      return this.props.addItem(
        this.refs.addTodoInput.value
      )
    }
  }

  render() {
    return (
      <header className="todo__header">
      <h1>Stuff to do</h1>
      <input className="todo__new"
             ref="addTodoInput"
             autoFocus
             autoComplete="off"
             placeholder="What needs to be done?"
             onKeyPress = {this.handleKeyPress} />
      </header>
    )
  }

}
