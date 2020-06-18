import React, {useState, useEffect} from 'react';
import * as Yup from 'yup'
import axios from 'axios'
import './App.css';
import Form from './Components/Form'
import formSchema from './validation/formSchema'


const defaultFormValues = {
  name: '',
  email: '',
  password: '',
  tosAgree: '',
}
const initialFormErrors = {
  username: '',
  email: '',
  password: '',
  tosAgree: '',
}
const defaultDisable = true

function App() {
  const [ formValues, setFormValues ] = useState(defaultFormValues)
  const [ formErrors, setFormErrors ] = useState(initialFormErrors)
  const [submitStatus, setSubmitStatus ] = useState(defaultDisable)
  
  // debugger
  // console.log(formValues)

  const inputChange = event => {
    const { name, value, checked, type } = event.target
    // console.log('event.target', event.target);
    let newValue;
    
    if (type === 'checkbox') {
      newValue = checked;
    } else {
      newValue = value;
    }

    // console.log(formErrors)
    Yup
    .reach(formSchema, name)
    .validate(newValue)
    .then(() => {
      setFormErrors({
        ...formErrors,
        [name]:''
      });
    })
    .catch(error => {
      setFormErrors({
        ...formErrors,
        [name]: error.errors[0]
      })
    })

    setFormValues({
      ...formValues,
      [name]: newValue 
    })
  }
  
  const onSubmit = event =>{
    event.preventDefault()
    
  }
  
  useEffect(() => {
    formSchema.isValid(formValues).then(valid => {
      setSubmitStatus(!valid)
    })
  }, [formValues])

  return (
    <div>
      <div>{formErrors.name}</div>
      <div>{formErrors.email}</div>
      <div>{formErrors.password}</div>
      <div>{formErrors.tosAgree}</div>

      <Form 
        values = {formValues} 
        inputChange = {inputChange}
        submitDisabled = {submitStatus}
        onSubmmit = {onSubmit}
      />
    </div>
  );
}

export default App;
