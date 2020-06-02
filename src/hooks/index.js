import useRadio from './useRadio'
import useInput from './useInput'
import useFileInput from './useFileInput'

export default function useInputHook ({ input, events }) {
  if (input.type === 'textarea') {
    return useInput({ input, events })
  }
  switch(input.props.type) {
    case 'radio':
      return useRadio({ input, events })
    case 'hidden':
    case 'text':
    case 'number':
    case 'password':
      return useInput({ input, events })
    case 'file':
      return useFileInput({ input, events })
    default:
      throw new Error(`No matching hook found for component type ${input.props.type}`)
  }
}