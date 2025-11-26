const { useState, useEffect } = React

import { noteService } from '../services/note.service.js'
import { utilService } from '../../services/util.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteAdd } from '../cmps/NoteAdd.jsx'
import { NoteEdit } from '../cmps/NoteEdit.jsx'

export function NoteIndex() {

    const [notes, setNotes] = useState([])
    const [noteToEdit, setNoteToEdit] = useState(null)

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query()
            .then(notes => setNotes(notes))
    }

    function onAddNote(newNote) {
    noteService.save(newNote).then(saved => {
        setNotes(prev => [saved, ...prev])
    })
}


    function onDelete(noteId) {
        noteService.remove(noteId).then(() => {
            setNotes(prev => prev.filter(note => note.id !== noteId))
        })
    }

    function onDuplicate(note) {
    const copy = structuredClone(note)
    delete copy.id
    copy.createdAt = Date.now()

    noteService.save(copy).then(saved => {
        setNotes(prev => [saved, ...prev])
    })
}


    function onPin(note) {
        const updated = { ...note, isPinned: !note.isPinned }

        noteService.save(updated).then(saved => {
            setNotes(prev => {
                const unpinned = prev.filter(n => n.id !== note.id)
                return saved.isPinned ? [saved, ...unpinned] : [...unpinned, saved]
            })
        })
    }

    function onEdit(note) {
        setNoteToEdit(note)
    }

    function onSaveEdit(updatedNote) {
        noteService.save(updatedNote).then(saved => {
            setNotes(prev =>
                prev.map(n => (n.id === saved.id ? saved : n))
            )
            setNoteToEdit(null)
        })
    }

    function onChangeColor(noteId, color) {
        noteService.get(noteId).then(note => {
            const updated = { ...note, style: { ...note.style, backgroundColor: color } }

            noteService.save(updated).then(saved => {
                setNotes(prev =>
                    prev.map(n => (n.id === saved.id ? saved : n))
                )
            })
        })
    }

    return (
        <section className="note-index">

            <NoteAdd onAddNote={onAddNote} />

            <h2>Notes</h2>

            <NoteList
                notes={notes}
                onDelete={onDelete}
                onDuplicate={onDuplicate}
                onPin={onPin}
                onChangeColor={onChangeColor}
                onEdit={onEdit}
            />
             {noteToEdit &&
                <NoteEdit
                    note={noteToEdit}
                    onSave={onSaveEdit}
                    onClose={() => setNoteToEdit(null)}
                />
            }

        </section>
    )
}


