export function NotePreview({ note }) {

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
        </article>
    )
}
