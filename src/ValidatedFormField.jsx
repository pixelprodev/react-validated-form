import ContextManager from './ContextManager'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ValidatedFormField extends Component {
  constructor ({formName}) {
    super()
    this._context = ContextManager.getContext(formName)
  }
  render () {
    return (
      <this._context.Consumer>
        {context => <Validator {...{...context, ...this.props}} />}
      </this._context.Consumer>
    )
  }
}

ValidatedFormField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'password', 'email', 'phone', 'select']).isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  validator: PropTypes.array,
  options: PropTypes.array
}

export class Validator extends Component {
  constructor () {
    super()
    this.validate = this.validate.bind(this)
  }

  componentDidMount () {
    const { registerField, name } = this.props
    registerField({name, validator: this.validate})
  }

  componentWillUnmount () {
    const { unregisterField, name } = this.props
    unregisterField({name})
  }

  validate () {

  }

  getValue () {
    return this.formElement.value
  }

  render () {
    return (
      <span>filler for validated input</span>
    )
  }
}

export default ValidatedFormField
