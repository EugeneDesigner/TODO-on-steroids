import React, { Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import TodoItem from './TodoItem'


export default class TodoList extends Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  getItems() {
      console.log(this.props)
    if (this.props.todos) {

      return this.props.todos.filter(
        (item) => this.props.filter === 'all' || item.get('status') === this.props.filter
      )
    }
  }

  isCompleted(item) {
    return item.get('status') === 'completed'
  }


  render() {
    console.log(this.props)
    return (
    <section className="todo__main">
      {this.getItems() ?
      <ul className="todo__main__list">
        {this.getItems().map(item =>
          <TodoItem key={item.get('id')}
                    text={item.get('text')}
                    id={item.get('id')}
                    isCompleted={this.isCompleted(item)}
                    isEditing={item.get('editing')}
                    doneEditing={this.props.doneEditing}
                    cancelEditing={this.props.cancelEditing}
                    toggleComplete={this.props.toggleComplete}
                    deleteItem={this.props.deleteItem}
                    editItem={this.props.editItem}/>
        )}
      </ul> : null}
    </section>
  )
  }
};
