import { utilService } from '../../../services/util.service.js'
import { mailsService } from '../services/mails.service.js'
import { LongTxt } from './LongTxt.jsx'

const { useEffect, useState } = React
const { Link, NavLink } = ReactRouterDOM

export function MailPreview({ mail, removeMail, toggleIsRead }) {
   const { subject, from, sentAt, body } = mail
   const [mailRead,setMailRead] = useState(mail.isRead)
   function onSetIsRead(mailId) {
   mailsService.setIsRead(mailId)
    }
   function onRemoveMail(ev) {
      ev.stopPropagation()
      ev.preventDefault()
      removeMail(mail.id)
    }
   function onToggleIsRead(ev) {
      // need to also update the unread mails count
      ev.stopPropagation()
      ev.preventDefault()
      toggleIsRead(mail.id)
      setMailRead(prev => !prev)
    }
   return (
       <Link to={`/mail/${mail.id}`}>
      <article className={`mail-prev flex ${mailRead ?'is-read' : ''}`} onClick={() => onSetIsRead(mail.id)}>
            <h3>{from}</h3>
            <h4>{subject}</h4>
            <div className='mail-body'>{<LongTxt txt={body} />}</div>
            <p className='mail-date'> <span>{utilService.getMonthName(sentAt)}</span> <span>{utilService.getDayInMonth(sentAt)}</span></p>
            <p className='mail-operations'>
      <span className='remove-mail-btn' onClick={onRemoveMail}>🗑️</span> 
      <span className='toggle-read-btn' onClick={onToggleIsRead}>📩</span> </p>
         </article>
       </Link>
    )

}