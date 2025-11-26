
const { useState, useEffect } = React

import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteAdd } from '../cmps/NoteAdd.jsx'

export function NoteIndex() {

    const [notes, setNotes] = useState([])

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query()
            .then(notes => setNotes(notes))
    }

    function onAddNote(newNote) {
        setNotes(prev => [newNote, ...prev])
    }

    return (
        <section className="note-index">

            <NoteAdd onAddNote={onAddNote} />   {/* ← עכשיו זה מופיע באמת */}

            <div>note app</div>
            <h2>Notes</h2>

            <NoteList notes={notes} />

        </section>
    )
}

