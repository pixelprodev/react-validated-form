import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContextManager from './ContextManager'
import ErrFormFieldsInvalid from './ErrFormFieldsInvalid'

class ValidatedForm extends Component {
  constructor ({name}) {
    super()
    this._context = ContextManager.getContext(name)
    this._registeredFields = new Map()
    this.registerField = this.registerField.bind(this)
    this.unregisterField = this.unregisterField.bind(this)
    this.validateAndSubmit = this.validateAndSubmit.bind(this)
  }

  registerField ({name, validator}) {
    if (!this.registeredFields.has(name)) {
      this._registeredFields.set(name, validator)
    }
  }

  unregisterField ({name}) {
    this._registeredFields.delete(name)
  }

  validateAndSubmit () {
    let hasInvalidFields = Array.from(this._registeredFields)
                                .some(field => field.validator() === false)
    return hasInvalidFields
      ? new ErrFormFieldsInvalid()
      : this.props.onSubmit()
  }

  render () {
    const contextMethods = {
      registerField: this.registerField,
      unregisterField: this.unregisterField,
      validateAndSubmit: this.validateAndSubmit
    }
    return (
      <this._context.Provider value={contextMethods}>
        {this.children}
      </this._context.Provider>
    )
  }
}

ValidatedForm.propTypes = {
  name: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default ValidatedForm
