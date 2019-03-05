import React, { createContext, useState } from 'react'

export const FormContext = createContext()

export function FormContextProvider({ onSubmit: submitForm }) {
  const _registeredFields = new Map()

  function registerField ({ name, validator, getValue }) {
    if (!_registeredFields.has(name)) {
      _registeredFields.set(name, { validator, getValue })
    }
  }

  function unregisterField ({ name }) {
    _registeredFields.delete(name)
  }

  function validateAndSubmit () {
    const fields = Array.from(_registeredFields)
    let hasInvalidFields = fields.map(field => typeof field[1].validator() === 'string').filter(Boolean)
    if (hasInvalidFields.length) { return }
    const aggregatedValues = fields
      .map(field => ({ [field[0]]: field[1].getValue() }))
      .reduce((valueObj, property) => {
        Object.keys(property).forEach(key => { valueObj[key] = property[key] })
        return valueObj
      })
    submitForm(aggregatedValues)
  }

  return (
    <FormContext.Provider value={{ registerField, unregisterField, validateAndSubmit }}>
      { children }
    </FormContext.Provider>
  )
}
