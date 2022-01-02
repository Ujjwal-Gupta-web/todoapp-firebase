import React, { useState } from 'react'
import { signInWithEmailAndPassword , onAuthStateChanged} from "firebase/auth";
import { auth } from '../firebase-config';
import { Alert, Button, Form } from 'react-bootstrap';
import { Navigate } from 'react-router';



const Login = () => {

    let [isDisabled, setIsDisabled] = useState(false);
    let [user,setUser]=useState(null);
    const [show, setShow] = useState(false);
    let [alert_msg, setAlert_msg] = useState("");

    onAuthStateChanged(auth,(currentUser)=>
    {
      setUser(currentUser)
    });

    async function login(e) {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        setIsDisabled(true);
        console.log(email, password);
        try {
            const userDets = await signInWithEmailAndPassword(auth, email, password)
            console.log(userDets);
        }
        catch (error) {
            console.log(error.message)
            let err=error.message.split("/");
            setAlert_msg(`Error : (${err[1]}`);
            setShow(true);
            setIsDisabled(false);
        }
    }


    return (
        <>
        <h5 className='text-center'>Login</h5>
        <hr/>
            {
                (show)
                ?
                <Alert variant={"danger"} dismissible onClick={()=>setShow(false)}>{alert_msg}</Alert>
                :
                ""
            }
            
            {(user !== null)
                ?
                (
                    <Navigate to="/dashboard"/>
                ) :
                (<div className='mx-auto my-5' style={{width:"300px"}}>
                <Form className='border border-lg p-3'>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>


                        <Button disabled={isDisabled} variant="secondary" type="submit" onClick={login}>
                            Login
                        </Button>
                    </Form>
                </div>)
            }
        </>
    )
}

export default Login
