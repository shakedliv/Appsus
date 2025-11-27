export function NotePreview({ note, onDelete, onDuplicate, onPin, onChangeColor, onEdit }) {


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
                return (
                    <div className="note-content note-todos">
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
        <article className={`note-preview ${note.colorClass || ''}`}>

            {renderNoteByType()}
            <div className="note-actions">

                <button onClick={() => onDelete(note.id)}>🗑️</button>

                <button onClick={() => onDuplicate(note)}>📄</button>

                <button onClick={() => onPin(note)}>📌</button>

                <div className="color-picker">
                    {['note-yellow', 'note-red', 'note-orange', 'note-green', 'note-blue', 'note-pink']
                        .map(colorClass => (
                            <span
                                key={colorClass}
                                className={`color-option ${colorClass}`}
                                onClick={() => onChangeColor(note.id, colorClass)}
                            ></span>
                        ))

                    }
                </div>

                <button onClick={() => onEdit(note)}>✏️</button>

            </div>

        </article>

    )
}
