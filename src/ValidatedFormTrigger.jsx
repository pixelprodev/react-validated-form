import ContextManager from './ContextManager'
import React, { Component } from 'react'

class ValidatedFormTrigger extends Component {
  constructor ({formName}) {
    super()
    this._context = ContextManager.getContext(formName)
  }
  render () {
    return (
      <this._context.Consumer>
        {({validateAndSubmit}) =>
          React.cloneElement(this.props.children, {onClick: validateAndSubmit})
        }
      </this._context.Consumer>
    )
  }
}

export default ValidatedFormTrigger
