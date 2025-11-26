
// export function NoteIndex() {
//     return <div>note app</div>
// }


const { useState, useEffect } = React

import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'

export function NoteIndex() {

    const [notes, setNotes] = useState([])

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query()
            .then(notes => setNotes(notes))
    }

    return (
        <section className="note-index">
            <div>note app</div>
            <h2>Notes</h2>
            <NoteList notes={notes} />
        </section>
    )
}

