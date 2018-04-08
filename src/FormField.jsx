import ContextManager from './ContextManager'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ValidatedFormField extends Component {
  componentWillMount () {
    const { formName } = this.props
    this.validate = this.validate.bind(this)
    this._context = ContextManager.getContext({name: formName}).context
  }

  componentDidMount () {
    const { name } = this.props
    const { registerField } = this._context
    registerField({
      name,
      validator: this.validate.bind(this),
      getValue: this.getValue.bind(this)
    })
  }

  componentWillUnmount () {
    const { name } = this.props
    const { unregisterField } = this._context
    unregisterField({name})
  }

  validate () {

  }

  getValue () {
    return this.formElement.value
  }

  render () {
    return (
      <input type='text' ref={elem => (this.formElement = elem)} />
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

export default ValidatedFormField
