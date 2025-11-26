import { mailsService } from '../../../services/mails.service'
import { MailList } from '../cmps/MailList'
import { MailFilter } from '../cmps/MailFilter'
import { useEffect, useState } from 'react'


export function MailIndex() {
    const [mails, setMails] = useState([])

   const [filterBy, setFilterBy] = useState(mailsService.getDefaultFilter())
   useEffect(() => {
      loadMails()
   }, [filterBy])
    
  function loadMails() {
        mailsService.query(filterBy)
            .then(mails => setMails(mails))
    }

    function onSetFilterBy(newFilter) {
        setFilterBy(filter => ({ ...filter, ...newFilter }))
    }

    function removeMail(mailId) {
        mailsService.remove(mailId)
            .then(() => setMails(prevMails => prevMails.filter(mail => mailId !== mail.id)))
            .catch(() => {
                showErrorMsg(`couldn't remove mail`)
                navigate('/mail')
            })
            .finally(() => {
                showSuccessMsg('Book has been successfully removed!')
            })

    }

  return (
        <section className='mails-index mails-container'>
            <h2>Inbox</h2>
            {/* <MailFilter filterBy={filterBy} onFilterBy={onSetFilterBy} /> */}
            {/* <Link to="/Mail/edit"><button className='add-Mail'>Add Mail</button></Link> */}
            <MailList mails={mails} onRemove={removeBook} />
        </section>
    )
}

