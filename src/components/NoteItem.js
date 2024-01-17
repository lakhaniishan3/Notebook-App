import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'


const NoteItem = (props) => {
    const context = useContext(NoteContext)
    const { deleteNote } = context
    const { note, updateNote } = props


    return (
        <div className="col-md-4">
            <div className="card my-3 rounded-4">
                <div className="card-body">
                    <p className="card-title"><b>Title :</b> {note.title}</p>
                    <p className="card-text"><b>Description :</b> {note.description}</p>
                    <p className="card-text"><b>Tag :</b> {note.tag}</p>


                    <i className="fa-solid fa-pen-to-square fa-lg mx-2" onClick={() => { updateNote(note) }} ></i>
                    <i className="fa-solid fa-trash fa-lg mx-2" onClick={() => { deleteNote(note._id); props.showAlerts("Delete values Successfully", "success ") }}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem