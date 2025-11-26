export function NotePreview({ note, onDelete, onDuplicate, onPin, onChangeColor, onEdit }) {


    function renderNoteByType() {
        switch (note.type) {

            case 'NoteTxt':
                return (
                    <p className="note-txt">
                        {note.info.txt}
                    </p>
                )

            case 'NoteImg':
                return (
                    <div className="note-img">
                        <img src={note.info.url} alt={note.info.title || 'note image'} />
                    </div>
                )

            case 'NoteTodos':
                return (
                    <div className="note-todos">
                        <h4>{note.info.title}</h4>
                        <ul>
                            {note.info.todos.map((todo, idx) => (
                                <li key={idx} className={todo.isDone ? 'done' : ''}>
                                    {todo.txt}
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
        <article className="note-preview" style={note.style}>
            {renderNoteByType()}
            <div className="note-actions">

    <button onClick={() => onDelete(note.id)}>🗑️</button>

    <button onClick={() => onDuplicate(note)}>📄</button>

    <button onClick={() => onPin(note)}>📌</button>

    <div className="color-picker">
    {['#fff475', '#f28b82', '#fbbc04', '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa', '#d7aefb']
        .map(color => (
            <span
                key={color}
                className="color-option"
                style={{ backgroundColor: color }}
                onClick={() => onChangeColor(note.id, color)}
            ></span>
        ))
    }
</div>

    <button onClick={() => onEdit(note)}>✏️</button>

</div>

        </article>
        
    )
}
