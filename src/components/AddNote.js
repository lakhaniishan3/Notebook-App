import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'


const AddNote = (props) => {
    const context = useContext(NoteContext)
    const { addNote } = context


    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        setNote({ title: "", description: "", tag: "" })
        props.showAlerts("Add Note Successfully", "success ")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }


    return (
        <div className="p-4 rounded-4" style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.20)" }} >
            <div className='row my-3'>
                <span className="p-2 bg-success bg-opacity-10 border rounded-4">
                    <h2 className='text-center text-primary py-3'>------------- Add Your Notes -------------</h2>
                </span>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label my-3"><b>Title :</b></label>
                        <input type="text" className="form-control border-black" id="title" name="title" value={note.title} onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label"><b>Description :</b></label>
                        <textarea type="text" className="form-control border-black" id="description" name='description' value={note.description} onChange={onChange} minLength={5} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label"><b>Tag :</b></label>
                        <input type="text" className="form-control border-black" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required />
                    </div>

                    <button type="submit" className="btn btn-primary mb-3" disabled={note.title.length < 5 || note.description.length < 5} onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote