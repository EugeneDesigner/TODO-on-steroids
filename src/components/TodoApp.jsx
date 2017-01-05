import React, { Component }           from 'react'
import TodoList                       from './TodoList'
import TodoHeader                     from './TodoHeader'
import TodoTools                      from './TodoTools'
import {Footer}                       from './Footer'
import {connect}                      from 'react-redux'
import DevTools                       from './DevTools'
import Background                     from '../common/Background'
import * as actionCreators            from '../actions/action_creators'
import { Link }                       from 'react-router'
import { fromJS }                     from 'immutable'
import FlashMessagesList              from './flash/FlashMessagesList'
import Transition                     from 'react-addons-css-transition-group'

export class TodoApp extends Component {
  constructor(props) {
    super(props)
    this.getActiveItems = this.getActiveItems.bind(this)
    this.changeDrawing = this.changeDrawing.bind(this)
    this.showMessage = this.showMessage.bind(this)

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
        genie     = document.getElementById('genie'),
        message   = document.getElementById('message');

    if (length <= 4) {
      calm.style.opacity = 1,
      disturbed.style.opacity = 0,
      genie.style.opacity = 0
      message.innerHTML = "It's all good, keep it up"
    }
    else if (length >4 && length<7 ) {
      calm.style.opacity = 0,
      disturbed.style.opacity = 1,
      genie.style.opacity = 0
      message.innerHTML = "Wow-wow, it's little busy, no?"
    } else {
      calm.style.opacity = 0,
      disturbed.style.opacity = 0,
      genie.style.opacity = 1
      message.innerHTML = "That's it, I am here to stop this!"
    }
  }


  iconColor(e) {

    if (e.type === 'mouseenter') {
      document.getElementById('icon-color').style.fill = "#ff61b8"
    } else {
      document.getElementById('icon-color').style.fill = "#4c4a4b"
    }


  }
  showMessage() {
    console.log('lol', this.refs.message.style)
    let message = this.refs.message
    message.style.opacity === '0' ? message.style.opacity = 1 : message.style.opacity = 0
  }


  render() {


    return (
      <Transition
        component="div"
        className="app-container"
        transitionName="menu-animate"
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={600}
        >

      <h1 className="todoapp__title">Planning your day</h1>
      <p className="todoapp__description">Take some time and plan your day. Eventually, some structure will make your day three times more productive.
      Four! Five times! But <span>be careful</span> - too many tasks will make our little friend not to happy and he may even come out of his cosy house...</p>
      <section className="todoapp">
          <TodoHeader addItem = {this.props.addItem}/>
          <TodoList {...this.props}/>
          <TodoTools  changeFilter={this.props.changeFilter}
                      filter={this.props.filter}
                      getActiveItems={this.getActiveItems()}
                      clearCompleted={this.props.clearCompleted}/>

        </section>
        <section className="reaction">
          <div className="reaction__icon" onMouseEnter={(e) => this.iconColor(e)} onMouseLeave={(e) => this.iconColor(e)} onClick={this.showMessage} ><Background height="85px" width="85px"  viewBox="0 0 15 15" name="icon" /></div>
          <div className="reaction__drawing"><Background height="100%" width="auto"  viewBox="-416.691 -258.303 622.536 957.728" name="background"/><div ref="message" style={{opacity: 0}} className="reaction__dialogue"><p id="message">Its all good</p></div></div>



        </section>

        <DevTools/>
      </Transition>
    )
  }

}


function mapStateToProps(state) {

  return {
    todos: state.todos.get('todos'),
    filter: state.todos.get('filter')
  }
}

export const TodoAppContainer = connect(mapStateToProps, actionCreators)(TodoApp)
