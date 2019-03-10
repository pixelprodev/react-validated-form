import React, { createContext, useState } from 'react'
import EventEmitter from 'event-emitter'

export const FormContext = createContext()

export default function Form({ onSubmit: submitForm, children }) {
  const _registeredFields = new Map()
  const events = new EventEmitter()

  function registerField ({ _id, ...params}) {
    if (!_registeredFields.has(_id)) {
      console.log(`registering field with form ${_id}`)
      _registeredFields.set(_id, { ...params })
    }
  }

  function unregisterField ({ _id }) {
    _registeredFields.delete(_id)
  }

  function validateAndSubmit () {
    // console.log(_registeredFields)
    // const fields = Array.from(_registeredFields).filter(([fieldId, field]) => {
    //   console.log(field)
    //   console.log(field.getValue())
    //   return (field.type === 'radio' && field.getValue()) || field.type !== 'radio'
    // })
    // let hasInvalidFields = fields.map(([fieldId, field]) => typeof field.validator() === 'string').filter(Boolean)
    // if (hasInvalidFields.length) { return }
    // const aggregatedValues = fields
    //   .map(([fieldId, field]) => ({ [field.name]: field.getValue() }))
    //   .reduce((valueObj, property) => {
    //     Object.keys(property).forEach(key => { valueObj[key] = property[key] })
    //     return valueObj
    //   })
    // submitForm(aggregatedValues)
    const aggregatedValues = ['foo', 'bar', 'baz']
    submitForm(aggregatedValues)
  }

  return (
    <FormContext.Provider value={{ registerField, unregisterField, validateAndSubmit, events }}>
      { children }
    </FormContext.Provider>
  )
}
