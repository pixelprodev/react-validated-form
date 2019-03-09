import React, { useState } from 'react'

export default function useInput ({ setValue }) {

  // only fires on select
  function onChange(e) {
    setValue(e.target.value)
  }

  return {
    validator: () => {},
    inputProps: { onChange }
  }
}