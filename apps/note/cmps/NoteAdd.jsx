const { useState } = React

import { noteService } from '../services/note.service.js'

export function NoteAdd({ onAddNote }) {

    const [isExpanded, setIsExpanded] = useState(false)
    const [title, setTitle] = useState('')
    const [txt, setTxt] = useState('')
    const [noteType, setNoteType] = useState('NoteTxt')

    function expand() {
        setIsExpanded(true)
    }

    function resetFields() {
        setIsExpanded(false)
        setTitle('')
        setTxt('')
        setNoteType('NoteTxt')
    }

    function onSubmit(ev) {
        ev.preventDefault()
        if (!txt && !title) return

        const newNote = noteService.getEmptyNote(txt, noteType)
        newNote.info.title = title || ''
        noteService.save(newNote).then(savedNote => {
            onAddNote(savedNote)
            resetFields()
        })
    }

    return (
        <section className={`note-add ${isExpanded ? 'expanded' : ''}`}>
            <form onSubmit={onSubmit}>
                
                {isExpanded && (
                    <input
                        type="text"
                        className="note-add-title"
                        placeholder="Note title"
                        value={title}
                        onChange={(ev) => setTitle(ev.target.value)}
                        autoFocus
                    />
                )}

                <input
                    type="text"
                    className="note-add-input"
                    placeholder="Make a note..."
                    value={txt}
                    onFocus={expand}
                    onChange={(ev) => setTxt(ev.target.value)}
                />

                {isExpanded && (
                    <div className="note-add-actions">
                        
                        <div className="note-types">
                            <button type="button" onClick={() => setNoteType('NoteImg')}>
                                🖼️
                            </button>

                            <button type="button" onClick={() => setNoteType('NoteTxt')}>
                                ✏️
                            </button>

                            <button type="button" onClick={() => setNoteType('NoteTodos')}>
                                ✔️
                            </button>
                        </div>

                        <button type="submit" className="note-add-save-btn">
Save
                        </button>
                    </div>
                )}
            </form>
        </section>
    )
}
