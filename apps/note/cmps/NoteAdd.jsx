const { useState } = React

import { noteService } from '../services/note.service.js'

export function NoteAdd({ onAddNote }) {

    const [txt, setTxt] = useState('')

    function onSubmit(ev) {
        ev.preventDefault()

        if (!txt) return

        const newNote = noteService.getEmptyNote(txt, 'NoteTxt')

        noteService.save(newNote).then(savedNote => {
            onAddNote(savedNote)
            setTxt('')
        })
    }

    return (
        <section className="note-add">
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Take a note..."
                    value={txt}
                    onChange={(ev) => setTxt(ev.target.value)}
                />

                <button>Add</button>
            </form>
        </section>
    )
}
