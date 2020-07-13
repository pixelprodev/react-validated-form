import React, {useContext, useEffect} from 'react'
import { FormContext } from './Form'
import nanoId from 'nanoid'
import useInputHook from './hooks'

export default function FormField ({ input, required, validator = () => {}, errorMessageProp }) {
  let _id = nanoId(6)
  const { registerField, unregisterField, events, holdForSubmit } = useContext(FormContext)
  const { getValue, validate, errorMessage, ...handlers } = useInputHook({ input, required, validator, events })

  useEffect(() => {
    const { name, type } = input.props
    registerField({ _id, name, type, validate, getValue })
    return () => unregisterField({ _id })
  })

  const props = {...handlers, disabled: holdForSubmit}
  if (errorMessageProp) {
    props[errorMessageProp] = errorMessage
  }
  return React.cloneElement(input, props)
}
