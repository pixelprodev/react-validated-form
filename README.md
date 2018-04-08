
# React-Validated-Form

This library was created to have a super simple api to implement and interact with forms in your react application.  It does **not** rely  on any specific version of react nor does it require an additional library like redux to operate.

The components are linked through a simple context manager (not to be confused with react context, but used in a similar way) that allows the form to become form field aware.


## Install

```sh
npm install --save @pixelprodotco/react-validated-form
```
Be sure to prefix with `@pixelprodotco/` when you npm install, or youll install a different library alltogether.

## Simple Usage Example

```js
import React from 'react'
import { Form, FormField, FormSubmit } from '@pixelprodotco/react-validated-form'

const MyReactFormComponent = () => 
  <Form name='myForm' onSubmit={doSubmitFunc}>
    <div>
      <FormField name='username' type='text' />
      <FormField name='password' type='password' />
    </div>
    <FormSubmit>
      <button>Submit</button>
    </FormSubmit>
  </Form>
```


## Components

### Form
```js
import { Form } from '@pixelprodotco/react-validated-form'

// Base Form
<Form name='testForm' onSubmit={mySubmitFunc}>
  <div>
    <div>
      <FormField ... />
      <FormField ... />
    </div>
    <SomeComponentWithFormFields />
  </div>
</Form>

```
|PropName|Type|Details|isRequired|
|---|---|---|---|
|name|String|Used to set context of the form|true|
|onSubmit|Function|Called when FormSubmit is triggered and all fields are valid.  All values of registered fields will be serialized into an object array and bubbled.|true|

### FormField

```js
import { FormField } from '@pixelprodotco/react-validated-form'

// Text input (required)
  <FormField type='text'
             required
             placeholder='Hello world'
             name='myTestFormField' />

// Text input with custom validator
  <FormField type='text'
             validator={(value) => value === myCondition ? 'Invalid Message' : null}
             placeholder='Hello world'
             name='myTestFormField' />

// Select dropdown with options
  <FormField type='select'
             options: [
               {label: 'option one', value: 1},
               {label: 'option two', value: 2},
             ]
             name='myTestSelectField' />
```

`FormField` is the self-contained, self-validating component that does most of the lifting.  It support both text inputs as well as selects.

If the Form field is set to required, it will automatically validate empty values as invalid and will block the form from submitting until the values are specified.

If you would like to add more fine-tuning to your validation, provide a function to the `validator` prop and run your own logic to validate the field's value.  If the field is valid, return null or undefined.  If the field is invalid, just send back the error message you want to be displayed to help the user correct their error.

|PropName|Type|Details|isRequired|
|---|---|---|---|
|name|String|Serialized as the name property in data returned to form|true|
|type|String|One of `text | email | password | select` determines what type of element to render and in the case of email, how to set default validation.|true|
|placeholder|String|Placeholder for the rendered input||
|required|Bool|Add this property when the form field is required||
|validator|Function|Function to perform custom validation.  Input value is bubbled.   Return string error message when error is present.  Do not return if value is valid.
|onChange|Function|Hook into underlying component's `change` event.  React synthetic event is bubbled.||
|onBlur|Function|Hook into underlying component's `blur` event.  React synthetic event is bubbled.||
|options|Array|Only valid when type === 'select', renders each option for the select component.  Example:`[{label: 'foo', value: 'f'}]`
### FormSubmit
```js
import { FormSubmit } from '@pixelprodotco/react-validated-form'

// Trigger to submit form
const SubmitButton = () => 
  <FormSubmit>
    <button>Submit</button>
  </FormSubmit>

```
`FormSubmit`'s purpose is to provide a hook into the form so we can trigger a submit from clicking on any element passed into it (most often a button).  Provide a single child to `FormSubmit` and style it however you please to fit your application.