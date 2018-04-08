import { storiesOf } from '@storybook/react'
import React from 'react'
import Form from '../Form'
import FormField from '../FormField'
import FormSubmit from '../FormSubmit'

function listFormFields (formData) {
  console.log(formData)
}

const TestValidatedForm = () =>
  <Form name='testform' onSubmit={listFormFields}>
    <div>
      <div>
        <FormField name='firstName' type='text' />
        <FormField name='lastName' type='text' />
      </div>
      <FormSubmit>
        <button>submit</button>
      </FormSubmit>
    </div>
  </Form>

storiesOf('main', module)
  .add('Default', () => <TestValidatedForm />)
