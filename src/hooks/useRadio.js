import React, { useState, useEffect } from 'react'

export default function useRadio ({ input, events, setValue }) {
  const [isChecked, setIsChecked] = useState(Boolean(input.props.defaultChecked))

  // only fires on select
  function onChange() {
    setValue(input.props.value)
  }

  useEffect(() => {
    events.on('field:update', handleFieldUpdate)
    return () => events.off('field:update', handleFieldUpdate)
  }, [])

  function handleFieldUpdate (data) {
    //short circuit if the field being updated is this one
    if (data._id === _id) { return }
    // if another radio with the same name changes, set this as unchecked
    if (data.name === name) {
      setIsChecked(false)
    }
  }

  function getValue () {
    console.log(`fetching value for ${_id}: ${isChecked}`)
    return isChecked ? input.props.value : null
  }

  return {
    validator: () => {},
    inputProps: { onChange }
  }
}