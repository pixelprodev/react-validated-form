import React, { useContext } from 'react'
import { FormContext } from "./Form";

export default function FormTrigger ({ children }) {
  const { validateAndSubmit, holdForSubmit } = useContext(FormContext)
  return React.cloneElement(children, { onClick: validateAndSubmit, disabled: holdForSubmit })
}
