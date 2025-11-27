import { mailsService } from '../services/mails.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'
import {
    showSuccessMsg,
    showErrorMsg,
} from '../../../services/event-bus.service.js'
import {MailFilter} from '../cmps/MailFilter.jsx'

const { useEffect, useState } = React

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [unReadCounter, setUnReadCounter] = useState(0)
    const [isShowComposeModal, setIsShowComposeModal] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const [filterBy, setFilterBy] = useState(mailsService.getDefaultFilter())
    useEffect(() => {
        loadMails()
    }, [])
    
    useEffect(() => {
        mailsService.query(filterBy).then((loadedMails) => {
            setMails(loadedMails)
        })
    }, [filterBy])

    function onSendMail(composedMail) {
        mailsService
            .save(composedMail)
            .then(() => {
                console.log('success')
                loadMails()
            })
            .catch((err) => {
                console.log('err:', err)
            })
    }
    function toggleIsRead(mailId) {
        mailsService.toggleIsRead(mailId)
        // not working
        // setUnReadCounter(mails.filter(mail => !mail.isRead).length)
    }

    function onToggleComposeModal() {
        setIsShowComposeModal((prevIsComposeModal) => !prevIsComposeModal)
    }

    function loadMails() {
        setIsLoading(true)
        mailsService
            .query()
            .then((loadedMails) => {
                setMails(loadedMails)
                const unread = loadedMails.filter((mail) => !mail.isRead).length
                setUnReadCounter(unread)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    function onSetFilterBy(newFilter) {
        setFilterBy((filter) => ({ ...filter, ...newFilter }))
    }

    function removeMail(mailId) {
        mailsService
            .remove(mailId)
            .then(() =>
                setMails((prevMails) =>
                    prevMails.filter((mail) => mailId !== mail.id)
                )
            )
            .catch(() => {
                showErrorMsg(`couldn't remove mail`)
                //   navigate('/mail')
            })
            .finally(() => {
                showSuccessMsg('Mail has been successfully removed!')
            })
    }

    if (isLoading || !mails) return <div className='loader'>Loading...</div>
    return (
       <main>
                <MailFilter filterBy={filterBy} onFilterBy={onSetFilterBy} />
            <button onClick={onToggleComposeModal} className='compose-mail-btn'>
                <i className='fa-light fa-pencil'></i> Compose{' '}
            </button>
            <section className='mails-index mails-container'>
                <h2>
                    Inbox <span>Unread mails: {unReadCounter}</span>
                </h2>
                <MailList
                    mails={mails}
                    removeMail={removeMail}
                    toggleIsRead={toggleIsRead}
                />
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
