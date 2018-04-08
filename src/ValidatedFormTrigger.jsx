import ContextManager from './ContextManager'
import React, { Component } from 'react'

class ValidatedFormTrigger extends Component {
  componentWillMount () {
    const { formName } = this.props
    this._context = ContextManager.getContext({name: formName})
  }
  render () {
    const validateAndSubmit = this._context._currentValue.validateAndSubmit
    return (
      React.cloneElement(this.props.children, {onClick: validateAndSubmit})
    )
  }
}

export default ValidatedFormTrigger
