import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Components/Form'

const defaultFormValues = {
  name: '',
  email: '',
  password: '',
  tosAgree: 'false',
}

function App() {
  const [ formValues, setFormValues ] = useState(defaultFormValues)
  // debugger
  console.log(formValues)

  const inputChange = event => {
    const { name, value } = event.target

    setFormValues({
      ...formValues,
      [name]: value 
    })
  }

  return (
    <div>
      <Form values = {formValues} inputChange = {inputChange}/>
    </div>
  );
}

export default App;
