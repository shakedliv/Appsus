import { debounce } from "../../../services/util.service.js"

const { useEffect, useState, useRef } = React

export function MailFilter({ filterBy, onFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const initialFilterBy = useRef(filterBy)
    const onSetFilterDebounce = useRef(debounce(onFilterBy, 500)).current

    useEffect(() => {
        onSetFilterDebounce(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const { name: field, type } = target
        const value = type === 'number' ? +target.value : target.value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function reset() {
        setFilterByToEdit(initialFilterBy.current)
    }

    return <section className='mails-filter'>
        <h3>Filter</h3>
        <input onChange={handleChange} value={filterByToEdit.subject} type="text" name='subject' placeholder='Search by subject' />
        <button onClick={reset}>Reset</button>
    </section>
}