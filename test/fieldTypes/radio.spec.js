import React from 'react'
import { render, fireEvent, cleanup, waitForElement } from 'react-testing-library'
import Form from '../../src/Form'
import FormField from '../../src/FormField'
import FormTrigger from '../../src/FormTrigger'
import { spy } from 'sinon'

suite('Type: Radio', () => {
  teardown(cleanup)
  test('Selecting a different radio value updates the reported value', async () => {
    const submitSpy = spy()
    function TestForm () {
      return (
        <Form onSubmit={submitSpy}>
          <FormField>
            <input type="radio" name={'test-radio'} value={'foo'} defaultChecked/>
          </FormField>
          <FormField>
            <input type="radio" name={'test-radio'} value={'bar'} />
          </FormField>
          <FormTrigger>
            <button type='button'>Submit</button>
          </FormTrigger>
        </Form>
      )
    }

    const { getByTestId, container } = render(<TestForm />)
    fireEvent.click(getByTestId('form-submit'))

  })
  test('Defaults to first input as initial value')
  test('Respects `checked` property to override initial value')
})