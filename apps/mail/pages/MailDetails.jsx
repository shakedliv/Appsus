const { useState } = React
import { mailsService } from '../services/mails.service.js'

export function MailDetails() {
    const [mail, setMail] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    function loadMail() {
        setIsLoading(true)
        mailsService
            .get(params.mailId)
            .then(setMail)
            .catch(() => {
                showErrorMsg("Couldn't get mail...")
                navigate(`/mail`)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }
    return (
        <article className='mail-details'>
            <h1>{mail.subject}</h1>
        </article>
    )
}
