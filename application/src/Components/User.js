import React from 'react'

function User(props) {
    const {user} = props
    // console.log('user', user);
    
    return (
        <div>
            <h2>{user.first_name + ' ' + user.last_name}</h2>
            <div>Email: {user.email}</div>
        </div>
    )
}

export default User;