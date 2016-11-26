import React, { Component } from 'react'
import TodoList from './TodoList'
import TodoHeader from './TodoHeader'
import TodoTools from './TodoTools'
import {Footer} from './Footer'
import {connect} from 'react-redux'

import * as actionCreators from '../actions/action_creators'

export default class TodoApp extends Component {
  constructor(props) {
    super(props)
    this.getActiveItems = this.getActiveItems.bind(this)
  }

  getActiveItems() {
    if (this.props.todos) {
      const activeItems = this.props.todos.filter(
        (item) => item.get('status') === 'active'
      )
      return activeItems.size
    }
    return 0
  }


  render() {
    return (
      <div>
        <section className="todoapp">
          <TodoHeader addItem = {this.props.addItem}/>
          <TodoList {...this.props}/>
          <TodoTools  changeFilter={this.props.changeFilter}
                      filter={this.props.filter}
                      getActiveItems={this.getActiveItems()}
                      clearCompleted={this.props.clearCompleted}/>
        </section>
        <Footer/>
      </div>
    )
  }

}


function mapStateToProps(state) {
  return {
    todos: state.get('todos'),
    filter: state.get('filter')
  }
}

export const TodoAppContainer = connect(mapStateToProps, actionCreators)(TodoApp)
