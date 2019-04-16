import React, { useState } from 'react'

export default function useInput ({ input }) {
  const [value, setValue] = useState(input.props.value || input.props.initialValue || '')

  function getValue () {
    return value
  }

  function onChange(e) {
    setValue(e.target.value)
  }

  return { getValue, onChange, value }
}