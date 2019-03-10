import React from 'react'
import { storiesOf } from '@storybook/react'
import Form from '../Form'
import FormField from '../FormField'
import FormTrigger from "../FormTrigger";

storiesOf('FormField', module)
  .add('test', () =>
    <Form onSubmit={(values) => {console.log(values)}}>
      <FormField input={
        <input type="radio" name={'test-radio'} value={'foo'} defaultChecked/>
      } />
      <FormField input={
        <input type="radio" name={'test-radio'} value={'bar'} />
     } />
      <FormTrigger>
        <button>Submit</button>
      </FormTrigger>
    </Form>
  )