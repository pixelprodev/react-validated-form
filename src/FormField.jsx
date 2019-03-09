import React, {useContext, useEffect, useState} from 'react'
import { FormContext } from './Form'
import useForm from './hooks/useForm'
import nanoId from 'nanoid'

export default function FormField ({ children }) {
  const _id = nanoId()
  const [value, setValue] = useState('')
  const { registerField, unregisterField, events } = useContext(FormContext)

  console.log(value)
  function getValue () { return value }

  // registration happens below and only for the input, not any accompanying components
  useEffect(() => () => unregisterField({ _id }), [])

  const decoratedChildren = React.Children.map(children, child => {
    if (child.type !== 'input') { return child }

    const { name, type, id = `${_id}-${name}` } = child.props
    const { validator, inputProps } = useForm({ events, input: child, setValue })
    console.log(inputProps)
    registerField({ _id, name, type, validator, getValue })

    const props = Object.assign(
      {},
      { ...inputProps },
      { id },
      type !== 'radio' ? { value } : {}
    )
    console.log(props)
    return React.cloneElement(child, props)
  })
  if (decoratedChildren.length > 1) {
    decoratedChildren.forEach((child, indx) => {
      if (child.type === 'label') {
        const input = decoratedChildren.find(c => c.type === 'input')
        decoratedChildren[indx] = React.cloneElement(child, { htmlFor: input.props.id })
      }
    })
  }
  return decoratedChildren
}
