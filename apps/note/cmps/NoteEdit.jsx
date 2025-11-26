const { useState } = React

export function NoteEdit({ note, onSave, onClose }) {

    const [txt, setTxt] = useState(note.info.txt || '')

    function onSubmit(ev) {
        ev.preventDefault()
        const updated = { ...note, info: { ...note.info, txt } }
        onSave(updated)
    }

    return (
        <section className="note-edit-modal">
            <div className="modal-content">
                <h2>Edit Note</h2>

                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        value={txt}
                        onChange={ev => setTxt(ev.target.value)}
                    />

                    <button>Save</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </section>
    )
}
