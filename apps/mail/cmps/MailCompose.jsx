const { useState, useEffect } = React

import { mailsService } from '../services/mails.service.js'

export function MailCompose({ sendMail, toggleCompose }) {
    const [mail, setMail] = useState(mailsService.getEmptyMail())

    function onAddMail(ev) {
        ev.preventDefault()
        sendMail(mail)
        toggleCompose()
    }

    function handleChange({ target }) {
        const { type, name: field } = target
        let { value } = target

        switch (type) {
            case 'range':
            case 'number':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break
        }

        setMail((prevMail) => ({ ...prevMail, [field]: value }))
    }

    const { createdAt } = mail

    return (
        <section onClick={toggleCompose} className='compose-mail flex'>
            <form
                onClick={(ev) => ev.stopPropagation()}
                onSubmit={onAddMail}
                className='compose-form '
            >
                <div className='compose-modal'>
                    <h1>Compose</h1>
                    <button
                        className='btn-toggle-modal'
                        onClick={toggleCompose}
                    >
                        X
                    </button>
                    <label className='bold-txt' htmlFor='send-to'>
                        To:
                    </label>
                    <input
                        type='text'
                        id='send-to'
                        name='to'
                        value={mail.to}
                        onChange={handleChange}
                        autoFocus
                />
                
                    <label className='bold-txt' htmlFor='subject'>
                        Subject
                    </label>
                    <input
                        type='text'
                        id='subject'
                        name='subject'
                        value={mail.subject}
                        onChange={handleChange}
                />
                
                    <label className='bold-txt' htmlFor='body'></label>
                    <input
                        type='text'
                        id='body'
                        name='body'
                        value={mail.body}
                        onChange={handleChange}
                    />
                    <button>Send</button>
                </div>
            </form>
        </section>
    )
}
