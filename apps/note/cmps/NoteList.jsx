// export function NoteList() {
//     return <div>note list</div>
// }

import { NotePreview } from './NotePreview.jsx'

export function NoteList({ notes = [] }) {

    return (
        <section className="note-list">

            <div>note list</div>

            <ul>
                {notes.map(note => (
                    <li key={note.id}>
                        <NotePreview note={note} />
                    </li>
                ))}
            </ul>

        </section>
    )
}

