import React, { Component }           from 'react'
import TodoList                       from './TodoList'
import TodoHeader                     from './TodoHeader'
import TodoTools                      from './TodoTools'
import {Footer}                       from './Footer'
import {connect}                      from 'react-redux'
import DevTools                       from './DevTools'
import Background                     from './Background'
import * as actionCreators            from '../actions/action_creators'
import { Link }                       from 'react-router'
import { fromJS }                     from 'Immutable'

export class TodoApp extends Component {
  constructor(props) {
    super(props)
    this.getActiveItems = this.getActiveItems.bind(this)
    this.changeDrawing = this.changeDrawing.bind(this)

  }

  componentDidMount() {
    this.changeDrawing()
  }
  componentDidUpdate() {
    this.changeDrawing()
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

  changeDrawing() {
    let length = this.getActiveItems(),
        calm   = document.getElementById('calm'),
        disturbed = document.getElementById('disturbed'),
        genie     = document.getElementById('genie')

    if (length <= 4) {
      calm.style.opacity = 1,
      disturbed.style.opacity = 0,
      genie.style.opacity = 0
    }
    else if (length >4 && length<7 ) {
      calm.style.opacity = 0,
      disturbed.style.opacity = 1,
      genie.style.opacity = 0
    } else {
      calm.style.opacity = 0,
      disturbed.style.opacity = 0,
      genie.style.opacity = 1
    }
  }


  iconColor(e) {
    console.log(e.type)
    if (e.type === 'mouseenter') {
      document.getElementById('icon-color').style.fill = "#ff61b8"
    } else {
      document.getElementById('icon-color').style.fill = "#4c4a4b"
    }


  }
  rotateIcon(e) {

  }


  render() {

    console.log(...this.props)

    return (
      <div className="app-container">

        <section className="todoapp">

          <TodoHeader addItem = {this.props.addItem}/>
          <TodoList {...this.props}/>
          <TodoTools  changeFilter={this.props.changeFilter}
                      filter={this.props.filter}
                      getActiveItems={this.getActiveItems()}
                      clearCompleted={this.props.clearCompleted}/>
        <DevTools/>
        </section>
        <section className="reaction">
          <div className="reaction__icon" onMouseEnter={(e) => this.iconColor(e)} onMouseLeave={(e) => this.iconColor(e)} onClick={()=> this.rotateIcon()}><Background height="85px" width="85px"  viewBox="0 0 15 15" name="icon" /></div>
          <div className="reaction__drawing"><Background height="100%" width="auto"  viewBox="-416.691 -258.303 622.536 957.728" name="background"/></div>


        </section>


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
