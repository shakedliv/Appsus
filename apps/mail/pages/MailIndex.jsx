import { mailsService } from '../services/mails.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'
const { Link } = ReactRouterDOM

// import { MailFilter } from '../cmps/MailFilter'
const { useEffect, useState } = React

export function MailIndex() {
   const [mails, setMails] = useState([])
   const [unReadCounter, setUnReadCounter] = useState(0)
   const [isShowComposeModal, setIsShowComposeModal] = useState(null)
   const [isLoading, setIsLoading] = useState(true)
   
   

    // const [filterBy, setFilterBy] = useState(mailsService.getDefaultFilter())
    useEffect(() => {
       loadMails()
    }, [])
   
    function onSendMail(composedMail) {
        mailsService.save(composedMail)
            .then(() => {
                console.log('success')
                loadMails()
            })
            .catch((err) => {
                console.log('err:', err)
            })
    }
   
    function onToggleComposeModal() {
        setIsShowComposeModal((prevIsComposeModal) => !prevIsComposeModal)
    }

   function loadMails() {
       setIsLoading(true)
      mailsService.query().then((loadedMails) => {
        console.log('loadedMails:', loadedMails)
            setMails(loadedMails) 
            const unread = loadedMails.filter(mail => !mail.isRead).length
            setUnReadCounter(unread)
        })
      .finally(() => {
               setIsLoading(false)
            })
   }
   
   if (isLoading || !mails) return <div className="loader">Loading...</div>

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
      <main>
        <button onClick={onToggleComposeModal} className='compose-mail-btn'><i className="fa-light fa-pencil"></i> Compose </button>
        <section className='mails-index mails-container'>
            <h2>Inbox <span>Unread mails: {unReadCounter}</span></h2>
            {/* <MailFilter filterBy={filterBy} onFilterBy={onSetFilterBy} /> */}
            {/* <Link to="/Mail/edit"><button className='add-Mail'>Add Mail</button></Link> */}
            <MailList mails={mails} />
         </section>
         {isShowComposeModal && (
                <MailCompose
                    toggleCompose={onToggleComposeModal}
                    sendMail={onSendMail}
                />
            )}
         </main>
    )
}
