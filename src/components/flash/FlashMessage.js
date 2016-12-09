import React, {Component, PropTypes } from 'react'


export default class FlashMessage extends Component {
  render() {
    const { id, type, text } = this.props.message
    return (
      <div className={classnames('alert', {
        
      })}>

      </div>
    )
  }
}


FlashMessage.propTypes = {
  message: PropTypes.object.isRequired
}
