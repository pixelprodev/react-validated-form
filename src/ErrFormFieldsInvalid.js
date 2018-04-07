class ErrFormFieldsInvalid extends Error {
  constructor (message) {
    super('Form contains invalid fields.  Cannot submit')
    Error.captureStackTrace(this, this.constructor)
  }
}

export default ErrFormFieldsInvalid
