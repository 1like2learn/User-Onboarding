import React from 'react'

export default function Form(props){
    const { values, inputChange, submitDisabled, onSubmit} = props
    // console.log(props)
    return(
        <form onSubmit={onSubmit}>
            <label>Name:&nbsp;
                <input 
                    value={values.name}
                    onChange={inputChange}
                    name='name'
                    type='text'

                />
            </label>
            <label>Email:&nbsp;
                <input 
                    value={values.email}
                    onChange={inputChange}
                    name='email'
                    type='text'
                />
            </label>

            <label>Password&nbsp;
                <input 
                    value={values.password}
                    onChange={inputChange}
                    name='password'
                    type='password'
                />
            </label>
            <label>Terms of Service&nbsp;
                <input
                    checked={values.tosAgree}
                    onChange={inputChange}
                    name='tosAgree'
                    type='checkbox'
                />
            </label>
            <button disabled={submitDisabled}>Submit</button>
        </form>
    )
}