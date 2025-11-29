
import { NotePreview } from './NotePreview.jsx'

export function NoteList({
    notes,
    onDelete,
    onDuplicate,
    onPin,
    onChangeColor,
    onEdit,
    onAddTodo,
    onDeleteTodo,
    onToggleTodo,
    onSendMail }) {

    return (
        <section className="note-list">
            <ul>
                {notes.map(note => (

                    <li key={note.id}>
                        <NotePreview
                            note={note}
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
                    </li>
                ))}
            </ul>
        </section>
    )
}

