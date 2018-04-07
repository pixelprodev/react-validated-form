import React from 'react'

class ContextManager {
  constructor () {
    this._contexts = []
  }

  getContext (formName) {
    if (formName) {
      const ctxIndex = this._contexts.find(ctx => ctx.name === formName)
      if (ctxIndex > -1) {
        return this._contexts[ctxIndex]
      } else {
        const newContext = {
          name: formName,
          ...React.createContext()
        }
        this._contexts.push(newContext)
        return newContext
      }
    } else {
      return this._contexts.length > 0
        ? this._contexts[0]
        : null
    }
  }
}

export default new ContextManager()
