export function NoteFilter({ filterBy, onSetFilterBy }) {

    function handleChange(ev) {
        const value = ev.target.value
        onSetFilterBy({ txt: value })
    }

    function clearFilter() {
        onSetFilterBy({ txt: '' })
    }

    return (
        <div className="note-filter">
            <span className="search-icon">🔍</span>

            <input
                type="text"
                placeholder="Search notes…"
                value={filterBy.txt}
                onChange={handleChange}
            />

            {filterBy.txt && (
                <button className="clear-btn" onClick={clearFilter}>✖</button>
            )}
        </div>
    )
}
