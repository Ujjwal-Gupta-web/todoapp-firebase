import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase-config'
import { onAuthStateChanged, signOut } from "firebase/auth";


const Header = () => {

    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    });

    async function logout() {
        await signOut(auth);
    }

    return (
        <div className='text-center'>
            <h1 className='py-3 bg-dark fs-1'><Link to="/" className='text-decoration-none text-white'>Your Own TodoApp</Link></h1>
            <h4 className='my-3'>{(user) ? (<Link className='btn btn-outline-dark ' to="/dashboard">Dashboard : {user.email}</Link>) : "Login/SignUp to begin"}</h4>
            <div className='mb-5'>
                {
                    (!user) ?
                        (<>
                            <Link to="/login" className='btn btn-secondary mx-1 p-2' >Login</Link>
                            <Link to="/signup" className='btn btn-success mx-1 p-2' >Signup</Link>
                        </>)
                        :
                        (<button className='btn btn-outline-danger m-3 p-2' onClick={logout} >Logout</button>)}
            </div>
        </div>
    )
}

export default Header
