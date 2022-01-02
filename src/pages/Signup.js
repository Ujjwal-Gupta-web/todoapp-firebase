import React, { useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase-config';
import { Alert, Button, Form } from 'react-bootstrap';
import { Navigate } from 'react-router';

const Signup = () => {

    let [isDisabled, setIsDisabled] = useState(false);
    const [show, setShow] = useState(false);
    let [user, setUser] = useState(null);
    let [alert_msg, setAlert_msg] = useState("");

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    });

    async function signup(e) {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const cpassword = document.getElementById("cpassword").value;
        if (password === cpassword) {
            setIsDisabled(true);
            try {
                const userDets = await createUserWithEmailAndPassword(auth, email, password)
                console.log(userDets);

            }
            catch (error) {
                console.log(error.message)
                let err = error.message.split("/");
                setAlert_msg(`Error : (${err[1]}`);
                setShow(true);
                setIsDisabled(false);
            }
        }
        else {
            setAlert_msg("Password donot match")
            setShow(true);
        }
    }


    return (
        <>
            <h5 className='text-center'>SignUp</h5>
            <hr />
            {
                (show)
                    ?
                    <Alert variant={"danger"} dismissible onClick={() => setShow(false)}>{alert_msg}</Alert>
                    :
                    ""
            }

            {(user !== null)
                ?
                (
                    <Navigate to="/dashboard" />
                ) :
                (<div className='mx-auto my-5' style={{ width: "300px" }}>
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

                        <Form.Group className="mb-3" controlId="cpassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" />
                        </Form.Group>

                        <Button disabled={isDisabled} variant="success" type="submit" onClick={signup}>
                            Signup
                        </Button>
                    </Form>


                </div>)}
        </>
    )
}

export default Signup
