import React, { useState } from 'react'

export default function useFileInput ({ validator }) {
  const [value, setValue] = useState([{}])

  function getValue () {
    return value
  }

  function onChange(e) {
    setValue(e.target.files)
  }

  return { getValue, onChange, filename: value[0].filename, validate: validator }
}