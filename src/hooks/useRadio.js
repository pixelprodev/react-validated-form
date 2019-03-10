import React, { useState, useEffect } from 'react'

export default function useRadio ({ input, events }) {
  const [isChecked, setIsChecked] = useState(input.props.defaultChecked || input.props.checked)
  
  function onClick(e) {
    setIsChecked(true)
    events.emit('field:update', { name: input.props.name, value: input.props.value })
    if (typeof input.props.onClick === 'function') {
      input.props.onClick(e)
    }
  }

  useEffect(() => {
    events.on('field:update', handleFieldUpdate)
    return () => events.off('field:update', handleFieldUpdate)
  })

  function handleFieldUpdate (data) {
    const { name, value } = input.props
    //short circuit if the field being updated is this one
    if (data.name === name && data.value === value) { return }
    // if another radio with the same name changes, set this as unchecked
    setIsChecked(false)
  }

  function getValue() {
    return isChecked ? input.props.value : null
  }

  return { getValue, onClick, checked: isChecked }
}