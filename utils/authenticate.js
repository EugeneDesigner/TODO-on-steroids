import React, { Component, PropTypes } from 'react'
import { addFlashMessage} from '../src/actions/flashMessages'


export default function(Comp) {
  class Authenticate extends Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.addFlashMessage({
          type: 'error',
          text: 'you need to login'
        })
        this.context.router.push('./main')
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.context.router.push('/main')
      }
    }
    render() {
      return (
        <Comp {...this.props} />
      )
    }
  }


  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    addFlashMessage: PropTypes.func.isRequired
  }

  Authenticate.contextTypes = {
    isAuthenticated: state.auth.isAuthenticated
  }
  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated
    }
  }

  return connect(mapStateToProps, { addFlashMessage })(Authenticate)
}
