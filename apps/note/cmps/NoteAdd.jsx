const { useState } = React

import { noteService } from '../services/note.service.js'
import { utilService } from '../../services/util.service.js'

export function NoteAdd({ onAddNote }) {

    const [isExpanded, setIsExpanded] = useState(false)
    const [title, setTitle] = useState('')
    const [txt, setTxt] = useState('')
    const [noteType, setNoteType] = useState('NoteTxt')
    const [imgFile, setImgFile] = useState(null)

    function expand() {
        setIsExpanded(true)
    }

    function resetFields() {
        setIsExpanded(false)
        setTitle('')
        setTxt('')
        setImgFile(null)
        setNoteType('NoteTxt')
    }

    async function onSubmit(ev) {
        ev.preventDefault()
        if (!txt && !title && !imgFile) return

        const newNote = noteService.getEmptyNote('', noteType)
        newNote.info.title = title || ''

        if (noteType === 'NoteTxt') {
            newNote.info.txt = txt
        }

        if (noteType === 'NoteTodos') {
            const lines = txt.split('\n').filter(line => line.trim())
            newNote.info.todos = lines.map(line => ({
                id: utilService.makeId(),
                txt: line.trim(),
                isDone: false
            }))
        }

        if (noteType === 'NoteImg') {
            if (imgFile) {
                newNote.info.url = await readFileAsDataURL(imgFile)
            } else {
                newNote.info.url = txt
            }
        }

        noteService.save(newNote).then(saved => {
            onAddNote(saved)
            resetFields()
        })
    }

    function readFileAsDataURL(file) {
        return new Promise(resolve => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result)
            reader.readAsDataURL(file)
        })
    }

    function handleKeyDown(ev) {
        if (noteType === 'NoteTodos' && ev.key === 'Enter') {
            ev.preventDefault()
            setTxt(prev => prev + '\n')
        }
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

                {noteType === 'NoteTodos' ? (
                    <textarea
                        className="note-add-input"
                        placeholder="Write todos... (Enter = new line)"
                        value={txt}
                        onFocus={expand}
                        onChange={(ev) => setTxt(ev.target.value)}
                        onKeyDown={handleKeyDown}
                        rows="4"
                    ></textarea>
                ) : (
                    <input
                        type="text"
                        className="note-add-input"
                        placeholder={
                            noteType === 'NoteImg'
                                ? "Image URL or upload..."
                                : "Make a note..."
                        }
                        value={txt}
                        onFocus={expand}
                        onChange={(ev) => setTxt(ev.target.value)}
                    />
                )}

                {noteType === 'NoteImg' && (
                    <input
                        type="file"
                        accept="image/*"
                        className="note-file-input"
                        onChange={(ev) => setImgFile(ev.target.files[0])}
                    />
                )}

                {isExpanded && (
                    <div className="note-add-actions">

                        <div className="note-types">
                            <button type="button" onClick={() => { setNoteType('NoteTxt'); setImgFile(null) }}>✏️</button>
                            <button type="button" onClick={() => { setNoteType('NoteImg') }}>🖼️</button>
                            <button type="button" onClick={() => { setNoteType('NoteTodos') }}>✔️</button>
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
