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
          <FormField input={ <input type='radio' name='test-radio' value='foo' defaultChecked /> } />
          <FormField input={ <input type='radio' name='test-radio' value='bar' /> } />
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
    expect(returnValue).toInclude({'test-radio': 'foo'})
  })

  test('Selecting a different radio value updates the reported value', async () => {
    const submitSpy = expect.createSpy()
    function TestForm () {
      return (
        <Form onSubmit={submitSpy}>
          <FormField input={ <input type='radio' name='test-radio' data-testid='foo' value='foo' defaultChecked/> } />
          <FormField input={ <input type='radio' name='test-radio' data-testid='bar' value='bar'/> } />
          <FormTrigger>
            <button type='button'>Submit</button>
          </FormTrigger>
        </Form>
      )
    }
    const { getByTestId } = render(<TestForm />)
    fireEvent.click(getByTestId('bar'))
    fireEvent.click(getByTestId('form-submit'))

    const returnValue = submitSpy.calls[0].arguments
    expect(returnValue.length).toBe(1)
    expect(returnValue).toInclude({'test-radio': 'bar'})
  })

  test('Reselecting default option activates appropriate radio', async () => {
    const submitSpy = expect.createSpy()
    function TestForm () {
      return (
        <Form onSubmit={submitSpy}>
          <FormField input={ <input type='radio' name='test-radio' data-testid='foo' value='foo' defaultChecked/> } />
          <FormField input={ <input type='radio' name='test-radio' data-testid='bar' value='bar'/> } />
          <FormTrigger>
            <button type='button'>Submit</button>
          </FormTrigger>
        </Form>
      )
    }
    const { getByTestId } = render(<TestForm />)
    fireEvent.click(getByTestId('bar'))
    fireEvent.click(getByTestId('form-submit'))
    fireEvent.click(getByTestId('foo'))
    fireEvent.click(getByTestId('form-submit'))

    const firstResult = submitSpy.calls[0].arguments
    expect(firstResult.length).toBe(1)
    expect(firstResult).toInclude({'test-radio': 'bar'})

    const secondResult = submitSpy.calls[1].arguments
    expect(secondResult.length).toBe(1)
    expect(secondResult).toInclude({'test-radio': 'foo'})
  })

  test('Multiple radios in the same form', async () => {
    const submitSpy = expect.createSpy()
    function TestForm () {
      return (
        <Form onSubmit={submitSpy}>
          <FormField input={ <input type='radio' name='test-radio' data-testid='foo' value='foo' defaultChecked /> } />
          <FormField input={ <input type='radio' name='test-radio' data-testid='bar' value='bar'/> } />
          <FormField input={ <input type='radio' name='test-radio2' data-testid='foo2' value='foo' /> } />
          <FormField input={ <input type='radio' name='test-radio2' data-testid='bar2' value='bar' defaultChecked /> } />
          <FormTrigger>
            <button type='button'>Submit</button>
          </FormTrigger>
        </Form>
      )
    }
    const { getByTestId } = render(<TestForm />)
    fireEvent.click(getByTestId('form-submit'))

    const returnValue = submitSpy.calls[0].arguments.shift()
    expect(Object.values(returnValue).length).toBe(2)
    expect(returnValue).toEqual({'test-radio': 'foo', 'test-radio2': 'bar'})
  })
})

