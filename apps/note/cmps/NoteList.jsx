
import { NotePreview } from './NotePreview.jsx'

export function NoteList({ notes, onDelete, onDuplicate, onPin, onChangeColor, onEdit }) {

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
                        />
                    </li>
                ))}
            </ul>
        </section>
    )
}


