const { useState, useRef, useEffect } = React

export function NotePreview({ 
    note, 
    onDelete, 
    onDuplicate, 
    onPin, 
    onChangeColor, 
    onEdit, 
    onAddTodo, 
    onDeleteTodo, 
    onToggleTodo,
    onSendMail, 
}) {

    const [showColors, setShowColors] = useState(false)
    const [newTodoText, setNewTodoText] = useState('')
    const [isAdding, setIsAdding] = useState(false)
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
                    <div className="note-content note-txt">
                        {note.info.title && <h4 className="note-title">{note.info.title}</h4>}
                        <p>{note.info.txt}</p>
                    </div>
                )

            case 'NoteImg':
                return (
                    <div className="note-content note-img">
                        {note.info.title && <h4 className="note-title">{note.info.title}</h4>}
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
                                    className={`todo-line ${todo.isDone ? "done" : ""}`}
                                >
                                    <div
                                        className={`todo-checkbox ${todo.isDone ? "checked" : ""}`}
                                        onClick={() => onToggleTodo(note.id, todo.id)}
                                    ></div>

                                    <span
                                        className="todo-text"
                                        onClick={() => onToggleTodo(note.id, todo.id)}
                                    >
                                        {todo.txt}
                                    </span>

                                    <button
                                        className="todo-delete-btn"
                                        onClick={(ev) => {
                                            ev.stopPropagation()
                                            onDeleteTodo(note.id, todo.id)
                                        }}
                                    >
                                        ✖
                                    </button>
                                </li>
                            ))}

                            <li className="todo-add">
                                {isAdding ? (
                                    <div className="todo-input-wrapper">
                                        <input
                                            autoFocus
                                            type="text"
                                            value={newTodoText}
                                            onChange={(e) => setNewTodoText(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && newTodoText.trim()) {
                                                    onAddTodo(note.id, newTodoText)
                                                    setNewTodoText('')
                                                    setIsAdding(false)
                                                }
                                            }}
                                            placeholder="New item..."
                                        />
                                        <button
                                            onClick={() => {
                                                if (!newTodoText.trim()) return
                                                onAddTodo(note.id, newTodoText)
                                                setNewTodoText('')
                                                setIsAdding(false)
                                            }}
                                        >
                                            Add
                                        </button>
                                    </div>
                                ) : (
                                    <button onClick={() => setIsAdding(true)}>➕ Add item</button>
                                )}
                            </li>
                        </ul>

                    </div>
                )

            default:
                return <p>Unknown note type...</p>
        }
    }

    const COLORS = [
        'no-color',
        'note-color-1',
        'note-color-2',
        'note-color-3',
        'note-color-4',
        'note-color-5',
        'note-color-6',
        'note-color-7',
        'note-color-8',
        'note-color-9',
        'note-color-10',
        'note-color-11',
        'note-color-12'
    ]

    return (
        <article className={`note-preview ${note.colorClass || ''}`}>

            {renderNoteByType()}

            <div className="note-actions">

                <button onClick={() => onDelete(note.id)}>🗑️</button>
                <button onClick={() => onDuplicate(note)}>📄</button>
                <button onClick={() => onPin(note)}>📌</button>
                <button onClick={() => onSendMail(note)}>✉️</button>

                <div className="color-picker-wrapper" ref={pickerRef}>
                    <button
                        className="color-btn"
                        onClick={() => setShowColors(prev => !prev)}
                    >
                        🎨
                    </button>

                    {showColors && (
                        <div className="color-popup">
                            {COLORS.map(colorClass => (
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
