import { utilService } from '../../../services/util.service.js'
import { mailsService } from '../services/mails.service.js'


const { Link, NavLink } = ReactRouterDOM

export function MailPreview({ mail }) {
   const { subject, from, sentAt } = mail
   const { getDayInMonth, getMonthName } = utilService
   const MailRead = mail.isRead ? 'is-read' : ''
   function onSetIsRead(mailId) {
   mailsService.setIsRead(mailId)
    }

   return (
       <Link to={`/mail/${mail.id}`}>
      <article className={`mail-prev flex ${MailRead}`} onClick={() => onSetIsRead(mail.id)}>
            <h3>{from}</h3>
            <p>{subject}</p>
         <p> <span>{utilService.getMonthName(sentAt)}</span> <span>{utilService.getDayInMonth(sentAt)}</span></p>
          </article>
       </Link>
    )

}