import React from 'react'
import { storiesOf } from '@storybook/react'
import Form from '../Form'
import FormField from '../FormField'
import FormTrigger from "../FormTrigger";

storiesOf('FormField', module)
  .add('test', () =>
    <Form onSubmit={(values) => {console.log(values)}}>
      <FormField>
        <input type="radio" name={'test-radio'} value={'foo'} defaultChecked/>
        <label>Foo</label>
      </FormField>
      <FormField>
        <input type="text" name={'test-text'} />
      </FormField>
      <FormField>
        <input type="radio" name={'test-radio'} value={'bar'} />
        <label>Bar</label>
      </FormField>
      <FormTrigger>
        <button>Submit</button>
      </FormTrigger>
    </Form>
  )