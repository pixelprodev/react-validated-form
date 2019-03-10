import useRadio from './useRadio'
import useInput from './useInput'

export default function useInputHook ({ input, events }) {
  switch(input.props.type) {
    case 'radio': return useRadio({ input, events })
    case 'text': return useInput({ input, events })
    default:
      throw new Error(`No matching hook found for component type ${input.props.type}`)
  }
}