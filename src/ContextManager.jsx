class ContextManager {
  constructor () {
    this._contexts = []
  }

  getContext ({name}) {
    if (name) {
      const ctxIndex = this._contexts.findIndex(ctx => ctx.name === name)
      if (ctxIndex > -1) { return this._contexts[ctxIndex] }
    } else {
      if (this._contexts.length > 0) { return this._contexts[0] }
    }
    return null
  }

  setContext ({name, ...context}) {
    this._contexts.push({name, context})
  }
}

export default new ContextManager()
