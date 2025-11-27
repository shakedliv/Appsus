const { useState, useEffect } = React

import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteAdd } from '../cmps/NoteAdd.jsx'
import { NoteEdit } from '../cmps/NoteEdit.jsx'

export function NoteIndex() {

    const [notes, setNotes] = useState([])
    const [noteToEdit, setNoteToEdit] = useState(null)

    useEffect(() => {
        loadNotes()
    }, [])

    function sortNotes(notes) {
        return [...notes].sort((a, b) => {
            if (a.isPinned && !b.isPinned) return -1
            if (!a.isPinned && b.isPinned) return 1
            return b.createdAt - a.createdAt
        })
    }

    function loadNotes() {
        noteService.query().then(notes =>
            setNotes(sortNotes(notes))
        )
    }

    function onAddNote(newNote) {
        noteService.save(newNote).then(saved =>
            setNotes(prev => sortNotes([saved, ...prev]))
        )
    }

    function onDelete(noteId) {
        noteService.remove(noteId).then(() =>
            setNotes(prev => sortNotes(prev.filter(n => n.id !== noteId)))
        )
    }

    function onDuplicate(note) {
        const copy = structuredClone(note)
        delete copy.id
        copy.createdAt = Date.now()

        noteService.save(copy).then(saved =>
            setNotes(prev => sortNotes([saved, ...prev]))
        )
    }

    function onPin(note) {
        const updated = { ...note, isPinned: !note.isPinned }

        noteService.save(updated).then(saved =>
            setNotes(prev =>
                sortNotes(prev.map(n => n.id === saved.id ? saved : n))
            )
        )
    }

    function onEdit(note) {
        setNoteToEdit(note)
    }

    function onSaveEdit(updatedNote) {
        noteService.save(updatedNote).then(saved => {
            setNotes(prev =>
                sortNotes(prev.map(n => n.id === saved.id ? saved : n))
            )
            setNoteToEdit(null)
        })
    }

    function onChangeColor(noteId, colorClass) {
        noteService.get(noteId).then(note => {
            const updated = { ...note, colorClass }

            noteService.save(updated).then(saved =>
                setNotes(prev =>
                    sortNotes(prev.map(n => n.id === saved.id ? saved : n))
                )
            )
        })
    }

    return (
        <section className="note-index">

            <NoteAdd onAddNote={onAddNote} />



            <h3 className="note-section-title">PINNED</h3>
            <NoteList
                notes={notes.filter(n => n.isPinned)}
                onDelete={onDelete}
                onDuplicate={onDuplicate}
                onPin={onPin}
                onChangeColor={onChangeColor}
                onEdit={onEdit}
            />



            {/* {notes.filter(n => !n.isPinned).length > 0 && (
                <>
                    <h3 className="note-section-title">OTHERS</h3>
                    <NoteList
                        notes={notes.filter(n => !n.isPinned)}
                        onDelete={onDelete}
                        onDuplicate={onDuplicate}
                        onPin={onPin}
                        onChangeColor={onChangeColor}
                        onEdit={onEdit}
                    />
                </>
            )} */}

            {noteToEdit && (
                <NoteEdit
                    note={noteToEdit}
                    onSave={onSaveEdit}
                    onClose={() => setNoteToEdit(null)}
                />
            )}

        </section>
    )
}


