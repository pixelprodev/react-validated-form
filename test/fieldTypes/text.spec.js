import React from 'react'
import { render, fireEvent, cleanup } from 'react-testing-library'
import Form from '../../src/Form'
import FormField from '../../src/FormField'
import FormTrigger from '../../src/FormTrigger'
import styled from '@emotion/styled'

suite('Type: text', () => {
  teardown(cleanup)
  test('Returns value for text box on submit', async () => {
    const submitSpy = expect.createSpy()
    function TestForm () {
      return (
        <Form onSubmit={submitSpy}>
          <FormField input={ <input type='text' name='test-text-input' value='test1' /> } />
          <FormTrigger>
            <button type='button'>Submit</button>
          </FormTrigger>
        </Form>
      )
    }

    const { getByTestId } = render(<TestForm />)
    fireEvent.click(getByTestId('form-submit'))

    const returnValue = submitSpy.calls[0].arguments
    expect(returnValue.length).toBe(1)
    expect(returnValue).toInclude({'test-text-input': 'test1'})
  })

  test('Works with emotion styled inputs', async () => {
    const submitSpy = expect.createSpy()

    const StyledInput = styled.input({
      width: 200,
      height: 50
    })

    function TestForm () {
      return (
        <Form onSubmit={submitSpy}>
          <FormField input={ <StyledInput type='text' name='test-text-input' value='test1' /> } />
          <FormTrigger>
            <button type='button'>Submit</button>
          </FormTrigger>
        </Form>
      )
    }

    const { getByTestId } = render(<TestForm />)
    fireEvent.click(getByTestId('form-submit'))

    const returnValue = submitSpy.calls[0].arguments
    expect(returnValue.length).toBe(1)
    expect(returnValue).toInclude({'test-text-input': 'test1'})
  })
})

