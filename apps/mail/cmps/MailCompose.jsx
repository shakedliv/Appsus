const { useState, useEffect } = React

import { mailsService } from '../services/mails.service.js'

export function MailCompose({ sendMail, toggleCompose , saveDraft}) {
    const [mail, setMail] = useState(mailsService.getEmptyMail())

   function onAddMail(ev) {
      ev.preventDefault()
       mail.sentAt = Date.now()
        sendMail(mail)
        toggleCompose()
    }
function isMailEmpty() {
      toggleCompose()
      if (mail.subject || mail.body || mail.to) {
         sendMail(mail)
      }
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
        <section onClick={isMailEmpty} className='compose-mail flex'>
            <form
                onClick={(ev) => ev.stopPropagation()}
                onSubmit={onAddMail}
                className='compose-form '
            >
                <div className='compose-topic'><h4>New Message</h4>
                 <span
                        className='btn-toggle-modal'
                        onClick={isMailEmpty}
                    >
                        X
                    </span></div>
                   
                     
                <input
                   className='compose-recipient-input'
                   
                        type='text'
                        id='send-to'
                        name='to'
                        value={mail.to}
                        onChange={handleChange}
                   autoFocus
                   placeholder='Recipient'
                />
                
                   
                <input
                   className='compose-subject-input'
                        type='text'
                        id='subject'
                        name='subject'
                        value={mail.subject}
                   onChange={handleChange}
                   placeholder='Subject'
                />
                
             <input
                className='compose-body-input'
                        type='text'
                        id='body'
                        name='body'
                        value={mail.body}
                        onChange={handleChange}
                    />
                    <button className='send-compose-btn'>Send</button>
            </form>
        </section>
    )
}
