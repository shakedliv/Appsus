const { useState, useEffect } = React

import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteAdd } from '../cmps/NoteAdd.jsx'
import { NoteEdit } from '../cmps/NoteEdit.jsx'
import { utilService } from '../../../services/util.service.js'

export function NoteIndex() {

    const [notes, setNotes] = useState([])
    const [noteToEdit, setNoteToEdit] = useState(null)
    const [filterBy, setFilterBy] = useState({ txt: '' })

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

    function onAddTodo(noteId, txt) {
        setNotes(prevNotes =>
            prevNotes.map(note => {
                if (note.id !== noteId) return note

                const newTodo = {
                    id: utilService.makeId(),
                    txt,
                    isDone: false
                }

                const updatedNote = {
                    ...note,
                    info: {
                        ...note.info,
                        todos: [...note.info.todos, newTodo]
                    }
                }

                noteService.save(updatedNote)
                return updatedNote
            })
        )
    }

    function onDeleteTodo(noteId, todoId) {
        setNotes(prevNotes =>
            prevNotes.map(note => {
                if (note.id !== noteId) return note

                const updatedTodos = note.info.todos.filter(todo => todo.id !== todoId)

                const updatedNote = {
                    ...note,
                    info: { ...note.info, todos: updatedTodos }
                }

                noteService.save(updatedNote)
                return updatedNote
            })
        )
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

    function onSendMail(note) {

        let subject = note.info.title || 'My Note'
        let body = ''

        if (note.type === 'NoteTxt') {
            body = note.info.txt
        }

        if (note.type === 'NoteImg') {
            body = `Check out this image:\n${note.info.url}`
        }

        if (note.type === 'NoteTodos') {
            body = note.info.todos
                .map(t => `${t.isDone ? '✔️' : '⬜'} ${t.txt}`)
                .join('\n')
        }

        const encodedSubject = encodeURIComponent(subject)
        const encodedBody = encodeURIComponent(body)

        window.location.hash = `#/mail/compose?subject=${encodedSubject}&body=${encodedBody}`
    }

    const notesToShow = notes.filter(note => {
        const str = JSON.stringify(note.info).toLowerCase()
        return str.includes(filterBy.txt.toLowerCase())
    })

    const pinnedNotes = notesToShow.filter(n => n.isPinned)
    const otherNotes = notesToShow.filter(n => !n.isPinned)

    return (
        <section className="note-index">

            <NoteAdd onAddNote={onAddNote} />

            <input
                type="text"
                placeholder="Search notes…"
                onChange={(ev) => setFilterBy({ txt: ev.target.value })}
            />

            <h3 className="note-section-title">PINNED</h3>
            <NoteList
                notes={pinnedNotes}
                onDelete={onDelete}
                onDuplicate={onDuplicate}
                onPin={onPin}
                onChangeColor={onChangeColor}
                onEdit={onEdit}
                onAddTodo={onAddTodo}
                onDeleteTodo={onDeleteTodo}
                onToggleTodo={onToggleTodo}
                onSendMail={onSendMail}
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
                        onAddTodo={onAddTodo}
                        onDeleteTodo={onDeleteTodo}
                        onToggleTodo={onToggleTodo}
                        onSendMail={onSendMail}
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
