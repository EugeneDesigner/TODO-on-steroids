import React, { Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'



export default class Header extends Component {
  constructor(props) {
    super(props)

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.handleKeyPress       = this.handleKeyPress.bind(this)
    this.changePlaceholder    = this.changePlaceholder.bind(this)
  }

  handleKeyPress(e) {

    if (e.key === 'Enter' && this.refs.addTodoInput.value !== '') {
      return this.props.addItem(
        this.refs.addTodoInput.value
      )
    }
  }

  changePlaceholder(e) {
    let text = document.getElementById('addTodoInput')
      if (e.type == 'focus') {
          text.placeholder = 'Here we go, yes!'
      } else if (e.type == 'blur') {
          text.placeholder = 'Its ok, think carefully'
      }

  }

  render() {
    return (
      <header className="todo__header">
      <h1>Do Today</h1>
      <input className="todo__new"
             ref="addTodoInput"
             id="addTodoInput"
             autoComplete="off"
             onFocus={this.changePlaceholder}
             onBlur={this.changePlaceholder}
             placeholder="Any tasks, boss?"
             onKeyPress = {this.handleKeyPress} />
      </header>
    )
  }

}
