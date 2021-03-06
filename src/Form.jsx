import React, { createContext } from 'react'
import EventEmitter from 'event-emitter'

export const FormContext = createContext()

export default function Form({ onSubmit: submitForm, holdForSubmit = false, children }) {
  const _registeredFields = new Map()
  const events = new EventEmitter()

  function registerField ({ _id, ...params}) {
    if (!_registeredFields.has(_id)) {
      _registeredFields.set(_id, { ...params })
    }
  }

  function unregisterField ({ _id }) {
    _registeredFields.delete(_id)
  }

  function validateAndSubmit () {
    const fields = Array.from(_registeredFields).filter(([fieldId, field]) => {
      return (field.type === 'radio' && field.getValue()) || field.type !== 'radio'
    })
    const fieldValidations = fields.map(([fieldId, field]) => field.validate())
    if (fieldValidations.some(i => i === false)) { return }
    const aggregatedValues = fields
      .map(([fieldId, field]) => ({ [field.name]: field.getValue() }))
      .reduce((valueObj, property) => {
        Object.keys(property).forEach(key => { valueObj[key] = property[key] })
        return valueObj
      })
    submitForm(aggregatedValues)
  }

  return (
    <FormContext.Provider value={{ registerField, unregisterField, validateAndSubmit, events, holdForSubmit }}>
      { children }
    </FormContext.Provider>
  )
}
