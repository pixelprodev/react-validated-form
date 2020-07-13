import useRadio from './useRadio'
import useInput from './useInput'
import useFileInput from './useFileInput'

export default function useInputHook ({ input, required, validator, events }) {
  if (input.type === 'textarea') {
    return useInput({ input, events, validator, required })
  }
  switch(input.props.type) {
    case 'radio':
      return useRadio({ input, events, validator, required })
    case 'hidden':
    case 'text':
    case 'number':
    case 'password':``
      return useInput({ input, events, validator, required })
    case 'file':
      return useFileInput({ input, events, validator, required })
    default:
      throw new Error(`No matching hook found for component type ${input.props.type}`)
  }
}