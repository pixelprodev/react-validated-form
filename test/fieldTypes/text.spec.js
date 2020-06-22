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

    const { container } = render(<TestForm />)
    fireEvent.click(container.getElementsByTagName('button')[0])

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

    const { container } = render(<TestForm />)
    fireEvent.click(container.getElementsByTagName('button')[0])

    const returnValue = submitSpy.calls[0].arguments
    expect(returnValue.length).toBe(1)
    expect(returnValue).toInclude({'test-text-input': 'test1'})
  })
  test('Disables inputs when form is holdForSubmit', async () => {
    function TestForm () {
      return (
        <Form holdForSubmit onSubmit={() => {}}>
          <FormField input={ <input type='text' name='test-text-input' value='test1' /> } />
          <FormField input={ <input type='text' name='test-text-input2' value='test2' /> } />
          <FormTrigger>
            <button type='button'>Submit</button>
          </FormTrigger>
        </Form>
      )
    }

    const { container } = render(<TestForm />)
    const inputs = container.getElementsByTagName('input')
    expect(inputs[0].disabled).toBe(true)
    expect(inputs[1].disabled).toBe(true)
    const buttons = container.getElementsByTagName('button')
    expect(buttons[0].disabled).toBe(true)
  })
})

