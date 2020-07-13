import React, { useState } from 'react'

export default function useInput ({ input, required = input.props.required || false, validator = () => {} }) {
  const [value, setValue] = useState(input.props.value || input.props.initialValue || '')
  const [errorMessage, setErrorMessage] = useState('')

  function getValue () {
    return value
  }

  function validate () {
    if (required && value === '') {
      setErrorMessage('required')
      return false
    }
    const validatorResult = validator(value)
    if (typeof validatorResult === 'string') {
      setErrorMessage(validatorResult)
      return false
    }
    setErrorMessage('')
    return true
  }

  function onChange(e) {
    setValue(e.target.value)
  }

  return { getValue, onChange, validate, value, errorMessage }
}