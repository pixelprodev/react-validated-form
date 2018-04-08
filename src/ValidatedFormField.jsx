import ContextManager from './ContextManager'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ValidatedFormField extends Component {
  componentWillMount () {
    const { formName } = this.props
    this._context = ContextManager.getContext({name: formName, source: 'field'})
  }
  render () {
    return (
      <this._context.Consumer>
        {context => <Validator {...{...this._context._currentValue, ...this.props}} />}
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
    registerField({
      name,
      validator: this.validate.bind(this),
      getValue: this.getValue.bind(this)
    })
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
      <input type='text' ref={elem => (this.formElement = elem)} />
    )
  }
}

export default ValidatedFormField
