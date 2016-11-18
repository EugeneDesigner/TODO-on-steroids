import React, { Component } from 'react'
import cn from 'classnames'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import TextInput from './TextInput'

export default class TodoItem extends Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  render() {
    let itemClass= cn({
      'todo': true,
      'completed': this.props.isCompleted,
      'editing': this.props.isEditing
    })
    const { text, id, cancelEditing, doneEditing } = this.props
    return (
    <li className={itemClass}>
      <div className="view">
        <input type="checkbox"
               className="toggle"
               defaultChecked={this.props.isCompleted}
               onClick={() => this.props.toggleComplete(this.props.id)}/>
        <label htmlFor="todo"
               ref="text"
               onDoubleClick={() => this.props.editItem(this.props.id)}>
          {this.props.text}
        </label>
        <button className="destroy" onClick={() => this.props.deleteItem(this.props.id)}></button>
      </div>
      <TextInput text={text}
                 itemId = {id}
                 cancelEditing = {cancelEditing}
                 doneEditing = {doneEditing}/>
    </li>
  )
  }
};
