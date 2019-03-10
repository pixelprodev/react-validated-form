import React from 'react'
import { render, fireEvent, cleanup } from 'react-testing-library'
import Form from '../../src/Form'
import FormField from '../../src/FormField'
import FormTrigger from '../../src/FormTrigger'

suite('Type: Radio', () => {
  teardown(cleanup)
  test('Reports only one value for multiple radios with the same name', async () => {
    const submitSpy = expect.createSpy()
    function TestForm () {
      return (
        <Form onSubmit={submitSpy}>
          <FormField>
            <input type='radio' name='test-radio' value='foo' defaultChecked/>
          </FormField>
          <FormField>
            <input type='radio' name='test-radio' value='bar' />
          </FormField>
          <FormTrigger>
            <button type='button'>Submit</button>
          </FormTrigger>
        </Form>
      )
    }

    const { getByTestId } = render(<TestForm />)
    fireEvent.click(getByTestId('form-submit'))

    const returnValue = submitSpy.calls[0].arguments[0]
    expect(returnValue.length).toBe(1)
    expect(returnValue).toInclude({'test-radio': 'foo'})
  })

  test('Selecting a different radio value updates the reported value')
  test('Defaults to first input as initial value')
  test('Respects `defaultChecked` property to override initial value')
})