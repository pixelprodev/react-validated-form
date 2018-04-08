import { storiesOf } from '@storybook/react'
import React from 'react'
import ValidatedForm from '../ValidatedForm'
import ValidatedFormField from '../ValidatedFormField'
import ValidatedFormTrigger from '../ValidatedFormTrigger'

function listFormFields (formData) {
  console.log(formData)
}

const TestValidatedForm = () =>
  <ValidatedForm name='testform' onSubmit={listFormFields}>
    <div>
      <div>
        <ValidatedFormField name='firstName' type='text' />
        <ValidatedFormField name='lastName' type='text' />
      </div>
      <ValidatedFormTrigger>
        <button>submit</button>
      </ValidatedFormTrigger>
    </div>
  </ValidatedForm>

storiesOf('main', module)
  .add('Default', () => <TestValidatedForm />)
