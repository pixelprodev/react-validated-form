import useRadio from './useRadio'
import useInput from './useInput'

export default function useInputTypeHook (type, args) {
  switch(type) {
    case 'radio': return useRadio(args)
    case 'text': return useInput(args)
    default:
      throw new Error(`No matching hook found for component type ${type}`)
  }
}