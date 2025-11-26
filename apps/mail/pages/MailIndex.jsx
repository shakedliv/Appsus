import { mailsService } from '../services/mails.service.js'
import { MailList } from '../cmps/MailList.jsx'
// import { MailFilter } from '../cmps/MailFilter'
const { useEffect, useState } = React

export function MailIndex() {
    const [mails, setMails] = useState([])

    // const [filterBy, setFilterBy] = useState(mailsService.getDefaultFilter())
    useEffect(() => {
         loadMails()
    }, [])

   function loadMails() {
        mailsService.query().then((mails) => setMails(mails))
    }

    //     function onSetFilterBy(newFilter) {
    //         setFilterBy(filter => ({ ...filter, ...newFilter }))
    //     }

    //  function removeMail(mailId) {
    //      mailsService.remove(mailId)
    //          .then(() => setMails(prevMails => prevMails.filter(mail => mailId !== mail.id)))
    //          .catch(() => {
    //              showErrorMsg(`couldn't remove mail`)
    //              navigate('/mail')
    //          })
    //          .finally(() => {
    //              showSuccessMsg('Mail has been successfully removed!')
    //          })

    //  }

    return (
        <section className='mails-index mails-container'>
            <h2>Inbox</h2>
            {/* <MailFilter filterBy={filterBy} onFilterBy={onSetFilterBy} /> */}
            {/* <Link to="/Mail/edit"><button className='add-Mail'>Add Mail</button></Link> */}
            <MailList mails={mails} />
        </section>
    )
}
