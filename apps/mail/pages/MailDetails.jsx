const { useState } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM


import { mailsService } from '../services/mails.service.js'

export function MailDetails() {
    const [mail, setMail] = useState(null)
   const [isLoading, setIsLoading] = useState(true)
   

    const params = useParams()
    const navigate = useNavigate()


   
    useEffect(() => {
        loadBook()
    }, [params.bookId])


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
