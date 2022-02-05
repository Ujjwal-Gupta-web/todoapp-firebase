import React from 'react'
import { doc, deleteDoc} from "firebase/firestore";
import { firestore } from '../firebase-config';


const Todo = ({ obj }) => {

  let { id, title, email, description, date } = obj;

  async function del() {
    await deleteDoc(doc(firestore, "todo-collection", id));
    window.location.reload();
  }



  let deleteModalbtn = `#deletetodo${id}`;
  let deleteModalId = `deletetodo${id}`;
  let deleteModalAriaLabellededBy = `deletetodoLabel${id}`;

  return (
    <>
      <div className="card my-3">
        <div className="card-header text-capitalize d-flex align-items-center justify-content-between ">
          <h5 className="card-title">{title}</h5>
          <div className="d-flex align-items-center justify-content-between">
            <button className="btn btn-light mx-1 d-flex flex-column align-items-center justify-content-center" data-bs-toggle="modal" data-bs-target={deleteModalbtn}>
              <img src="https://img.icons8.com/fluency-systems-regular/48/000000/filled-trash.png" alt="delete-icon" height="18px" width="18px" />
              <p style={{ fontSize: "15px" }}>Delete</p>
            </button>
          </div>
        </div>
        <div className="card-body">
          <p className="card-text">{description}</p>
          <div class="badge bg-warning text-dark text-capitalize">{date}</div>
        </div>
      </div>

      {/* DELETE modal */}
      <div className="modal fade" id={deleteModalId} tabIndex="-1" aria-labelledby={deleteModalAriaLabellededBy} aria-hidden="true">
        {/* <><Alert message={errMessageDeletetodo} type={errTypeDeletetodo} display={displayValDeletetodo} /></> */}
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={deleteModalAriaLabellededBy}>Are you sure you want to remove this from your todo list ?</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                {/* Input Title of todo */}
                <div className="row g-2 align-items-center mb-2">
                  <div className="col-4">
                    <label htmlFor="todo_title" className="form-label">Title</label>
                  </div>
                  <div className="col-8">
                    <input className="form-control" type="text" id="delete_todo_title" defaultValue={title} disabled />
                  </div>
                </div>

                {/* Input Description of todo */}
                <div className="row g-2 align-items-center mb-2">
                  <div className="col-4">
                    <label htmlFor="todo_description" className="form-label">Description</label>
                  </div>
                  <div className="col-8">
                    <textarea className="form-control" type="text" id="delete_todo_description" defaultValue={description} disabled style={{ height: "150px", overflow: "scroll" }} />
                  </div>
                </div>

                <hr />

                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <div className="btn btn-danger mx-3" onClick={del}>Delete</div>
              </form>
            </div>
          </div>
        </div>
      </div>



    </>
  )
}

export default Todo



