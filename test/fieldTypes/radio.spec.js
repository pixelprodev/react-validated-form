import React from 'react'
import { render, cleanup, waitForElement } from 'react-testing-library'
import Form from '../../src/Form'
import FormField from '../../src/FormField'
import TestRenderer from 'react-test-renderer'
import FormTrigger from '../../src/FormTrigger'
import { spy } from 'sinon'
import testHook from '../../src/hooks/testHook'

suite('Type: Radio', () => {
  teardown(cleanup)
  // test('Inputs sharing the same name report a single value on submit', async () => {
  //   const submitSpy = spy()
  //   function TestForm () {
  //     return (
  //       <FormContextProvider onSubmit={submitSpy}>
  //         <FormField input={
  //           <input type="radio" name={'test-radio'} value={'foo'} checked/>
  //         } />
  //         <FormTrigger>
  //           <button type='button'>Submit</button>
  //         </FormTrigger>
  //       </FormContextProvider>
  //     )
  //   }
  //
  //   const renderer = TestRenderer.create(<TestForm />)
  //   console.log(renderer.toJSON())
  // })
  test('Selecting a different radio value updates the reported value', async () => {
    const submitSpy = spy()
    function TestForm () {
      return (
        <Form onSubmit={submitSpy}>
          <FormField>
            <input type="radio" name={'test-radio'} value={'foo'} checked/>
          </FormField>
          <FormTrigger>
            <button type='button'>Submit</button>
          </FormTrigger>
        </Form>
      )
    }

    const renderer = TestRenderer.create(<TestForm />)
    console.log(renderer.toJSON())
  })
  test('Defaults to first input as initial value')
  test('Respects `checked` property to override initial value')
})