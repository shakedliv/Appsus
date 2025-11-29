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

    function onToggleTodo(noteId, todoId) {
    setNotes(prevNotes =>
        prevNotes.map(note => {
            if (note.id !== noteId) return note

            const updatedTodos = note.info.todos.map(todo =>
                todo.id === todoId
                    ? { ...todo, isDone: !todo.isDone }
                    : todo
            )

            const updatedNote = {
                ...note,
                info: { ...note.info, todos: updatedTodos }
            }

            noteService.save(updatedNote)
            return updatedNote
        })
    )
}

    const pinnedNotes = notes.filter(n => n.isPinned)
    const otherNotes = notes.filter(n => !n.isPinned)

    return (
        <section className="note-index">

            <NoteAdd onAddNote={onAddNote} />



            <h3 className="note-section-title">PINNED</h3>
            <NoteList
                notes={pinnedNotes}
                onDelete={onDelete}
                onDuplicate={onDuplicate}
                onPin={onPin}
                onChangeColor={onChangeColor}
                onEdit={onEdit}
                onToggleTodo={onToggleTodo}

            />

            {otherNotes.length > 0 && (
                <div className="other-notes-section">
                    <h3 className="note-section-title">OTHERS</h3>
                    <NoteList
                        notes={otherNotes}
                        onDelete={onDelete}
                        onDuplicate={onDuplicate}
                        onPin={onPin}
                        onChangeColor={onChangeColor}
                        onEdit={onEdit}
                        onToggleTodo={onToggleTodo}

                    />
                </div>
            )}

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




