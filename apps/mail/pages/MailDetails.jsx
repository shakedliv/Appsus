const { useState , useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

import { utilService } from '../../../services/util.service.js'
import { mailsService } from '../services/mails.service.js'

export function MailDetails() {
    const [mail, setMail] = useState(null)
   const [isLoading, setIsLoading] = useState(true)
   

    const params = useParams()
    const navigate = useNavigate()


   
    useEffect(() => {
       loadMail()
      }, [params.mailId])
      

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
   
   if (isLoading || !mail) return <div className="loader">Loading...</div>
    return (
        <article className='mail-details'>
          <h1>{mail.subject}</h1>
          <h3>{mail.from}</h3>
          <p> <span>{utilService.getMonthName(mail.sentAt)}</span> <span>{utilService.getDayInMonth(mail.sentAt)}</span></p>
          <p>{mail.body}</p>
         <Link to={`/mail`}> <button>Go back</button></Link>
        </article>
    )
}
