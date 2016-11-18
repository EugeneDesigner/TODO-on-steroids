import React, { Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ReactDOM from 'react-dom'
import cn from 'classnames'

export default class TextInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.text
    }
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.cancelEditing = this.cancelEditing.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)

}

  handleKeyDown(e) {
    switch (e.key) {
      case 'Enter':
        return this.props.doneEditing(this.props.itemId, this.state.value)
      case 'Escape':
        return this.cancelEditing(this.props.itemId)
    }
  }

  handleOnBlur(e) {
    return this.cancelEditing(this.props.itemId)
  }

  handleOnChange(e) {
    this.setState({value: e.target.value})
  }

  cancelEditing() {
    this.setState({value: this.props.text})
    return this.props.cancelEditing(this.props.itemId)
  }


  render() {
    return (
          <input className="edit"
                  autoFocus={true}
                  type="text"
                  value={this.state.value}
                  onChange={this.handleOnChange}
                  ref="itemInput"
                  onKeyDown={this.handleKeyDown}
                  onBlur ={this.handleOnBlur}/>
    )
  }
}
