import { mailsService } from '../services/mails.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'
import {
    showSuccessMsg,
    showErrorMsg,
} from '../../../services/event-bus.service.js'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { NavBar } from '../cmps/NavBar.jsx'


const { useEffect, useState } = React

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [unReadCounter, setUnReadCounter] = useState(0)
    const [isShowComposeModal, setIsShowComposeModal] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const [filterBy, setFilterBy] = useState(mailsService.getDefaultFilter())
    const [folderFilter, setFolderFilter] = useState('inbox')

    function getMailDefaultsFromURL() {
    const hash = window.location.hash || ''
    const queryString = hash.split('?')[1] || ''
    const params = new URLSearchParams(queryString)

    return {
        subject: params.get('subject') || '',
        body: params.get('body') || ''
    }
}



    useEffect(() => {
        loadMails()
    }, [])

    useEffect(() => {
    const hash = window.location.hash
    if (hash.includes('subject=') || hash.includes('body=')) {
        setIsShowComposeModal(true)
    }
}, [])


    useEffect(() => {
        const combinedFilter = { ...filterBy, folder: folderFilter }
        mailsService.query(combinedFilter).then((loadedMails) => {
            setMails(loadedMails)
        })
    }, [filterBy, folderFilter])

    function onSendMail(composedMail) {
        composedMail.sentAt = Date.now()
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

    function onSetFolderFilter(filterObj) {
        setFolderFilter(filterObj.folder)
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
            <NavBar onFolderFilter={onSetFolderFilter} />
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
                    // defaults={getMailDefaultsFromURL()}
                />
            )}
        </main>
    )
}


