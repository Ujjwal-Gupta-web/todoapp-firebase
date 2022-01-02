import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router';
import { auth, firestore } from '../firebase-config';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Todo from '../components/Todo';

const Dashboard = () => {

    let [user, setUser] = useState({});
    let [todos, setTodos] = useState([]);

    useEffect(() => {
        getData();
    }, [user])

    async function add() {
        let title = document.getElementById("add_todo_title").value;
        let description = document.getElementById("add_todo_description").value;
        try {
            let today = new Date().toLocaleDateString()
            const docRef = await addDoc(collection(firestore, "todo-collection"), {
                title: title,
                description: description,
                email: user.email,
                date: today
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        window.location.reload();
    }

    async function getData() {
        const querySnapshot = await getDocs(collection(firestore, "todo-collection"));
        let arrTodo = [];
        querySnapshot.forEach((doc) => {
            if (doc.data().email === user.email) {
                console.log(doc.id, doc.data());
                let obj = {
                    email: doc.data().email,
                    id: doc.id,
                    title: doc.data().title,
                    description: doc.data().description,
                    date: doc.data().date,
                }
                arrTodo.push(obj);
            }
        });
        arrTodo.reverse()
        setTodos(arrTodo);
    }



    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    });




    return (<>
        <button type="button" class="btn btn-dark mx-auto" data-bs-toggle="modal" data-bs-target="#addTodo">
            + Add Todo
        </button>


        <div class="modal fade" id="addTodo" tabindex="-1" aria-labelledby="addTodoLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addTodoLabel">Add Todo</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            {/* Input Title of todo */}
                            <div className="row g-2 align-items-center mb-2">
                                <div className="col-4">
                                    <label htmlFor="todo_title" className="form-label">Title</label>
                                </div>
                                <div className="col-8">
                                    <input className="form-control" type="text" id="add_todo_title" required />
                                </div>
                            </div>


                            {/* Input Description of todo */}
                            <div className="row g-2 align-items-center mb-2">
                                <div className="col-4">
                                    <label htmlFor="todo_description" className="form-label">Description</label>
                                </div>
                                <div className="col-8">
                                    <textarea className="form-control" type="text" id="add_todo_description" style={{ height: "150px" }} />
                                </div>
                            </div>

                            <hr />

                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <div className="btn btn-success mx-3" onClick={add}>Add</div>
                        </form>
                    </div>
                </div>
            </div>
        </div>



        {
            (user === null)
                ?
                <Navigate to="/" />
                :
                (
                    <div>



                        {
                            (todos.length > 0)
                                ?
                                todos.map((todo) => <><Todo key={todo.id} obj={todo} /></>)
                                :
                                ""
                        }

                    </div>
                )
        }
    </>
    )
}

export default Dashboard
