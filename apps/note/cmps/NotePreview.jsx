const { useState, useRef, useEffect } = React

export function NotePreview({ note, onDelete, onDuplicate, onPin, onChangeColor, onEdit, onToggleTodo }) {

    const [showColors, setShowColors] = useState(false)
    const pickerRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(ev) {
            if (pickerRef.current && !pickerRef.current.contains(ev.target)) {
                setShowColors(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    function renderNoteByType() {
        switch (note.type) {

            case 'NoteTxt':
                return (
                    <p className="note-content note-txt">
                        {note.info.txt}
                    </p>
                )

            case 'NoteImg':
                return (
                    <div className="note-content note-img">
                        <img src={note.info.url} alt={note.info.title || 'note image'} />
                    </div>
                )

            case 'NoteTodos':

                const sortedTodos = [...note.info.todos].sort((a, b) => {
                    if (a.isDone && !b.isDone) return 1
                    if (!a.isDone && b.isDone) return -1
                    return 0
                })

                return (
                    <div className="note-content note-todos">
                        <h4>{note.info.title}</h4>
                        <ul>
                            {sortedTodos.map(todo => (

                                <li
                                    key={todo.id}
                                    className={todo.isDone ? "done" : ""}
                                    onClick={() => onToggleTodo(note.id, todo.id)}
                                >
                                    <div className={`todo-checkbox ${todo.isDone ? "checked" : ""}`}></div>
                                    <span>{todo.txt}</span>
                                </li>

                            ))}
                        </ul>
                    </div>
                )

            default:
                return <p>Unknown note type...</p>
        }
    }

    return (
        <article className={`note-preview ${note.colorClass || ''}`}>

            {renderNoteByType()}

            <div className="note-actions">

                <button onClick={() => onDelete(note.id)}>🗑️</button>
                <button onClick={() => onDuplicate(note)}>📄</button>
                <button onClick={() => onPin(note)}>📌</button>

                <div className="color-picker-wrapper" ref={pickerRef}>
                    <button
                        className="color-btn"
                        onClick={() => setShowColors(prev => !prev)}
                    >
                        🎨
                    </button>

                    {showColors && (
                        <div className="color-popup">
                            {['note-yellow', 'note-red', 'note-orange', 'note-green', 'note-blue', 'note-pink']
                                .map(colorClass => (
                                    <button
                                        key={colorClass}
                                        className={`color-option ${colorClass}`}
                                        onClick={() => {
                                            onChangeColor(note.id, colorClass)
                                            setShowColors(false)
                                        }}
                                    ></button>
                                ))}
                        </div>
                    )}
                </div>

                <button onClick={() => onEdit(note)}>✏️</button>

            </div>

        </article>
    )
}
