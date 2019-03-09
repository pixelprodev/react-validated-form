import React from 'react'
import useInputTypeHook from '../hooks'

export default function useForm ({ events, input, setValue }) {
  const { type } = input.props
  return useInputTypeHook(type, { input, events, setValue })

  // function onChange (e) {
  //   console.log(`onchange handler fired for ${_id}`)
  //   events.emit('field:update', { _id, name, getValue: handlers.getValue })
  //   inputProps.onChange(e)
  // }
}