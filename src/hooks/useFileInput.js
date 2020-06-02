import React, { useState } from 'react'

export default function useInput () {
  const [value, setValue] = useState([])

  function getValue () {
    return value
  }

  function onChange(e) {
    setValue(e.target.files)
  }

  return { getValue, onChange, value }
}