import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem'
import AddNote from "./AddNote"
import { useNavigate } from 'react-router';


const Notes = (props) => {
    const context = useContext(NoteContext);
    const navigate = useNavigate();

    const { notes, getNotes, editNote } = context

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        } else {
            navigate('/login');
        }
        //eslint-disable-next-line
    }, []);

    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })


    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }


    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click()
        props.showAlerts("Update values Successfully", "success ")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }


    return (
        <>
            <AddNote showAlerts={props.showAlerts} />

            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal" data-bs-whatever="@mdo">Update Note</button>

            <div className="modal fade py-3" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content rounded-4">
                        <div className="modal-header">
                            <h5 className="modal-title text-success py-2" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3 ">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label"><b>Title :</b></label>
                                    <input type="text" className="form-control border-black" id="etitle" name="etitle" value={note.etitle} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label"><b>Description :</b></label>
                                    <textarea type="text" className="form-control border-black" id="edescription" name='edescription' value={note.edescription} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label"><b>Tag :</b></label>
                                    <input type="text" className="form-control border-black" id="etag" name="etag" value={note.etag} onChange={onChange} minLength={5} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick}>Update Note</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row my-3 mt-5'>
                <span className="p-2 bg-warning bg-opacity-10 border rounded-4">
                    <h2 className='text-center text-primary py-3'>------------- Show Notes Here -------------</h2>
                </span>
                <div className='container mx-3 my-2' style={{ textAlign: "center", fontWeight: "bold" }} >
                    {notes.length === 0 && "No notes display"}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlerts={props.showAlerts} />
                })}
            </div>
        </>
    )
}

export default Notes