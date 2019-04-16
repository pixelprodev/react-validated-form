import React, { useState, useEffect } from 'react'

export default function useRadio ({ input, events }) {
  const [isChecked, setIsChecked] = useState(input.props.defaultChecked || input.props.checked)
  const { name, value } = input.props

  function onChange(e) {
    setIsChecked(true)
    events.emit('field:update', { name, value })
    if (typeof input.props.onClick === 'function') {
      input.props.onClick(e)
    }
  }

  useEffect(() => {
    events.on('field:update', handleFieldUpdate)
    return () => events.off('field:update', handleFieldUpdate)
  })

  function handleFieldUpdate (data) {
    //short circuit if the field being updated is this one
    if (data.name === name && data.value === value) { return }
    // if another radio with the same name changes, set this as unchecked
    if (data.name === name && data.value !== value) {
      setIsChecked(false)
    }
  }

  function getValue() {
    return isChecked ? value : null
  }

  return { getValue, onChange, checked: isChecked }
}