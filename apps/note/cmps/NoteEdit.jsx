const { useState } = React

import { utilService } from '../../services/util.service.js'

export function NoteEdit({ note, onSave, onClose }) {

    const [title, setTitle] = useState(note.info.title || '')
    const [txt, setTxt] = useState(note.info.txt || '')
    const [imgUrl, setImgUrl] = useState(note.info.url || '')
    const [todos, setTodos] = useState(note.info.todos || [])

    function onSubmit(ev) {
        ev.preventDefault()

        const updated = { ...note, info: { ...note.info } }

        if (note.type === 'NoteTxt') {
            updated.info.title = title
            updated.info.txt = txt
        }

        if (note.type === 'NoteImg') {
            updated.info.title = title
            updated.info.url = imgUrl
        }

        if (note.type === 'NoteTodos') {
            updated.info.title = title
            updated.info.todos = todos
        }

        onSave(updated)
    }

    function handleImgUpload(ev) {
        const file = ev.target.files[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = () => setImgUrl(reader.result)
        reader.readAsDataURL(file)
    }

    function updateTodo(id, key, value) {
        setTodos(prev =>
            prev.map(t => t.id === id ? { ...t, [key]: value } : t)
        )
    }

    function addTodo() {
        setTodos(prev => [...prev, {
            id: utilService.makeId(),
            txt: '',
            isDone: false
        }])
    }

    function removeTodo(id) {
        setTodos(prev => prev.filter(t => t.id !== id))
    }

    return (
        <section className="note-edit-modal">
            <div className="modal-content">

                <form onSubmit={onSubmit}>

                    <input
                        type="text"
                        className="edit-title"
                        placeholder="Title"
                        value={title}
                        onChange={(ev) => setTitle(ev.target.value)}
                    />

                    {note.type === 'NoteTxt' && (
                        <textarea
                            className="edit-textarea"
                            value={txt}
                            onChange={(ev) => setTxt(ev.target.value)}
                        />
                    )}

                    {note.type === 'NoteImg' && (
                        <div className="edit-img">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImgUpload}
                            />

                            <input
                                type="text"
                                placeholder="Image URL..."
                                value={imgUrl}
                                onChange={(ev) => setImgUrl(ev.target.value)}
                            />

                            {imgUrl && <img src={imgUrl} className="edit-preview-img" />}
                        </div>
                    )}

                    {note.type === 'NoteTodos' && (
                        <div className="edit-todos">

                            {todos.map(todo => (
                                <div key={todo.id} className="edit-todo-line">

                                    <input
                                        type="checkbox"
                                        checked={todo.isDone}
                                        onChange={() =>
                                            updateTodo(todo.id, 'isDone', !todo.isDone)
                                        }
                                    />

                                    <input
                                        type="text"
                                        className="todo-text-input"
                                        value={todo.txt}
                                        onChange={(ev) =>
                                            updateTodo(todo.id, 'txt', ev.target.value)
                                        }
                                    />

                                    <button
                                        type="button"
                                        className="todo-remove-btn"
                                        onClick={() => removeTodo(todo.id)}
                                    >
                                        ✖
                                    </button>
                                </div>
                            ))}

                            <button
                                type="button"
                                className="add-todo-btn"
                                onClick={addTodo}
                            >
                                + Add line
                            </button>
                        </div>
                    )}

                    <div className="edit-actions">
                        <button type="submit" className="save-btn">Save</button>
                        <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
                    </div>

                </form>
            </div>
        </section>
    )
}
