import React, {useContext, useEffect} from 'react'
import { FormContext } from './Form'
import nanoId from 'nanoid'
import useInputHook from './hooks'

export default function FormField ({ input, validator = () => {} }) {
  let _id = nanoId(6)
  const { registerField, unregisterField, events } = useContext(FormContext)
  const { getValue, ...handlers } = useInputHook({ input, events })

  useEffect(() => {
    const { name, type } = input.props
    registerField({ _id, name, type, validator, getValue })
    return () => unregisterField({ _id })
  })

  return React.cloneElement(input, {...handlers})
}
