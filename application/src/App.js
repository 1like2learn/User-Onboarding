import React, {useState, useEffect} from 'react';
import * as Yup from 'yup'
import axios from 'axios'
import './App.css';
import Form from './Components/Form'
import formSchema from './validation/formSchema'
import User from './Components/User'


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
  //Dimensioning variables
  const [ formValues, setFormValues ] = useState(defaultFormValues)
  const [ formErrors, setFormErrors ] = useState(initialFormErrors)
  const [ submitStatus, setSubmitStatus ] = useState(defaultDisable)
  const [ users, setUsers ] = useState([])

  //Functions
  const getUsers = () => {
    axios.get(`https://reqres.in/api/users`)
    .then(response => {
      setUsers(response.data.data)
    })
    .catch(error => {
      console.error(error);
    })
  }
  const inputChange = event => {
    const { name, value, checked, type } = event.target
    let newValue;
    
    if (type === 'checkbox') {
      newValue = checked;
    } else {
      newValue = value;
    }

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
  
  const postNewUser = (newUser) => {
    debugger
    axios.post(`https://reqres.in/api/users`, JSON.stringify(newUser))
    .then(() =>{
      setUsers([...users, newUser])
      console.log('newUser', newUser)
    })
    .catch(error=>{
    console.error('error', error);
    })
    .finally(()=>{
      setFormValues(defaultFormValues)
    })
  }

  const onSubmit = event =>{
    event.preventDefault()
    const newUser = {
      first_name: formValues.name.trim(),
      last_name: '',
      email: formValues.email.trim(),
    }
    postNewUser(newUser)
  }
//Use Effects
  useEffect(()=>{
  }, [users])
  useEffect(() => {
    getUsers()
  }, [])

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
        onSubmit = {onSubmit}
      />
      {
        users.map(user => {
        return (<User key={user.id} user={user} />)
        })
      }
    </div>
  );
}

export default App;
