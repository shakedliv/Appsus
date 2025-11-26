import { utilService } from '../../../services/util.service.js'


const { Link, NavLink } = ReactRouterDOM

export function MailPreview({ mail }) {
   const { subject, from, sentAt } = mail
   const {getDayInMonth, getMonthName} = utilService

    return (
      //  <Link to={`/mail/${mail.id}`}>
          <article className='mail-prev flex'>
            <h3>{from}</h3>
          <p>{subject}</p>
         <p> <span>{utilService.getMonthName(sentAt)}</span> <span>{utilService.getDayInMonth(sentAt)}</span></p>
          </article>
      //  </Link>
    )

}